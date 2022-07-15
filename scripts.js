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
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // change their rgb value
        pixels = redEffect(pixels);
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}
function takePhoto() {
    // play the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'img');
    link.innerHTML = `<img src = "${data}" alt = "Image" />`;
    strip.insertBefore(link, strip.firstChild);
}
function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50;  // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }
    return pixels;
}

video.addEventListener("canplay", paintToCanvas);