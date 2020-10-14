// Load the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubePlayerAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: 'bOp6gsu3P38',
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

let videoDuration = 0;
let totalSeconds;
let time;
let koef;
const DURATION = document.querySelector(".video__duration"),
      VIDEO_TIME = document.querySelector(".video__current-time");

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

function onPlayerReady(event) {
    videoDuration = event.target.getDuration();
    DURATION.innerHTML =  parseDuration(videoDuration);
    koef = 1000 / videoDuration;
  }


  let ms = 0, s = 0, m = 0;
  let timer;

  function start() {
      if(!timer) {
          timer = setInterval(run, 10);
      }
  }

  function run() {
    VIDEO_TIME.innerHTML =  getTimer();
    //   console.log(getTimer());
    //   stopwatchEl.textContent = getTimer();
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
    //   stopwatchEl.textContent = getTimer();
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


function onPlayerStateChange(event) {
    
    if (event.data == YT.PlayerState.PLAYING) { // If i don't do this, the timer will reset to zero
        start();
      } else if (event.data == YT.PlayerState.PAUSED) {
        pause();
      } else if (event.data == YT.PlayerState.ENDED) {
        pause();
      }
}
// ------------Range slider foe video timeline-----------------
const TIMELINE = document.querySelector(".video__progress");


