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

    const POKEMON_ARRAY = GamePokemon.get();
    const battle_count = {};
    for (let i = 0; i < POKEMON_ARRAY.length; i++) {
      const POKEMON_ID = POKEMON_ARRAY[i].id;
      battle_count[POKEMON_ID] = {
        win: 0,
        fail: 0,
      };
    }

    const USER = {
      id: generatorId(),
      id_avatar: "",
      created_at: new Date().toJSON().slice(0, 19),
      name: `${username}`,
      battle_count,
    };

    ARRAY.push(USER);

    localStorage.setItem(this.key, JSON.stringify(ARRAY));
    GameSelectedUser.set(USER.id);
  }

  static getById(id) {
    const USERS = this.get();
    return USERS.find((element) => element.id === id);
  }

  static changeUserName(name) {
    const USERS = this.get();

    const USER_ID = GameSelectedUser.get();

    if (!USER_ID) {
      return;
    }

    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].id === USER_ID) {
        USERS[i].name = name;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(USERS));
  }

  static changeAvatarId(id_avatar) {
    const USERS = this.get();

    const USER_ID = GameSelectedUser.get();

    if (!USER_ID) {
      return;
    }

    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].id === USER_ID) {
        USERS[i].id_avatar = id_avatar;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(USERS));
  }

  static changeBattleCounter(hp_i, hp_opponent) {
    const USER_ID = GameSelectedUser.get();
    const USERS = this.get();

    for (let i = 0; i < USERS.length; i++) {
      if (USERS[i].id === USER_ID) {
        if (hp_i === 0) {
          USERS[i].battle_count[USERS[i].id_avatar].fail += 1;
          break;
        }

        if (hp_opponent === 0) {
          USERS[i].battle_count[USERS[i].id_avatar].win += 1;
          break;
        }

        break;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(USERS));
  }
}
