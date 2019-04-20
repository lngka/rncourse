const functions = require('firebase-functions');
const cors = require("cors")({origin: true}); // allow any origin
const fs = require("fs");
const gcconfig = {
    projectId: "rncourse-1554751468254",
    keyFileName: "rncourse-key.json"
};
const { Storage } = require("@google-cloud/storage");
const gcs = new Storage(gcconfig);
const UUID = require("uuid-v4");

// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
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
                contentType: "image/jpeg",
                metadata: {
                    fireBaseStorageDownloadTokens: uuid
                }
            }
        }, (err, file) => {
            if (!err) {
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                              bucket.name +
                              "/o/" +
                              encodeURIComponent(file.name) + 
                              "?alt=media&token=" +
                              uuid
                });
            } else {
                response.status(500).json({error: err});
            }
        })
    });
});
