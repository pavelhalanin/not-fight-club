class CreateName {
  static nameKey = "not-fight-club__name";

  static render() {
    return `
      <div class="game_name__wrapper">
        <form class="game_name__form" onsubmit="${this.name}.onsubmit(event)">
          <p>Write your name:</p>
          <input type="text" id="game__input_name" name="game_name" value="" placeholder="Name" minlength="3" required>
          <input type="submit" value="Send">
        </form>
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
    console.log(DATA);
  }
}
