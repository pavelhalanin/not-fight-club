class GameBattle {
  static getBattleStaff() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);
    const ID_AVATAR = USER?.id_avatar || "";
    const I = GamePokemon.getById(ID_AVATAR);

    const POKEMONS = GamePokemon.get().filter((e) => e.id !== I.id);
    const RANDOM_INDEX = RandomHelper.randomInt(0, POKEMONS.length - 1);

    const OPPONENT = POKEMONS[RANDOM_INDEX];
    return {I, OPPONENT};
  }
}
