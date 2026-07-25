class Home {
  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    return `
      <div class="container">
        Hello, ${USER.name}!
      </div>
    `;
  }
}
