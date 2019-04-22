import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
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
                dispatch(authSetToken(parsedRes.idToken));
                startMainTabs();
            }
        });
    };
};

const authSetToken = (token) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
};