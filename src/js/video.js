
const TIMELINE = document.querySelector(".video__progress"),
      TIME_ABOVE = document.querySelector(".show-time"),
      DURATION = document.querySelector(".video__duration"),
      VIDEO_TIME = document.querySelector(".video__current-time"),
      START = document.querySelector(".video__start"),
      PAUSE = document.querySelector(".fa-pause-circle"),
      PLAYLIST = document.querySelector(".video__playlist"),
      PLAYLIST_ITEM = document.querySelectorAll(".video__playlist-item");

let player,
    id = "bOp6gsu3P38",
    videoDuration = 144,
    totalSeconds,
    time,
    koef;
    
// Load the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Creates an <iframe> (and YouTube player) after the API code downloads
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: id,
    playerVars: {
        'controls': 0,
        'rel': 0,
        'showinfo': 0,
        'fs': 0,
        'autoplay': 0,
        'iv_load_policy': 3,
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
}
// The API will call this function when the video player is ready
function onPlayerReady(event) {
  DURATION.innerHTML =  parseDuration(videoDuration);
  koef = 1000 / videoDuration;
}
// The API calls this function when the player's state changes
function onPlayerStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      start();
      break;
    case YT.PlayerState.PAUSED:
      pause();
      break;
    case YT.PlayerState.ENDED:
      pause();
      break;
  }
}

function parseDuration(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60),
        seconds = totalSeconds - minutes * 60;

    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function checkTime(){
  let timeDifference = Date.now() - time;
  let formatted = convertTime(timeDifference);
  VIDEO_TIME.innerHTML =  '' + formatted;
}

function convertTime(miliseconds) {
    if (totalSeconds >= videoDuration) {
        totalSeconds = videoDuration;
    } else {
        totalSeconds = Math.floor(miliseconds/1000);
    }

  let minutes = Math.floor(totalSeconds/60),
      seconds = totalSeconds - minutes * 60;

  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

// ---------Timer---------
  let ms = 0, s = 0, m = 0;
  let timer;

  function start() {
      if(!timer) {
          timer = setInterval(run, 10);
      }
  }

  function run() {
    VIDEO_TIME.innerHTML =  getTimer();
    
      ms++;
      if(ms == 100) {
          ms = 0;
          s++;
      }
      if(s == 60) {
          s = 0;
          m++;
      }
    
      TIMELINE.value = s * koef + m * 60 * koef;
      let x = TIMELINE.value / 10;
  
      let color = `linear-gradient(90deg, #f78181 ${x}%, rgba(69, 69, 69, .3) ${x}%)`;
      TIMELINE.style.background = color;
  }

  function pause() {
      stopTimer();
  }

  function stop() {
      stopTimer();
      ms = 0;
      s = 0;
      m = 0;
  }

  function stopTimer() {
      clearInterval(timer);
      timer = false;
  }

  function getTimer() {
      return m + ":" + (s < 10 ? "0" + s : s);
  }

  function restart() {
      stop();
      start();
  }

// ---------For timeline---------
TIMELINE.addEventListener("mousemove", (event) => {
  let left = TIMELINE.getBoundingClientRect().left,
      right = TIMELINE.getBoundingClientRect().right;
  // Calculate timeline lenght
  let timelineLength = right - left;
  let client = window.event.clientX;
  // Where is a client mouse
  let clientPos = client - left;
  // Shows selected time
  let percent = (clientPos / timelineLength);
  TIME_ABOVE.style.opacity = "1";
  TIME_ABOVE.style.left = `${percent*100}%`;
  TIME_ABOVE.innerHTML = parseDuration((percent * videoDuration).toFixed(0));
});
// ---------Hide time---------
TIMELINE.addEventListener("mouseleave", (event) => {
  TIME_ABOVE.style.opacity = "0";
});
// ---------If user wanna change time---------
TIMELINE.addEventListener("input", (event) => {
    let newS = Math.floor(videoDuration * TIMELINE.value / 1000);
    m = Math.floor((Math.floor(videoDuration * TIMELINE.value / 1000)) / 60);
    s = newS - m * 60;
    player.seekTo(newS, true);
  });
// ---------Pause button---------
PAUSE.addEventListener("click", () => {
  player.pauseVideo();
  PAUSE.style.display = "none";
  START.style.display = "block";
});
// ---------Start button---------
START.addEventListener("click", () => {
  player.playVideo();
  START.style.display = "none";
  PAUSE.style.display = "block";
});
// ---------Show selected video---------
PLAYLIST_ITEM.forEach((item) => {
  item.addEventListener("click", () => {
    document.getElementById(id).classList.remove("--play");
    // Get video id
    id = item.id;
    // Рighlight video
    item.classList.add("--play");
    // Load video
    player.loadVideoById(id);
    // Restart timer
    restart()
    // Get new video duration
    let newM, newS;
    [newM, newS] = item.querySelector(".video__playlist-time").innerHTML.split(":");
    videoDuration = parseInt(newM) * 60 + parseInt(newS);
    console.log(videoDuration);
    DURATION.innerHTML =  parseDuration(videoDuration);
    koef = 1000 / videoDuration;
  });
});


