const pBTNp = document.getElementById("play");
const image = document.getElementById("disk");
const title = document.getElementById("titleSong");
const TimeEnd = document.getElementById("TimeEnd");
const p = document.getElementById('prog_time');
const rate = document.getElementById('progress-rate');
const previous = document.getElementById('previous');
const next = document.getElementById('next');

const url = "https://ra-wo.github.io/Music-Player/";

const Musics = [{
   name: 'MAN WITH A MISSIONINTO THE DEEP',
   src: `${url}/Music/MAN WITH A MISSIONINTO THE DEEP/song.mp3`,
   image: `${url}/Music/MAN WITH A MISSIONINTO THE DEEP/image.jpg`
}, {
   name: 'ずっと真夜中でいいのに暗く黒くMVZUTOMAYO - DARKEN',
   src: `${url}/Music/ずっと真夜中でいいのに暗く黒くMVZUTOMAYO - DARKEN/song.mp3`,
   image: `${url}/Music/ずっと真夜中でいいのに暗く黒くMVZUTOMAYO - DARKEN/image.jpg`
}, {
   name: 'Chris Kläfford - Cold At The Altar',
   src: `${url}/Music/Chris Kläfford - Cold At The Altar/song.mp3`,
   image: `${url}/Music/Chris Kläfford - Cold At The Altar/image.jpeg`
}];

var Song = 1;
var isPlay = false;
var audio = new Audio();

audio.src = Musics[Song].src;
audio.preload = ('metadata');

audio.onloadeddata = function() {
   TimeEnd.textContent = timeFormat(audio.duration);
   image.style.backgroundImage = `url('${Musics[Song].image}')`
   title.textContent = Musics[Song].name;
};


function play() {

   if (isPlay) {
      audio.pause();
      isPlay = false;
      pBTNpClicked('pause');
   } else {
      audio.play();
      isPlay = true;
      pBTNpClicked('play');
   }

}

function pBTNpClicked(c) {

   const pauseBTN = 'fa-pause';
   const playBTN = 'fa-play';

   switch (c) {
      case 'play':
         pBTNp.children[0].classList.remove(playBTN);
         pBTNp.children[0].classList.add(pauseBTN);
         image.style.animationPlayState = 'running';
         break;

      case 'pause':
         pBTNp.children[0].classList.add(playBTN);
         pBTNp.children[0].classList.remove(pauseBTN);
         image.style.animationPlayState = 'paused';
   }
}

function timeFormat(time) {

   const m = Math.floor(time / 60);
   const s = Math.floor(time - (m * 60));
   if (s > 9) {
      return `${m}:${s}`;
   } else {
      return `${m}:0${s}`;
   }

}

previous.onclick = function() {
   
   if (Song - 1 >= 0){
      Song -= 1;
      audio.src = Musics[Song].src;
      audio.onloadeddata = function() {
         TimeEnd.textContent = timeFormat(audio.duration);
         image.style.backgroundImage = `url('${Musics[Song].image}')`
         title.textContent = Musics[Song].name;
      };
      pBTNpClicked('pause');
      isPlay = false;
      rate.style.width = '0.001px';
      play();
   } else {
      Song = Musics.length - 1;
      audio.src = Musics[Song].src;
      audio.onloadeddata = function() {
         TimeEnd.textContent = timeFormat(audio.duration);
         image.style.backgroundImage = `url('${Musics[Song].image}')`
         title.textContent = Musics[Song].name;
      };
      pBTNpClicked('pause');
      isPlay = false;
      rate.style.width = '0.001px';
      play();
   }
}

next.onclick = function() {
   
   if (Song + 1 <= Musics.length - 1){
      Song += 1;
      audio.src = Musics[Song].src;
      audio.onloadeddata = function() {
         TimeEnd.textContent = timeFormat(audio.duration);
         image.style.backgroundImage = `url('${Musics[Song].image}')`
         title.textContent = Musics[Song].name;
      };
      pBTNpClicked('pause');
      isPlay = false;
      rate.style.width = '0.001px';
      play();
   } else {
      Song = 0;
      audio.src = Musics[Song].src;
      audio.onloadeddata = function() {
         TimeEnd.textContent = timeFormat(audio.duration);
         image.style.backgroundImage = `url('${Musics[Song].image}')`
         title.textContent = Musics[Song].name;
      };
      pBTNpClicked('pause');
      isPlay = false;
      rate.style.width = '0.001px';
      play();
   }
   
}

audio.addEventListener("timeupdate", function() {
   
   p.textContent = timeFormat(audio.currentTime);
   rate.style.width = `${(audio.currentTime / audio.duration * 100)}%`;
   
});


audio.onended = function() {
   isPlay = false;
   pBTNpClicked('pause');
   const event = new Event('click');
   next.dispatchEvent(event);
}

function setCurrentTime(event, element){
  const width = (element.offsetWidth);
  const clientx = (event.offsetX);
  const duration = audio.duration;
  audio.currentTime = (clientx/width * duration);
}
