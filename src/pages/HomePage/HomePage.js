class HomePage {
  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      return `
        <div class="content">
          <div class="container">
            <div class="home__content">
              <p style="color: red;">You are not create Player. Please registred</p>
              <button class="btn" onclick="App.navigate('/battle')">Start</button>
              <button class="btn" onclick="App.navigate('/registration')">Registred</button>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="content">
        <div class="container">
          <div class="home__content">
            <p style="color: green;">You are registed as &lt;${USER.name}&gt;. You can start battle</p>
            <button class="btn" onclick="App.navigate('/battle')">Start</button>
            <button class="btn" onclick="App.navigate('/registration')">Registred</button>
          </div>
        </div>
      </div>
    `;
  }
}
