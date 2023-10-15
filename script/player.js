const player = document.getElementById('player');

var icon = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');

// full player elements
const songname_fullplayer = document.getElementById('songname_fullplayer');
const artistname_fullplayer = document.getElementById('artistname_fullplayer');
const cover_fullplayer = document.getElementById('cover_fullplayer');
const background_fullplayer = document.getElementById('background_fullplayer');

const nextsong_fullplayer = document.getElementById('nextsong_fullplayer');

const playpause_fullplayer = document.getElementById('playpause_fullplayer');

// mini player elements
const songname_miniplayer = document.getElementById('songname_miniplayer');
const artistname_miniplayer = document.getElementById('artistname_miniplayer');
const cover_miniplayer = document.getElementById('cover_miniplayer');
const background_miniplayer = document.getElementById('background_miniplayer');

const playpause_miniplayer = document.getElementById('playpause_miniplayer');

const miniplayer = document.getElementById('miniplayer');
const miniplayer_info = document.getElementById('miniplayer_info');
const miniplayer_pods = document.getElementById('miniplayer_pods');
const miniplayer_layer = document.getElementById('miniplayer_layer');

//other

var perem = 'pause';

let volume = document.getElementById('volume');

// timeline
let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.getElementById('current-time');
let total_duration = document.getElementById('total-duration');

let updateTimer;

player.volume = volume.value / 100;

player.addEventListener('play', function () {
    playpause_fullplayer.src = 'img/buttons/player_pause.svg';
    playpause_miniplayer.src = 'img/buttons/player_pause.svg';
});

player.addEventListener('pause', function () {
    playpause_fullplayer.src = 'img/buttons/player_play.svg';
    playpause_miniplayer.src = 'img/buttons/player_play.svg';
});

function setVolume() {
    player.volume = volume.value / 100;
}

function playpause() {
    if (perem === 'pause') {
        player.pause();
        perem = 'play';
    } else {
        player.play();
        perem = 'pause';
    }
}

function nextTrack() {
    if (trackindex === 0) {
        trackindex = def;
    } else {
        trackindex = trackindex - 1;
    }
    playerstart();
}

function prevTrack() {
    if (trackindex > (def - 1)) {
        trackindex = 0;
    } else {
        trackindex = trackindex + 1;
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
    miniplayer.style.height = "120px";
    background_miniplayer.style.height = "120px";
    miniplayer_pods.style.height = "120px";
    miniplayer_info.style.height = "100px";
    miniplayer_layer.style.display = "block";


    clearInterval(updateTimer);
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    player.src = "https://drive.google.com/uc?export=download&id=" + hfa[trackindex].music;
    player.load();
    playerupdate();
    updateTimer = setInterval(setUpdate, 1000);
    player.addEventListener('ended', nextTrack);
}

function playerupdate() {
    icon.forEach(function (element) {
        element.setAttribute('href', hfa[trackindex].cover);
    });
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

    switch (trackindex) {
        case 60:
        case 58:
            cover_fullplayer.style.height = "220px";
            cover_miniplayer.style.height = "88px";
            break;
        case 59:
            cover_fullplayer.style.height = "218px";
            cover_miniplayer.style.height = "87px";
            break;
        case 43:
            cover_fullplayer.style.height = "212px";
            cover_miniplayer.style.height = "85px";
            break;
        case 19:
            cover_fullplayer.style.height = "222px";
            cover_miniplayer.style.height = "89px";
            break;
        case 5:
            cover_fullplayer.style.height = "219px";
            cover_miniplayer.style.height = "88px";
            break;
        default:
            cover_fullplayer.style.height = "250px";
            cover_miniplayer.style.height = "100px";
            break;
    }

    cover_miniplayer.src = hfa[trackindex].cover;
    background_miniplayer.style.backgroundImage = "url(" + hfa[trackindex].cover + ")";

    //other
    navigator.mediaSession.metadata = new MediaMetadata({
        title: hfa[trackindex].songname,
        artist: hfa[trackindex].artistname,
        artwork: [{ src: hfa[trackindex].cover, sizes: '250x250', type: 'image/jpeg' }]
    });
}