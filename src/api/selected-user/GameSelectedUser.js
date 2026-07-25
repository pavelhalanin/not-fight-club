class GameSelectedUser {
  static key = "notFightClub_var__selected_user_id";

  static get() {
    const SELECTED_USER_ID = localStorage.getItem(this.key);

    if (!SELECTED_USER_ID) {
      localStorage.setItem(this.key, "");
      return "";
    }

    const USERS = GameUsers.get();

    const USER = USERS.find((element) => element.id === SELECTED_USER_ID);

    return USER.id ? USER.id : "";
  }

  static set(userId) {
    const USERS = GameUsers.get();

    const USER = USERS.find((element) => element.id === userId);

    if (!USER) {
      return;
    }

    localStorage.setItem(this.key, USER.id);
  }
}
