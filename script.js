const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const musicImage = document.getElementById('music-image');
const songList = document.getElementById('song-list');
const volumeSlider = document.getElementById('volumeSlider');

const songs = [
  {
    name: 'Song 1',
    src: 'song1.mp3',
    image: 'image1.jpg'
  },
  {
    name: 'Song 2',
    src: 'song2.mp3',
    image: 'image2.jpg'
  },
  {
    name: 'Song 3',
    src: 'song3.mp3',
    image: 'image3.jpg'
  }
];

let currentSongIndex = 0;

// Function to load song
function loadSong(song) {
  audio.src = song.src;
  musicImage.style.backgroundImage = `url(${song.image})`;
}

// Toggle play/pause
function playPauseSong() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '⏯️';
  }
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playPauseSong();
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playPauseSong();
}

// Load songs into the panel
function loadSongList() {
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    const img = document.createElement('div');
    const songName = document.createElement('span');

    img.classList.add('song-image');
    img.style.backgroundImage = `url(${song.image})`;

    songName.textContent = song.name;

    li.appendChild(img);
    li.appendChild(songName);

    // Add click event to switch song
    li.addEventListener('click', () => {
      currentSongIndex = index;
      loadSong(songs[currentSongIndex]);
      playPauseSong();
    });

    songList.appendChild(li);
  });
}

// Volume control
volumeSlider.addEventListener('input', function() {
  audio.volume = volumeSlider.value;
});

// Event listeners for buttons
playPauseBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Initialize the player with the first song
loadSong(songs[currentSongIndex]);
loadSongList();
