class Settings {
  static onsubmit() {
    event.preventDefault();
    const FORM_DATA = new FormData(event.target);
    const DATA = Object.fromEntries(FORM_DATA.entries());

    const NAME = `${DATA.game_name}`.trim();

    GameUsers.changeUserName(NAME);
    App.navigate("/settings");
  }

  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      return `
        ${NameWidget.render()}
        <div class="content">
          <div class="container">
            <div class="home__content">
              <p style="color: red;">You are not create Player. Please registred</p>
              <button class="btn" onclick="App.navigate('/registration')">Registred</button>
            </div>
          </div>
        </div>
      `;
    }

    const POKEMON_ARRAY = GamePokemon.get();

    return `
      ${NameWidget.render()}
      <div class="content">
        <div class="container">
          <div class="home__content">
            <p style="color: green;">You are registed as &lt;${USER.name}&gt;. You can change username</p>
            <form class="game_name__form" onsubmit="${this.name}.onsubmit(event)">
              <p>Please enter you new name</p>
              <input
                type="hidden"
                value="${USER.id}"
              >
              <input
                type="text"
                name="game_name"
                value="${USER.name}"
                placeholder="Name"
                minlength="3"
                pattern="^\\s*\\S(?:.*\\S){2,}\\s*$"
                oninvalid="this.setCustomValidity('Please enter at least 3 characters (leading/trailing spaces are ignored)')"
                oninput="this.setCustomValidity('')"
                required
              >
              <input type="submit" value="Send">
            </form>
            <div>
              <p>Change avatar</p>
              <div class="avatar_array__container">
                <ul>
                  ${POKEMON_ARRAY.map((e) => {
                    return `
                      <li>
                        <button onclick="
                          GameSelectedAvatar.set('${e.id}');
                          App.navigate('/settings');
                        ">
                          <img src="${e.image}" alt="">
                        </button>
                      </li>
                    `;
                  }).join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
