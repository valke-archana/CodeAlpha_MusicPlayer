let songName=document.querySelector("#song-name");
let songSinger=document.querySelector("#song-artist");
let songImage=document.querySelector(".song-image");
let playPauseImg=document.querySelector("#play-pause");
let volumeRange=document.querySelector("#volume-range");
let songRange=document.querySelector("#song-duaration");
let volSvg=document.querySelector("#vol-svg");
let playListImage=document.querySelector("#playlist-img");
let playList=document.querySelector(".playlist");
let playListSong=document.querySelectorAll(".playlist-song")
let index=0;
let playingSong=false;
let track=document.createElement("audio")
let songs=[
    {
        name:"Krishna flute",
        path:"songs/Krishna flute.mp3",
        image:"music_images/image-1.jpg",
        singer:"Shri Krishna"
    },
    {
        name:"Believer",
        path:"songs/Believer.mp3",
        image:"music_images/image-2.jpg",
        singer:"Imagine Dragons"
    },
    {
        name:"Gaaju Bomma",
        path:"songs/Gaaju Bomma.mp3",
        image:"music_images/image-3.jpg",
        singer:"Hesham Abdul Wahab"
    },
    {
        name:"Mari Anthaga",
        path:"songs/Movie Song.mp3",
        image:"music_images/image-4.jpg",
        singer:"Sreerama Chandra"
    }
]
function loadTrack(index){
    track.src=songs[index].path;
    songName.innerHTML=songs[index].name;
    songSinger.innerHTML=songs[index].singer;
    songImage.style=`background-image: url("${songs[index].image}");`
    volume();
    duration();
    setInterval(()=>{
        songRange.max=track.duration
        songRange.value=track.currentTime
    },1000)
    track.loop=true;
    track.load()
}

loadTrack(index);
function playPause(){
    if(playingSong==false){
        playSong()
    }else{
        pauseSong()
    }
}
function playSong(){
    track.play();
    playingSong=true;
    playPauseImg.src="pause.svg"
}
function pauseSong(){
    track.pause();
    playingSong=false;
    playPauseImg.src="play.svg"
}
function nextSong(){
    if(index<songs.length-1){
        index++;
        loadTrack(index)
        playSong()
       }else{
        index=0;
        loadTrack(index)
        playSong()
    }
}

function previousSong(){
    if(index>0){
        index--;
        loadTrack(index)
        playSong()
       }else{
        index=songs.length-1;
        loadTrack(index)
        playSong()
    }
}
function volume(){
    track.volume=volumeRange.value/100
    if(volumeRange.value==0){
        volSvg.src="mute.svg"
    }
    else{
        volSvg.src="voulme.svg"
    }

}

function duration(){
    track.currentTime=songRange.value;
}
playListImage.addEventListener("click",()=>{
    playList.classList.toggle("playlist-active")
    if(playList.classList.contains("playlist-active")){
        playListImage.src="cross.svg"
    }
    else{
        playListImage.src="playlist.svg"
    }
})
playListSong.forEach((song,index)=>{
    song.addEventListener("click",()=>{
        loadTrack(index)
        playSong()
        playList.classList.remove("playlist-active")
        playListImage.src="playlist.svg"


    })
})