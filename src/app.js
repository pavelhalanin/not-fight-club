class App {
  static async render() {
    const DIV = document.getElementById("root");

    if (!DIV) {
      alert("HTML node not found: #root");
      return;
    }

    DIV.innerHTML = `
      ${Header.render()}
      <div id="app"></div>
    `;

    App.renderRoute();
  }

  static navigate(url) {
    window.location.hash = `#${url}`;
    this.render();
  }

  static async renderRoute() {
    const path = window.location.hash;

    if (path === "") {
      App.navigate("/");
      return;
    }

    const app = document.getElementById("app");

    if (!app) {
      alert("HTML node not found: #app");
      return;
    }

    try {
      app.innerHTML = Audio.renderAudioDisclaimer();

      while (Audio.AudioDisclaimerIsSubmitted()) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      console.log("path", path);

      if (path == "#/posts/" || path == "#/posts") {
        app.innerHTML = Error404Page.render();
        return;
      }

      if (path.startsWith("#/posts/")) {
        const ID = path.replace("#/posts/", "");
        app.innerHTML = `Loading by id = ${ID}...`;
        await sleep(1000);
        app.innerHTML = await PoscastByIdPage.render({
          id: ID,
        });
        return;
      }

      const AUDIO = document.getElementById("root_audio");
      switch (path) {
        case "#/":
          app.innerHTML = HomePage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/about":
          app.innerHTML = AboutPage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/registration":
          app.innerHTML = RegistrationPage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/character":
          app.innerHTML = Character.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/settings":
          app.innerHTML = SettingsPage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/battle":
          app.innerHTML = BattlePage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("battle"));

          return;

        default:
          app.innerHTML = Error404Page.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;
      }
    } catch (exception) {
      console.log(exception);
      app.innerHTML = `<p style="color: red;">${exception}</p>`;
    }
  }
}
