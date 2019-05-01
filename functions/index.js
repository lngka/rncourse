const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")({origin: true}); // allow any origin
const fs = require("fs");
const gcconfig = {
    projectId: "rncourse-1554751468254",
    keyFileName: "rncourse-key.json"
};
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage(gcconfig);
const UUID = require("uuid-v4");

admin.initializeApp({
    credential: admin.credential.cert(require("./rncourse-key.json"))
});

// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")) {
            console.log("Invalid authorization");
            return response.status(403).json({
                error: "Not authorized!"
            });
        }
        
        const idToken = request.headers.authorization.split("Bearer ")[1];
        
        admin
        .auth()
        .verifyIdToken(idToken)
        .then(decodedToken => {
            const body = JSON.parse(request.body);
            fs.writeFileSync("/tmp/uploaded-image.jpg", body.image, "base64", err => {
                return response.status(500).json({error: err});
            });

            const uuid = UUID();
            const bucket = gcs.bucket("rncourse-1554751468254.appspot.com");
            bucket.upload("/tmp/uploaded-image.jpg", {
                uploadType: "media",
                destination: "/places/" + uuid + ".jpg",
                metadata: {
                    metadata: {
                        contentType: "image/jpeg",
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            }, (err, file) => {
                if (!err) {
                    return response.status(201).json({
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                                bucket.name +
                                "/o/" +
                                encodeURIComponent(file.name) + 
                                "?alt=media&token=" +
                                uuid,
                        imagePath: "/places/" + uuid + ".jpg"
                    });
                } else {
                    return response.status(500).json({error: err});
                }
            });
            return;
        })
        .catch(() => {
            console.log("Invalid Token");
            return response.status(403).json({error: "Unauthorized: Invalid token in header"});
        });
        
        return;
    });
});

exports.deleteImage = functions.database.ref("/places/{place_id}").onDelete((snapshot, context) => {
    const placeData = snapshot.val();
    const imagePath = placeData.imagePath;
    const bucket = gcs.bucket("rncourse-1554751468254.appspot.com");

    return bucket.file(imagePath).delete();
})