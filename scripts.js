const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false}) // returns a promise
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.log("Unable to access media", err);
    })
}
getVideo();

function paintToCanvas() {
    const {videoWidth: width, videoHeight: height} = video;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => { // returns in case setInterval is needed to stop later on
        ctx.drawImage(video, 0, 0, width, height);
    }, 16)
}
function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();
}

video.addEventListener("canplay", paintToCanvas);