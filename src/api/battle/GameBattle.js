class GameBattle {
  static key = "notFightClub__battle_info";

  static getBattleInfo() {
    const BATTLE_INFO = localStorage.getItem(this.key);
    return JSON.parse(BATTLE_INFO);
  }

  static setBattleCheckbox(form_data) {
    const BATTLE = localStorage.getItem(this.key);
    const BATTLE_OBJECT = JSON.parse(BATTLE);

    BATTLE_OBJECT.input_attack_head = form_data.attack_zone === "head";
    BATTLE_OBJECT.input_attack_neek = form_data.attack_zone === "neek";
    BATTLE_OBJECT.input_attack_body = form_data.attack_zone === "body";
    BATTLE_OBJECT.input_attack_belly = form_data.attack_zone === "belly";
    BATTLE_OBJECT.input_attack_legs = form_data.attack_zone === "legs";

    BATTLE_OBJECT.input_defence_head = form_data["defence_zone[head]"] === "on";
    BATTLE_OBJECT.input_defence_neek = form_data["defence_zone[neek]"] === "on";
    BATTLE_OBJECT.input_defence_body = form_data["defence_zone[body]"] === "on";
    BATTLE_OBJECT.input_defence_belly =
      form_data["defence_zone[belly]"] === "on";
    BATTLE_OBJECT.input_defence_legs = form_data["defence_zone[legs]"] === "on";

    localStorage.setItem(this.key, JSON.stringify(BATTLE_OBJECT));
  }

  static getBattleStaff() {
    const BATTLE = localStorage.getItem(this.key);

    if (BATTLE) {
      const BATTLE_OBJECT = JSON.parse(BATTLE);
      const I = GamePokemon.getById(BATTLE_OBJECT.id_avatar_i);
      const OPPONENT = GamePokemon.getById(BATTLE_OBJECT.id_avatar_opponent);
      return { I, OPPONENT };
    }

    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);
    const ID_AVATAR = USER?.id_avatar || "";
    const I = GamePokemon.getById(ID_AVATAR);

    const POKEMONS = GamePokemon.get().filter((e) => e.id !== I.id);
    const RANDOM_INDEX = RandomHelper.randomInt(0, POKEMONS.length - 1);

    const OPPONENT = POKEMONS[RANDOM_INDEX];

    const OBJ = {
      input_attack_head: false,
      input_attack_neek: false,
      input_attack_body: false,
      input_attack_belly: false,
      input_attack_legs: false,
      input_defence_head: false,
      input_defence_neek: false,
      input_defence_body: false,
      input_defence_belly: false,
      input_defence_legs: false,
      id_avatar_i: I.id,
      id_avatar_opponent: OPPONENT.id,
      hp_i: I.hp,
      hp_opponent: OPPONENT.hp,
      logs: [],
    };

    localStorage.setItem(this.key, JSON.stringify(OBJ));

    return { I, OPPONENT };
  }

  static calcAttack(BATTLE_OBJECT, I, OPPONENT, item) {
    let hp_attack = 0;
    const i_attack = I.attack[item];
    const opponent_defence = OPPONENT.defence[item];

    const DATETIME = new Date().toJSON().slice(0, 19).replace("T", " ");

    const IS_CRITICK_I = RandomHelper.randomInt(0, 1);
    if (IS_CRITICK_I) {
      hp_attack = -1 * i_attack;

      BATTLE_OBJECT.logs.push(
        `[${DATETIME}] WHO: I (${I.name}) / WHOM: Opponent (${OPPONENT.name}) / WHERE: ${item} / HOW MUCH: ${hp_attack}`,
      );

      BATTLE_OBJECT.logs.push(
        `[${DATETIME}] Critical hit. Defense is ignored and you deal damage ${i_attack}`,
      );
    } else {
      hp_attack = opponent_defence - i_attack;
      hp_attack = hp_attack < 0 ? hp_attack : 0;

      BATTLE_OBJECT.logs.push(
        `[${DATETIME}] WHO: I (${I.name}) / WHOM: Opponent (${OPPONENT.name}) / WHERE: ${item} / HOW MUCH: ${hp_attack}`,
      );

      BATTLE_OBJECT.logs.push(
        `[${DATETIME}] A normal attack. The opponent has ${opponent_defence}, and you deal ${i_attack} damage. This means you deal damage ${hp_attack}`,
      );
    }

    return hp_attack;
  }

  static attackLogic() {
    const BATTLE_OBJECT = this.getBattleInfo();
    const I = GamePokemon.getById(BATTLE_OBJECT.id_avatar_i);
    const OPPONENT = GamePokemon.getById(BATTLE_OBJECT.id_avatar_opponent);

    const I_HP = BATTLE_OBJECT.hp_i;
    const OPPONENT_HP = BATTLE_OBJECT.hp_opponent;

    BATTLE_OBJECT.hp_opponent;

    const KEYS_ATTACK = Object.keys(BATTLE_OBJECT).filter((e) =>
      e.startsWith("input_attack_"),
    );
    for (let i = 0; i < KEYS_ATTACK.length; i++) {
      if (BATTLE_OBJECT[KEYS_ATTACK[i]]) {
        console.log(KEYS_ATTACK[i]);

        let hp_attack = 0;
        const IS_CRITICK_I = RandomHelper.randomInt(0, 1);

        switch (KEYS_ATTACK[i]) {
          case "input_attack_head":
            BATTLE_OBJECT.hp_opponent += this.calcAttack(
              BATTLE_OBJECT,
              I,
              OPPONENT,
              "head",
            );
            break;

          case "input_attack_neek":
            BATTLE_OBJECT.hp_opponent += this.calcAttack(
              BATTLE_OBJECT,
              I,
              OPPONENT,
              "neek",
            );
            break;

          case "input_attack_body":
            BATTLE_OBJECT.hp_opponent += this.calcAttack(
              BATTLE_OBJECT,
              I,
              OPPONENT,
              "body",
            );
            break;

          case "input_attack_belly":
            BATTLE_OBJECT.hp_opponent += this.calcAttack(
              BATTLE_OBJECT,
              I,
              OPPONENT,
              "belly",
            );
            break;

          case "input_attack_legs":
            BATTLE_OBJECT.hp_opponent += this.calcAttack(
              BATTLE_OBJECT,
              I,
              OPPONENT,
              "legs",
            );
            break;
        }

        if (BATTLE_OBJECT.hp_opponent < 0) {
          BATTLE_OBJECT.hp_opponent = 0;
        }

        break;
      }
    }

    localStorage.setItem(this.key, JSON.stringify(BATTLE_OBJECT));
    App.render();
  }

  static newBattle() {
    localStorage.removeItem(this.key);
    App.render();
  }
}
