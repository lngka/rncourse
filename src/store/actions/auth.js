import { AsyncStorage } from "react-native";

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

const API_KEY = "AIzaSyCy5WOpqrgOHRvX2GnTKuptX45RxOmuaRM";


export const tryAuth = (authData, authMode) => {
    return dispatch => {
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
        if (authMode == "login") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
        }
        dispatch(uiStartLoading());
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(err => {
            console.log(err);
            alert("Error authentication " + err.message);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
            if (!parsedRes.idToken) {
                alert("Error authentication " + parsedRes.error);
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                startMainTabs();
            }
        });
    };
};

const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        dispatch(authSetToken(token));
        AsyncStorage.setItem("rncourse:auth:token", token);
        AsyncStorage.setItem("rncourse:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("rncourse:auth:refreshToken", refreshToken);
    }
}

const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    return (dispatch, getStates) => {
        const promise = new Promise((resolve, reject) => {
            const token = getStates().auth.token;
            if (!token) {
                let _tokenFromStorage;
                AsyncStorage.getItem("rncourse:auth:token")
                .then(tokenFromStorage => {
                    if(!tokenFromStorage) {
                        reject("Token not found!");
                        return;
                    }
                    _tokenFromStorage = tokenFromStorage;
                    return AsyncStorage.getItem("rncourse:auth:expiryDate");
                })
                .catch((err) => reject(err.message))
                .then(expiryDate => {
                    const parsedDate = new Date(expiryDate);
                    const now = new Date();
                    if (parsedDate > now) {
                        dispatch(authSetToken(_tokenFromStorage));
                        resolve(_tokenFromStorage);
                    } else {
                        reject();
                        return;
                    }
                })
            } else {
                resolve(token);
            }
        });
        return promise.catch(() => {
            return AsyncStorage.getItem("rncourse:auth:refreshToken")
            .then(refreshToken => {
                return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "grant_type=refresh_token&refresh_token=" + refreshToken
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.id_token) {
                    console.log("refreshToken worked!");
                    dispatch(authStoreToken(parsedRes.id_token, parsedRes.expires_in, parsedRes.refresh_token));
                    return parsedRes.id_token;
                } else {
                    dispatch(authClearStorage());
                }
            });
        })
        .then(token => {
            if (!token) {
                throw new Error("Could not get token with refresh token");
            } else {
                return token;
            }
        });
    };
};

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(() => {
            startMainTabs();
        })
        .catch(() => console.log("Failed to auto sign in"));
    };
};

const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("rncourse:auth:token");
        AsyncStorage.removeItem("rncourse:auth:expiryDate");
        return AsyncStorage.removeItem("rncourse:auth:refreshToken");
    };
};

export const authLogout = () => {
    return distpatch => {
        distpatch(authClearStorage())
            .then(() => App());
        distpatch(authRemoveToken());
    };
};

const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
};