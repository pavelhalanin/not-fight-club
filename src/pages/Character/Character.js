class Character {
  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      return `
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

    const AVATAR_ID = USER?.id_avatar || "";
    const POKEMON = GamePokemon.getById(AVATAR_ID);

    const POKEMON_ARRAY = GamePokemon.get();

    return `
      <div class="content">
        <div class="container">
          <div class="character__container">
            <div>
              <div>
                Your Name: ${USER.name}
                <button onclick="App.navigate('/settings');">change name</button>
              </div>
              <div class="character_image__container">
                ${!POKEMON ? "?" : `<img src="${POKEMON.image}" alt="">`}
              </div>
            </div>
            <div>
              <div>Change avatar</div>
              <div class="avatar_array__container">
                <ul>
                  ${POKEMON_ARRAY.map((e) => {
                    return `
                      <li>
                        <button onclick="
                          GameUsers.changeAvatarId('${e.id}');
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
      </div>
    `;
  }
}
