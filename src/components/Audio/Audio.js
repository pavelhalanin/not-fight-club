class Audio {
  static id_audio = "root_audio";

  static getTrackUrl(key) {
    const LIB = {
      lobby: "./assets/audio/Waterflame-SAP-Battle-Arena-OST_-Lobby-Nap.ogg",
      battle: "./assets/audio/Waterflame-Glorious-Morning.ogg",
    };

    return LIB[key];
  }

  static renderAudioDisclaimer() {
    return `
      <div style="display: flex;">
        <div class="audio_disclaimer__content">
          <h2>Audio Disclaimer</h2>
          <p>You will be restored to your previous location. If you disconnected during combat, you will re-enter the fight at the exact same moment.</p>
          <p>Why click? Browser autoplay policy requires user interaction.</p>
          <p><label class="audio_disclaimer__button" for="audio_disclaimer_checkbox">Click to continue</label></p>
          <div class="audio_disclaimer__progress"></div>
        </div>
      </div>
    `;
  }

  static AudioDisclaimerIsSubmitted() {
    const INPUT = document.getElementById("audio_disclaimer_checkbox");

    if (!INPUT) {
      return true;
    }

    return !INPUT.checked;
  }

  static setUrlAndPlay(url) {
    const AUDIO = this.getAudio();

    const CURRENT_SRC = AUDIO.getAttribute("src");

    if (CURRENT_SRC !== url) {
      this.setUrl(url);
      AUDIO.loop = true;
      this.play();
    }
  }

  static getAudio() {
    const NODE = document.getElementById(this.id_audio);
    if (!NODE) {
      alert(`HTML node not found: #${this.id_audio}`);
      return;
    }

    return NODE;
  }

  static setUrl(url) {
    const AUDIO = this.getAudio();
    AUDIO.setAttribute("src", url);
  }

  static play() {
    const AUDIO = this.getAudio();
    AUDIO.play().catch(() => {});
  }
}
