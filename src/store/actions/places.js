import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
    return (dispatch) => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
        .catch(() => {
            alert("addPlace: No token found!")
        })
        .then(token => {
            authToken = token;
            return fetch("https://us-central1-rncourse-1554751468254.cloudfunctions.net/storeImage", {
                method: "POST",
                body: JSON.stringify({
                    image: image.base64
                }),
                headers: {
                    authorization: "Bearer " + authToken
                }
            });
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong: " + err.message);
            dispatch(uiStopLoading());
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location: location,
                image: parsedRes.imageUrl
            };
            return fetch("https://rncourse-1554751468254.firebaseio.com/places.json?auth=" + authToken, {
                method: "POST",
                body: JSON.stringify(placeData)
            });
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        .catch(err => {
            console.log(err);
            alert("Something went wrong: " + err.message);
            dispatch(uiStopLoading());
        });

    };
};

export const getPlaces = () => {
    return (dispatch) => {
        dispatch(authGetToken())
        .then(token => {
            return fetch("https://rncourse-1554751468254.firebaseio.com/places.json?auth=" + token);
        })
        .catch(() => {
            alert("No token found!");
        })
        .then(res => res.json())
        .then(parsedRes => {
            const placesData = [];
            for (key in parsedRes) {
                placesData.push({
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    id: key,
                    key: key
                })
            }
            dispatch(setPlaces(placesData));
        })
        .catch(err => {
            alert("Something went wrong with getPlaces: " + err.message);
            console.log(err);
        });
    }
};

const setPlaces = (data) => {
    return {
        type: SET_PLACES,
        places: data
    }
};

export const deletePlace = (id) => {
    return (dispatch) => {
        dispatch(removePlace(id));
        dispatch(authGetToken())
        .then(token => {
            return fetch("https://rncourse-1554751468254.firebaseio.com/places/" + id + ".json&auth=" + token, {
                method: "DELETE"
            });
        })
        .catch(() => {
            alert("No token found!")
        })
        .then(res => res.json())
        .then(parsedRes => {
            console.log("Done: " + parsedRes);
        })
        .catch(err => {
            alert("Something went wrong: " + err.message);
            console.log(err);
        });
    }
};

const removePlace = (placeID) => {
    return {
        type: REMOVE_PLACE,
        id: placeID
    };
};