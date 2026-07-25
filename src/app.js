class App {
  static async render() {
    const DIV = document.getElementById("root");

    if (!DIV) {
      alert("HTML node not found: #root");
      return;
    }

    DIV.innerHTML = Audio.renderAudioDisclaimer();

    while (Audio.AudioDisclaimerIsSubmitted()) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    DIV.innerHTML = `
      <button
        class="app__dialog_burger_button"
        command="show-modal"
        commandfor="app__dialog_menu"
      >
        ☰
      </button>
      ${MenuDialog.render()}
      <div id="app"></div>
    `;

    App.renderRoute();
    App.init();
  }

  static init() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("[data-spa-link]");
      if (link) {
        e.preventDefault();
        const href = link.getAttribute("href");
        history.pushState(null, "", href);
        this.renderRoute();
      }
    });

    window.addEventListener("popstate", this.renderRoute);
  }

  static navigate(url) {
    window.location.hash = `#${url}`;
  }

  static async renderRoute() {
    const path = window.location.hash;
    const app = document.getElementById("app");

    if (!app) {
      alert("HTML node not found: #app");
      return;
    }

    try {
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
        case "":
        case "#/":
          app.innerHTML = Home.render();
          App.navigate("/");

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/about":
          app.innerHTML = AboutPage.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/registration":
          app.innerHTML = Registration.render();

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/character":
          app.innerHTML = `character`;

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/settings":
          app.innerHTML = "settings";

          Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

          return;

        case "#/battle":
          app.innerHTML = `battle`;

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
