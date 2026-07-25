class Header {
  static render() {
    const HASH = window.location.hash;

    const ARRAY = [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Registracion", href: "/registration" },
      { name: "Character", href: "/character" },
      { name: "Settings", href: "/settings" },
      { name: "Battle", href: "/battle" },
      { name: "404", href: "/404" },
    ].map((e) => {
      return { ...e, active: `#${e.href}` === HASH };
    });

    return `
      <header class="header__wrapper">
        <div class="header__container">
          ${NameWidget.render()}
          <ul>
            ${ARRAY.map((e) => {
              const ACTIVE_CLASS = e.active ? "header__element--active" : "";
              return `
                <li>
                  <button class="${ACTIVE_CLASS}" onclick="App.navigate('${e.href}')">
                    ${e.name}
                  </button>
                </li>
              `;
            }).join("")}
          </ul>
        </div>
      </header>
    `;
  }
}
