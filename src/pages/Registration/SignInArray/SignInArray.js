class SignInArray {
  static render() {
    const USERS = GameUsers.get();

    if (USERS.length == 0) {
      return "";
    }

    return `
      <div class="sign_in_array__container">
        <p>You have already created characters. Do you want to continue?</p>
        <ul>
          ${USERS.map((e) => {
            const ID = e.id;
            const AVATAR_ID = e?.id_avatar || "";

            const POKEMON = GamePokemon.getById(AVATAR_ID);
            const IMAGE = POKEMON?.image || "";

            const CREATED_AT = e?.created_at || "";
            const CREATED_AT_FORMATED =
              DateHelper.getFormatDateTime(CREATED_AT);

            return `
              <li>
                <button onclick="
                  GameSelectedUser.set('${ID}');
                  App.navigate('/character');
                ">
                  <div class="sign_in_array__image_block">
                    <img src="${IMAGE}" alt="">
                  </div>
                  <div>${e.name}</div>
                  <div class="sign_in_array__time">${CREATED_AT_FORMATED}</div>
                </button>
              </li>
            `;
          }).join("")}
        </ul>
      </div>
    `;
  }
}
