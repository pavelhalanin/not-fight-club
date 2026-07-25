class MenuDialog {
  static id_button = "app__dialog_menu";

  static navigate(hash) {
    this.close();
    window.location.hash = `#${hash}`;
  }

  static open() {
    const BUTTON = document.querySelector(".app__dialog_burger_button");

    if (!BUTTON) {
      return;
    }

    BUTTON.click();
  }

  static close() {
    const BUTTON = document.createElement("button");
    BUTTON.setAttribute("commandfor", "app__dialog_menu");
    BUTTON.setAttribute("command", "close");
    BUTTON.style.display = "none";

    document.body.appendChild(BUTTON);

    BUTTON.click();
    BUTTON.remove();
  }

  static render() {
    return `
      <dialog id="app__dialog_menu" class="app__dialog_menu">
        <button class="menu_dialog__overlay" commandfor="app__dialog_menu" command="close"></button>
        <div class="menu_dialog__content">
          <ul>
            <li>
              <button onclick="${this.name}.navigate('/')">
                Home
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/about')">
                About
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/registration')">
                Registration
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/character')">
                Character
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/settings')">
                Settings
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/battle')">
                Battle
              </button>
            </li>
            <li>
              <button onclick="${this.name}.navigate('/404')">
                404
              </button>
            </li>
          </ul>
        </div>
      </dialog>
    `;
  }
}
