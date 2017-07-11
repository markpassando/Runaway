class Sound {
  constructor() {
    this.music = {
      theme: new Audio('assets/audio/runaway.mp3'),
      ending: new Audio('assets/audio/through-the-wire.mp3')
    }
    this.volume = .5;
    this.mute = false;

    this.addEventHandlers();
  }

  playTheme() {
    if (typeof this.music.theme.loop == 'boolean')
    {
        this.music.theme.loop = true;
    }
    else
    {
        this.music.theme.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
    this.music.theme.play();
  }

  muteToggle() {
    document.getElementById("mute").classList.toggle("volume-off")
    if (this.mute) {
      // Turn Off
      for (const key of Object.keys(this.music)) {
        this.music[key].muted = false;
        this.mute = false;
      }
    } else {
      // Turn On
      for (const key of Object.keys(this.music)) {
        this.music[key].muted = true;
        this.mute = true;
      }
    }
  }

  addEventHandlers() {
    const muteBtn = document.getElementById("mute");
    muteBtn.addEventListener("click", () => this.muteToggle(), true);
  }

}

export default Sound;
