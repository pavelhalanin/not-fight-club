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

  static calcAttack(
    BATTLE_OBJECT,
    I,
    OPPONENT,
    item,
    isOpponent,
    defenceItemArray = [],
  ) {
    let hp_attack = 0;
    const i_attack = I.attack[item];
    const opponent_defence = OPPONENT.defence[item];

    const DATETIME = new Date().toJSON().slice(0, 19).replace("T", " ");

    const IS_CRITICK_I = RandomHelper.randomInt(0, 3) === 0; // 25% (1,2,3 - not critical)

    let message = "";
    if (IS_CRITICK_I) {
      hp_attack = -1 * i_attack;

      message = `\n<span class="text-info">CRITICAL HIT</span>. Defence = ${opponent_defence}), attack = ${i_attack}. So result attack = ${hp_attack} because defence ignored on critical hit`;
    } else if (defenceItemArray.includes(item)) {
      hp_attack = opponent_defence - i_attack;
      hp_attack = hp_attack < 0 ? hp_attack : 0;

      message = `\n<span class="text-info">It is normal attack</span>. Defence = ${opponent_defence}, attack = ${i_attack}. So result attack = ${hp_attack}`;
    } else {
      hp_attack = -1 * i_attack;

      message = `\n<span class="text-info">It is normal attack</span>. Defence = ${opponent_defence}, attack = ${i_attack}. So result attack = ${hp_attack} because hit ${item} and not defence (${defenceItemArray.join(",")})`;
    }

    BATTLE_OBJECT.logs.push(
      [
        `[${DATETIME}]`,
        `WHO: <span class="${isOpponent ? "text-danger" : "text-success"}">${I.name}</span>`,
        `/`,
        `WHOM: <span class="${isOpponent ? "text-success" : "text-danger"}">${OPPONENT.name}</span>`,
        `/`,
        `WHERE: <span class="text-info">${item}</span>`,
        `/`,
        `HOW MUCH: <span class="text-info">${hp_attack}</span>`,
        `${message}\n`,
      ].join(" "),
    );

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
        let hp_attack = 0;
        const IS_CRITICK_I = RandomHelper.randomInt(0, 1);

        const MY_ATTACK = `${KEYS_ATTACK[i]}`.replace("input_attack_", "");

        const MY_DEFENCE = Object.keys(BATTLE_OBJECT)
          .filter((e) => e.startsWith("input_defence_"))
          .map((e) => (BATTLE_OBJECT[e] ? e : false))
          .filter((e) => e)
          .map((e) => e.replace("input_defence_", ""));

        BATTLE_OBJECT.hp_opponent += this.calcAttack(
          BATTLE_OBJECT,
          I,
          OPPONENT,
          MY_ATTACK,
          false,
          MY_DEFENCE,
        );

        if (BATTLE_OBJECT.hp_opponent < 0) {
          BATTLE_OBJECT.hp_opponent = 0;
        }

        break;
      }
    }

    const ATTACK_VARIANTS = ["head", "neek", "body", "belly", "legs"];

    const RANDOM_ATTACK_INDEX = RandomHelper.randomInt(
      0,
      ATTACK_VARIANTS.length - 1,
    );

    const RANDOM_OPPONENT_ATTACK = ATTACK_VARIANTS[RANDOM_ATTACK_INDEX];

    BATTLE_OBJECT.hp_i += this.calcAttack(
      BATTLE_OBJECT,
      OPPONENT,
      I,
      RANDOM_OPPONENT_ATTACK,
      true,
      ["head", "neek", "body", "belly", "legs"]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2),
    );

    if (BATTLE_OBJECT.hp_i < 0) {
      BATTLE_OBJECT.hp_i = 0;
    }

    GameUsers.changeBattleCounter(
      BATTLE_OBJECT.hp_i,
      BATTLE_OBJECT.hp_opponent,
    );

    localStorage.setItem(this.key, JSON.stringify(BATTLE_OBJECT));
    App.render();
  }

  static newBattle() {
    localStorage.removeItem(this.key);
    App.render();
  }
}
