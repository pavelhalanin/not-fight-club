class BattlePage {
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
        battle
      </div>
    `;
  }
}
