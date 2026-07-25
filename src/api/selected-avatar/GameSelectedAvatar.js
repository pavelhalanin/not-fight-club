class GameSelectedAvatar {
  static key = "notFightClub_var__selected_avatar_id";

  static get() {
    const SELECTED_AVATAR_ID = localStorage.getItem(this.key);

    if (!SELECTED_AVATAR_ID) {
      localStorage.setItem(this.key, "");
      return "";
    }

    const POKEMON = GamePokemon.getById(SELECTED_AVATAR_ID);

    return POKEMON && POKEMON.id ? POKEMON.id : "";
  }

  static set(pokemonId) {
    const POKEMON = GamePokemon.getById(pokemonId);

    if (POKEMON && POKEMON.id) {
      localStorage.setItem(this.key, POKEMON.id);
      return;
    }

    localStorage.setItem(this.key, "");
  }
}
