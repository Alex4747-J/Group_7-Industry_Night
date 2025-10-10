console.log("main.js loaded");

// ==========================================
// VARIABLE DECLARATIONS
// ==========================================
// Video Player
const videoPlayer = document.querySelector('#player-container video');
const oldVideoControls = document.querySelector('#video-controls');






// ==========================================
// PLYR VIDEO PLAYER SETUP
// ==========================================

function initVideoPlayer() {
    // I'm checking if Plyr library is loaded and video exists
    if (videoPlayer && typeof Plyr !== 'undefined') {
        const player = new Plyr(videoPlayer, {
            controls: [
                'play-large',
                'play',
                'progress',
                'current-time',
                'mute',
                'volume',
                'fullscreen'
            ],
            settings: ['quality', 'speed', 'loop'],
            ratio: '16:9',
            clickToPlay: true,
            hideControls: false,
            resetOnEnd: true
        });

        // I'm removing the old custom controls since Plyr handles this now
        if (oldVideoControls) {
            oldVideoControls.remove();
        }
    }
}
