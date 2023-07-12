const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("current");
const totalTime = document.getElementById("total");
const time = document.getElementById("time");
const videoscreen = document.getElementById("videoContainer");
const fullBtn = document.getElementById("fullscreen");
const fullBtnIcon = fullBtn.querySelector("i");
const videocontrols = document.getElementById("videocontrols");

let mouseon = null;
let mousestop = null;
let volumeValue = 0.5;
video.volume = volumeValue;
const playBtnClick = (e) => {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}
const muteBtnClick = (e) => {
    if (video.muted) {
        video.muted = false;
    }
    else {
        video.muted = true;
        video.volume = 0;
    }
    muteBtnIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
}
const volumeRangeInput = (event) => {
    const { target: { value } } = event;
    if (video.muted) {
        video.muted = false;
        muteBtnIcon.classList = "fas fa-volume-mute";
    }
    if (value == 0) {
        video.muted = true;
        muteBtnIcon.classList = "fas fa-volume-up";
    }
    else {
        video.volume = value;
        volumeValue = value;
    }
}
const formatTime = (times) => { return new Date(times * 1000).toISOString().substring(14, 19) }
const loadMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    time.max = Math.floor(video.duration);
}
const videoTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    time.value = Math.floor(video.currentTime);
}
const timeInput = (event) => {
    const { target: { value } } = event;
    video.currentTime = value;
}
const fullBtnClick = () => {
    const fulls = document.fullscreenElement;
    if (fulls) {
        document.exitFullscreen();
        fullBtnIcon.classList = "fas fa-expand";
    } else {
        videoscreen.requestFullscreen();
        fullBtnIcon.classList = "fas fa-compress";
    }
}
const removeClassShowing = () => {
    videocontrols.classList.remove("showing");
}
const mousemove = () => {
    if (mouseon) {
        clearTimeout(mouseon);
        mouseon = null;
    }
    if (mousestop) {
        clearTimeout(mousestop);
        mousestop = null;
    }
    videocontrols.classList.add("showing");
    mousestop = setTimeout(removeClassShowing, 3000);
}
const mouseleave = () => {
    mouseon = setTimeout(removeClassShowing, 3000);
}
const videoClick = () => {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}
const spacekeydown = (event) => {
    if (event.keyCode === 32) {
        if (video.paused) {
            video.play();
        }
        else {
            video.pause();
        }
        playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
    }
}
const videoEnded = (event) => {
    const { id } = videoscreen.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "post",
    })
}
playBtn.addEventListener("click", playBtnClick);
muteBtn.addEventListener("click", muteBtnClick);
muteBtn.addEventListener("click", muteBtnClick);
volumeRange.addEventListener("input", volumeRangeInput);
video.addEventListener("loadedmetadata", loadMetaData);
video.addEventListener("timeupdate", videoTimeUpdate);
time.addEventListener("input", timeInput);
fullBtn.addEventListener("click", fullBtnClick);
video.addEventListener("mousemove", mousemove);
video.addEventListener("mouseleave", mouseleave);
video.addEventListener("click", videoClick);
video.addEventListener("ended", videoEnded)
document.addEventListener("keydown", spacekeydown);
