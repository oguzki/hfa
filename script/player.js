const player = document.getElementById('player');

var icon = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

// full player elements
const songname_fullplayer = document.getElementById('songname_fullplayer');
const artistname_fullplayer = document.getElementById('artistname_fullplayer');
const cover_fullplayer = document.getElementById('cover_fullplayer');
const background_fullplayer = document.getElementById('background_fullplayer');

const nextsong_fullplayer = document.getElementById('nextsong_fullplayer');

// mini player elements
const songname_miniplayer = document.getElementById('songname_miniplayer');
const artistname_miniplayer = document.getElementById('artistname_miniplayer');
const cover_miniplayer = document.getElementById('cover_miniplayer');
const background_miniplayer = document.getElementById('background_miniplayer');

var perem = 'pause';

let volume = document.getElementById('volume');

// timeline
let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let updateTimer;

player.volume = volume.value / 100;

function setVolume() {
    player.volume = volume.value / 100;
}

function playpause() {
    if (songname_fullplayer.textContent === "⠀") {
        playerstart();
    } else {
        if (perem === 'pause') {
            player.pause();
            perem = 'play';
            devpause();
        } else {
            player.play();
            perem = 'pause';
            devplay();
        }
    }
}

function devplay() {
    document.getElementById('pp').src = "img/buttons/player_play.svg";
    document.getElementById('pp1').src = "img/buttons/player_play.svg";
}

function devpause() {
    document.getElementById('pp').src = "img/buttons/player_pause.svg";
    document.getElementById('pp1').src = "img/buttons/player_pause.svg";
}

function nextTrack() {
    if (trackindex === 0) {
        trackindex = def;
    } else {
        trackindex = trackindex - 1;
        devplay();
    }
    playerstart();
}

function prevTrack() {
    if (trackindex > (def - 1)) {
        trackindex = 0;
    } else {
        trackindex = trackindex + 1;
        devplay();
    }
    playerstart();
}

function openplayer() {
    document.getElementById('miniplayer').style.opacity = "0";
    document.getElementById('miniplayer').style.zIndex = "-1";
    document.getElementById('fullplayer').style.opacity = "1";
    document.getElementById('fullplayer').style.zIndex = "2";
    document.getElementById('fullplayer').style.height = "100%";
    document.getElementById('body').scroll = "no";
    document.getElementById('body').style.overflow = "hidden";
}

function closeplayer() {
    document.getElementById('miniplayer').style.opacity = "1";
    document.getElementById('miniplayer').style.zIndex = "1";
    document.getElementById('fullplayer').style.opacity = "0";
    document.getElementById('fullplayer').style.zIndex = "-1";
    document.getElementById('fullplayer').style.height = "0";
    document.getElementById('body').scroll = "yes";
    document.getElementById('body').style.overflow = "auto";
}

// timeline script
function seekTo() {
    let seekto = player.duration * (seek_slider.value / 100);
    player.currentTime = seekto;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(player.duration)) {
        seekPosition = player.currentTime * (100 / player.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(player.currentTime / 60);
        let currentSeconds = Math.floor(player.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(player.duration / 60);
        let durationSeconds = Math.floor(player.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// player play/update

function playerstart() {
    clearInterval(updateTimer);
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    devplay();
    player.src = "https://drive.google.com/uc?export=download&id=" + hfa[trackindex].music;
    player.load();
    playerupdate();
    updateTimer = setInterval(setUpdate, 1000);
    player.addEventListener('ended', nextTrack);
}

function playerupdate() {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: hfa[trackindex].songname,
            artist: hfa[trackindex].artistname,
            artwork: [{ src: hfa[trackindex].cover, sizes: '96x96', type: 'image/jpeg' }]
        });
    }

    document.title = hfa[trackindex].songname + " - " + hfa[trackindex].artistname;
    
    // full player
    songname_fullplayer.textContent = hfa[trackindex].songname;
    artistname_fullplayer.textContent = hfa[trackindex].artistname;

    switch (trackindex) {
        case 0:
            nextsong_fullplayer.textContent = "Next Song: " + hfa[def].songname;
            break;
        default:
            nextsong_fullplayer.textContent = "Next Song: " + hfa[trackindex - 1].songname;
            break;
    }

    cover_fullplayer.src = hfa[trackindex].cover;
    background_fullplayer.style.backgroundImage = "url(" + hfa[trackindex].cover + ")";

    // mini player
    songname_miniplayer.textContent = hfa[trackindex].songname;
    artistname_miniplayer.textContent = hfa[trackindex].artistname;

    cover_miniplayer.src = hfa[trackindex].cover;
    background_miniplayer.style.backgroundImage = "url(" + hfa[trackindex].cover + ")";
}
