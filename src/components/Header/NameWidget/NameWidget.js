class NameWidget {
  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      return "";
    }

    const AVATAR_ID = USER?.id_avatar || "";

    const POKEMON = GamePokemon.getById(AVATAR_ID);
    console.log(POKEMON);

    if (!POKEMON) {
      return `
        <span class="name_widget__content">
          <span class="name_widget__img">
            ?
          </span>
          &lt;${USER.name}&gt;
        </span>
      `;
    }

    return `
      <span class="name_widget__content">
        <span class="name_widget__img">
          <img src="${POKEMON.image}" alt="">
        </span>
        &lt;${USER.name}&gt;
      </span>
    `;
  }
}
