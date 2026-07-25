class Character {
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

    const SELECTED_AVATAR_ID = GameSelectedAvatar.get();
    const POKEMON = GamePokemon.getById(SELECTED_AVATAR_ID);

    const POKEMON_ARRAY = GamePokemon.get();

    return `
      ${NameWidget.render()}
      <div class="content">
        <div class="container">
          <div class="home__content">
            <div>Name: ${USER.name}</div>
            <div class="character_image__container">
              ${!POKEMON ? "?" : `<img src="${POKEMON.image}" alt="">`}
            </div>
          </div>
          <div class="home__content">
            <p>Change avatar</p>
            <div class="avatar_array__container">
              <ul>
                ${POKEMON_ARRAY.map((e) => {
                  return `
                    <li>
                      <button onclick="
                        GameSelectedAvatar.set('${e.id}');
                        App.navigate('/character');
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
    `;
  }
}
