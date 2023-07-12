const recordBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const downloadClick = (event) => {
    recordBtn.innerText = "Start Recording";
    recordBtn.removeEventListener("click", downloadClick);
    recordBtn.addEventListener("click", recordBtnClick);
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecord.webm";
    document.body.appendChild(a);
    a.click();
}
const stopRecording = (event) => {
    recordBtn.innerText = "Download Recording";
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", downloadClick);
    recorder.stop();
}
const recordBtnClick = (event) => {
    recordBtn.innerText = "Stop Recording";
    recordBtn.removeEventListener("click", recordBtnClick);
    recordBtn.addEventListener("click", stopRecording);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        videoFile = URL.createObjectURL(e.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    }
    recorder.start();
}
const init = async (event) => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
    })
    video.srcObject = stream;
    video.play();
}
init();
recordBtn.addEventListener("click", recordBtnClick);