import { AsyncStorage } from "react-native";

import { AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        let apiKey = "AIzaSyCy5WOpqrgOHRvX2GnTKuptX45RxOmuaRM";
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + apiKey;
        if (authMode == "login") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + apiKey;
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
            dispatch(uiStopLoading());
            if (!parsedRes.idToken) {
                alert("Error authentication " + parsedRes.error);
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn));
                startMainTabs();
            }
        });
    };
};

const authStoreToken = (token, expiresIn) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;
        AsyncStorage.setItem("rncourse:auth:token", token);
        AsyncStorage.setItem("rncourse:auth:expiryDate", expiryDate.toString());
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
        return promise; 
    }
}

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(() => {
            startMainTabs();
        })
        .catch(() => console.log("Failed to auto sign in"));
    };
}