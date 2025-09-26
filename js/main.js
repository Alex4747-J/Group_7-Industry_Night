const playerCon = document.querySelector("#player-container");
const player = document.querySelector("video")
const videoControls = document.querySelector("#video-controls");
const playButton = document.querySelector("#play-button")
const PauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const volumeSlider = document.querySelector("#change-vol");
const fullScreen = document.querySelector("#full-screen");

//console.log(playerCon);

//if user has JS, then remove default controls and show custom
player.controls = false;

videoControls.classList.remove('hidden');

//functions
function playVideo() {
    console.log("Play Video Called!");
    player.play();
}

function pauseVideo(){
    player.pause();
}

function stopVideo(){
    player.pause();
    player.currentTime = 1;
}

function changeVolume() {
    //console.log(volumeSlider.value);
    player.volume = volumeSlider.value;
}

function toggleFullScreen(){
    if(document.fullscreenElement){
        document.exitFullscreen();
    }
    else {
        playerCon.requestFullscreen();
    }
}

function hideControls(){
    videoControls.classList.add('hide');
}

function showControls(){
    videoControls.classList.remove('hide');

}
//Event Listeners
playButton.addEventListener("click", playVideo);
PauseButton.addEventListener("click",pauseVideo);
stopButton.addEventListener("click",stopVideo);
volumeSlider.addEventListener("input", changeVolume);
fullScreen.addEventListener("click",toggleFullScreen);
videoControls.addEventListener("mouseenter",showControls);
videoControls.addEventListener("mouseleave",hideControls);
player.addEventListener("mouseenter",showControls);
player.addEventListener("mouseleave",hideControls)