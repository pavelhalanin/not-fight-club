class NameWidget {
  static render() {
    const USER_ID = GameSelectedUser.get();
    const USER = GameUsers.getById(USER_ID);

    if (!USER) {
      return "";
    }

    return `
      <span class="name_widget__content">
        Selected player: &lt;${USER.name}&gt;
      </span>
    `;
  }
}
