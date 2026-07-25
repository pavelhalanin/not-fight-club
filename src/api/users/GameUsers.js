class GameUsers {
  static key = "notFightClub_table__users";

  static get() {
    const STRING_OBJ = localStorage.getItem(this.key);

    let array = [];
    if (STRING_OBJ) {
      array = JSON.parse(STRING_OBJ);
      if (!Array.isArray(array)) {
        array = [];
        localStorage.setItem(this.key, JSON.stringify(array));
      }
    }

    return array;
  }

  static addUserByName(username) {
    const ARRAY = this.get();

    const USER = {
      id: generatorId(),
      name: `${username}`,
    };

    ARRAY.push(USER);

    localStorage.setItem(this.key, JSON.stringify(ARRAY));
    GameSelectedUser.set(USER.id);
  }

  static getById(id) {
    const USERS = this.get();
    return USERS.find((element) => element.id === id);
  }
}
