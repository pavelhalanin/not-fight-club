class BattlePage {
  static onsubmit(event) {
    event.preventDefault();
    this.checkForm();

    const FORM_DATA = new FormData(event.target);
    const DATA = Object.fromEntries(FORM_DATA.entries());

    console.log(DATA);
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

    return `
      <div class="container">
        <form onsubmit="${this.name}.onsubmit(event);" id="battle_form">
          <div class="battle_inputs__container">
            <div>
              <div>Please pick one attack zone</div>
              <div>
                <label for="attack_head">Head</label>
                <input
                  type="radio"
                  name="attack_zone"
                  value="head"
                  id="attack_head"
                  onchange="${this.name}.checkForm()"
                >
              </div>
              <div>
                <label for="attack_neek">Neek</label>
                <input
                  type="radio"
                  name="attack_zone"
                  value="neek"
                  id="attack_neek"
                  onchange="${this.name}.checkForm()"
                >
              </div>
              <div>
                <label for="attack_body">Body</label>
                <input
                  type="radio"
                  name="attack_zone"
                  value="body"
                  id="attack_body"
                  onchange="${this.name}.checkForm()"
                >
              </div>
              <div>
                <label for="attack_belly">Belly</label>
                <input
                  type="radio"
                  name="attack_zone"
                  value="belly"
                  id="attack_belly"
                  onchange="${this.name}.checkForm()"
                >
              </div>
              <div>
                <label for="attack_legs">Legs</label>
                <input
                  type="radio"
                  name="attack_zone"
                  value="legs"
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
                  id="defence_head"
                  onchange="${this.name}.checkForm()"
                >
                <label for="defence_head">Head</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="defence_zone[neek]"
                  id="defence_neek"
                  onchange="${this.name}.checkForm()"
                >
                <label for="defence_neek">Neek</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="defence_zone[body]"
                  id="defence_body"
                  onchange="${this.name}.checkForm()"
                >
                <label for="defence_body">Body</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="defence_zone[belly]"
                  id="defence_belly"
                  onchange="${this.name}.checkForm()"
                >
                <label for="defence_belly">Belly</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="defence_zone[legs]"
                  id="defence_legs"
                  onchange="${this.name}.checkForm()"
                >
                <label for="defence_legs">Legs</label>
              </div>
            </div>
          </div>
          <div class="battle_attack_button__container">
            <button id="battle_attack_button" disabled>Attack!</button>
          </div>
        </form>
      </div>
    `;
  }
}
