class Registration {
  static nameKey = "notFightClub__name";

  static render() {
    return `
      <div class="game_name__wrapper">
        <form class="game_name__form" onsubmit="${this.name}.onsubmit(event)">
          <p>Register new player:</p>
          <input
            type="text"
            id="game__input_name"
            name="game_name"
            value=""
            placeholder="Name"
            minlength="3"
            pattern="^\\s*\\S(?:.*\\S){2,}\\s*$"
            oninvalid="this.setCustomValidity('Please enter at least 3 characters (leading/trailing spaces are ignored)')"
            oninput="this.setCustomValidity('')"
            required
          >
          <input type="submit" value="Send">
        </form>
        ${SignInArray.render()}
      </div>
    `;
  }

  static getName() {
    return localStorage.getItem(this.nameKey);
  }

  static setName(name) {
    localStorage.setItem(this.nameKey, name);
  }

  static isNotSetName() {
    const NAME = this.getName();
    return !NAME;
  }

  static onsubmit(event) {
    event.preventDefault();
    const FORM_DATA = new FormData(event.target);
    const DATA = Object.fromEntries(FORM_DATA.entries());

    const NAME = `${DATA.game_name}`.trim();

    GameUsers.addUserByName(NAME);

    App.navigate("/character");
  }
}
