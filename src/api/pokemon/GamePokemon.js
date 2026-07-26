class GamePokemon {
  static getById(id) {
    const ARRAY = this.get();
    const POKEMON = ARRAY.find((element) => element.id === id);
    return POKEMON;
  }

  static get() {
    return [
      {
        id: "1",
        name: "Bulbasaur",
        image: "./assets/pokemon/1/1.webp",
        cries: "./assets/pokemon/1/cries_pokemon_latest_1.ogg",
        hp: 100,
        attack: {
          head: 25,
          neek: 28,
          body: 22,
          belly: 26,
          legs: 30,
        },
        defence: {
          head: 20,
          neek: 19,
          body: 17,
          belly: 21,
          legs: 22,
        },
      },
      {
        id: "4",
        name: "Charmander",
        image: "./assets/pokemon/4/4.webp",
        cries: "./assets/pokemon/4/cries_pokemon_latest_4.ogg",
        hp: 100,
        attack: {
          head: 30,
          neek: 24,
          body: 27,
          belly: 22,
          legs: 26,
        },
        defence: {
          head: 22,
          neek: 19,
          body: 18,
          belly: 17,
          legs: 21,
        },
      },
      {
        id: "7",
        name: "Squirtle",
        image: "./assets/pokemon/7/7.webp",
        cries: "./assets/pokemon/7/cries_pokemon_latest_7.ogg",
        hp: 100,
        attack: {
          head: 23,
          neek: 29,
          body: 25,
          belly: 21,
          legs: 27,
        },
        defence: {
          head: 18,
          neek: 20,
          body: 21,
          belly: 16,
          legs: 19,
        },
      },
      {
        id: "106",
        name: "Hitmonlee",
        image: "./assets/pokemon/106/106.webp",
        cries: "./assets/pokemon/106/cries_pokemon_latest_106.ogg",
        hp: 100,
        attack: {
          head: 28,
          neek: 26,
          body: 30,
          belly: 23,
          legs: 29,
        },
        defence: {
          head: 19,
          neek: 21,
          body: 22,
          belly: 18,
          legs: 20,
        },
      },
      {
        id: "136",
        name: "Flareon",
        image: "./assets/pokemon/136/136.webp",
        cries: "./assets/pokemon/136/cries_pokemon_latest_136.ogg",
        hp: 100,
        attack: {
          head: 27,
          neek: 30,
          body: 24,
          belly: 28,
          legs: 22,
        },
        defence: {
          head: 18,
          neek: 21,
          body: 19,
          belly: 23,
          legs: 17,
        },
      },
      {
        id: "186",
        name: "Politoed",
        image: "./assets/pokemon/186/186.webp",
        cries: "./assets/pokemon/186/cries_pokemon_latest_186.ogg",
        hp: 100,
        attack: {
          head: 26,
          neek: 22,
          body: 29,
          belly: 27,
          legs: 24,
        },
        defence: {
          head: 21,
          neek: 17,
          body: 20,
          belly: 18,
          legs: 19,
        },
      },
      {
        id: "271",
        name: "Lombre",
        image: "./assets/pokemon/271/271.webp",
        cries: "./assets/pokemon/271/cries_pokemon_latest_271.ogg",
        hp: 100,
        attack: {
          head: 24,
          neek: 27,
          body: 26,
          belly: 30,
          legs: 23,
        },
        defence: {
          head: 19,
          neek: 22,
          body: 17,
          belly: 21,
          legs: 18,
        },
      },
      {
        id: "390",
        name: "Chimchar",
        image: "./assets/pokemon/390/390.webp",
        cries: "./assets/pokemon/390/cries_pokemon_latest_390.ogg",
        hp: 100,
        attack: {
          head: 29,
          neek: 23,
          body: 28,
          belly: 25,
          legs: 27,
        },
        defence: {
          head: 20,
          neek: 18,
          body: 23,
          belly: 19,
          legs: 21,
        },
      },
    ];
  }
}
