import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const recordBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream = null;
let recorder = null;
let videoFile = null;

const file = {
    input: "recording.webm",
    output: "output.mp4",
    thum: "thumnail.jpg",
}
const downloadfile = (url, name) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
}
const downloadClick = async (event) => {
    recordBtn.removeEventListener("click", downloadClick);
    recordBtn.innerText = "Transcoding....";
    recordBtn.disabled = true;
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load()
    ffmpeg.FS("writeFile", file.input, await fetchFile(videoFile));
    await ffmpeg.run("-i", file.input, "-r", "60", file.output);
    await ffmpeg.run("-i", file.input, "-ss", "00:00:01", "-frames:v", "1", file.thum);
    const mp4File = ffmpeg.FS("readFile", file.output);
    const thumFile = ffmpeg.FS("readFile", file.thum);
    const mp4Blob = new Blob([mp4File.buffer], { type: "video.mp4" });
    const thumBlob = new Blob([thumFile.buffer], { type: "image.jpg" });
    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumUrl = URL.createObjectURL(thumBlob);
    recordBtn.innerText = "Start Recording";
    recordBtn.removeEventListener("click", downloadClick);
    recordBtn.addEventListener("click", recordBtnClick);
    downloadfile(mp4Url, "MyRecord.mp4");
    downloadfile(thumUrl, "thumnail.jpg");

    ffmpeg.FS("unlink", file.input);
    ffmpeg.FS("unlink", file.thum);
    ffmpeg.FS("unlink", file.output);

    URL.revokeObjectURL(thumUrl);
    URL.revokeObjectURL(videoFile);
    URL.revokeObjectURL(mp4Url);
    recordBtn.innerText = "Recording Restart";
    recordBtn.disabled = false;
    recordBtn.addEventListener("click", recordBtnClick);
}

const recordBtnClick = (event) => {
    recordBtn.innerText = "Recording";
    recordBtn.disabled = true;
    recordBtn.removeEventListener("click", recordBtnClick);
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        videoFile = URL.createObjectURL(e.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
        recordBtn.innerText = "Download";
        recordBtn.disabled = false;
        recordBtn.addEventListener("click", downloadClick);
    }
    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 5000);
}
const init = async (event) => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: 1024,
            height: 576,
        },
    })
    video.srcObject = stream;
    video.play();
}
init();
recordBtn.addEventListener("click", recordBtnClick);