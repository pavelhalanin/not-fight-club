class BattlePage {
  static async onsubmit(event) {
    event.preventDefault();
    this.checkForm();

    const BUTTON = document.getElementById("battle_attack_button");
    const OPPONENT_CRIES = document.getElementById("opponent_cries_audio");
    const I_CRIES = document.getElementById("i_cries_audio");

    BUTTON.setAttribute("disabled", "true");

    if (!BUTTON) {
      return;
    }

    if (!OPPONENT_CRIES) {
      return;
    }

    if (!I_CRIES) {
      return;
    }

    I_CRIES.play();
    await sleep(500);
    OPPONENT_CRIES.play();
    await sleep(1000);

    const FORM_DATA = new FormData(event.target);
    const DATA = Object.fromEntries(FORM_DATA.entries());

    GameBattle.setBattleCheckbox(DATA);
    GameBattle.attackLogic();

    BUTTON.removeAttribute("disabled");
  }

  static checkForm() {
    const FORM = document.getElementById("battle_form");
    const BUTTON = document.getElementById("battle_attack_button");

    if (!FORM) {
      return;
    }

    if (!BUTTON) {
      return;
    }

    BUTTON.setAttribute("disabled", "true");

    const FORM_DATA = new FormData(FORM);
    const DATA = Object.fromEntries(FORM_DATA.entries());
    GameBattle.setBattleCheckbox(DATA);

    const KEYS = Object.keys(DATA);

    let attack_count = 0;
    for (let i = 0; i < KEYS.length; i++) {
      if (KEYS[i] === "attack_zone") {
        attack_count += 1;
      }
    }

    let defence_count = 0;
    const DEFENCE_KEYS = [
      "defence_zone[head]",
      "defence_zone[neek]",
      "defence_zone[body]",
      "defence_zone[belly]",
      "defence_zone[legs]",
    ];
    for (let i = 0; i < KEYS.length; i++) {
      if (DEFENCE_KEYS.includes(KEYS[i])) {
        defence_count += 1;
      }
    }

    if (attack_count === 1 && defence_count === 2) {
      BUTTON.removeAttribute("disabled");
    }
  }

  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      Audio.setUrlAndPlay(Audio.getTrackUrl("lobby"));

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

    Audio.setUrlAndPlay(Audio.getTrackUrl("battle"));

    const { I, OPPONENT } = GameBattle.getBattleStaff();
    const BATTLE_INFO = GameBattle.getBattleInfo();
    const LOGS = (BATTLE_INFO.logs || []).reverse();

    return `
      <div class="container">
        <div class="battle__container">
          <div>
            <div class="battle_staff__img_block">
              <img src="${I.image}" alt="">
            </div>
            <video id="i_cries_audio" style="display: none;" src="${I.cries}"></video>
            ${HpIndicator.render(BATTLE_INFO.hp_i, I.hp)}
          </div>
          ${
            BATTLE_INFO.hp_i === 0
              ? `
                  <div style="text-align: center;">
                    <div class="text-danger">You are fail</div>
                    <button class="btn" onclick="GameBattle.newBattle()">New battle</button>
                  </div>
                `
              : BATTLE_INFO.hp_opponent === 0
                ? `
                    <div style="text-align: center;">
                      <div class="text-success">You are win</div>
                      <button class="btn" onclick="GameBattle.newBattle()">New battle</button>
                    </div>
                  `
                : `
                    <form onsubmit="${this.name}.onsubmit(event);" id="battle_form">
                      <div class="battle_inputs__container">
                        <div>
                          <div>Please pick one attack zone</div>
                          <div>
                            <label for="attack_head">(${I.attack.head}) Head</label>
                            <input
                              type="radio"
                              name="attack_zone"
                              value="head"
                              ${BATTLE_INFO.input_attack_head ? "checked" : ""}
                              id="attack_head"
                              onchange="${this.name}.checkForm()"
                            >
                          </div>
                          <div>
                            <label for="attack_neek">(${I.attack.neek}) Neek</label>
                            <input
                              type="radio"
                              name="attack_zone"
                              value="neek"
                              ${BATTLE_INFO.input_attack_neek ? "checked" : ""}
                              id="attack_neek"
                              onchange="${this.name}.checkForm()"
                            >
                          </div>
                          <div>
                            <label for="attack_body">(${I.attack.body}) Body</label>
                            <input
                              type="radio"
                              name="attack_zone"
                              value="body"
                              ${BATTLE_INFO.input_attack_body ? "checked" : ""}
                              id="attack_body"
                              onchange="${this.name}.checkForm()"
                            >
                          </div>
                          <div>
                            <label for="attack_belly">(${I.attack.belly}) Belly</label>
                            <input
                              type="radio"
                              name="attack_zone"
                              value="belly"
                              ${BATTLE_INFO.input_attack_belly ? "checked" : ""}
                              id="attack_belly"
                              onchange="${this.name}.checkForm()"
                            >
                          </div>
                          <div>
                            <label for="attack_legs">(${I.attack.legs}) Legs</label>
                            <input
                              type="radio"
                              name="attack_zone"
                              value="legs"
                              ${BATTLE_INFO.input_attack_legs ? "checked" : ""}
                              id="attack_legs"
                              onchange="${this.name}.checkForm()"
                            >
                          </div>
                        </div>
                        <div>
                          <div>Please pick two defence zone</div>
                          <div>
                            <input
                              type="checkbox"
                              name="defence_zone[head]"
                              ${BATTLE_INFO.input_defence_head ? "checked" : ""}
                              id="defence_head"
                              onchange="${this.name}.checkForm()"
                            >
                            <label for="defence_head">Head (${I.defence.head})</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="defence_zone[neek]"
                              ${BATTLE_INFO.input_defence_neek ? "checked" : ""}
                              id="defence_neek"
                              onchange="${this.name}.checkForm()"
                            >
                            <label for="defence_neek">Neek (${I.defence.neek})</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="defence_zone[body]"
                              ${BATTLE_INFO.input_defence_body ? "checked" : ""}
                              id="defence_body"
                              onchange="${this.name}.checkForm()"
                            >
                            <label for="defence_body">Body (${I.defence.body})</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="defence_zone[belly]"
                              ${BATTLE_INFO.input_defence_belly ? "checked" : ""}
                              id="defence_belly"
                              onchange="${this.name}.checkForm()"
                            >
                            <label for="defence_belly">Belly (${I.defence.belly})</label>
                          </div>
                          <div>
                            <input
                              type="checkbox"
                              name="defence_zone[legs]"
                              ${BATTLE_INFO.input_defence_legs ? "checked" : ""}
                              id="defence_legs"
                              onchange="${this.name}.checkForm()"
                            >
                            <label for="defence_legs">Legs (${I.defence.legs})</label>
                          </div>
                        </div>
                      </div>
                      <div class="battle_attack_button__container">
                        <button id="battle_attack_button" disabled>Attack!</button>
                      </div>
                    </form>
                  `
          }
          <div>
            <div class="battle_staff__img_block">
              <img src="${OPPONENT.image}" alt="">
            </div>
            <video id="opponent_cries_audio" style="display: none;" src="${OPPONENT.cries}"></video>
            ${HpIndicator.render(BATTLE_INFO.hp_opponent, OPPONENT.hp)}
          </div>
        </div>
        <div class="battle_logs__container">
          ${LOGS.map((e) => {
            return `<div>${e}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  }
}
