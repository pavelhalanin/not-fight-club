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
        hp: 100,
        attack: {
          head: 25,
          neek: 28,
          body: 22,
          belly: 26,
          legs: 30,
        },
        defence: {
          head: 27,
          neek: 26,
          body: 24,
          belly: 28,
          legs: 29,
        },
      },
      {
        id: "4",
        name: "Charmander",
        image: "./assets/pokemon/4/4.webp",
        hp: 100,
        attack: {
          head: 30,
          neek: 24,
          body: 27,
          belly: 22,
          legs: 26,
        },
        defence: {
          head: 29,
          neek: 26,
          body: 25,
          belly: 24,
          legs: 28,
        },
      },
      {
        id: "7",
        name: "Squirtle",
        image: "./assets/pokemon/7/7.webp",
        hp: 100,
        attack: {
          head: 23,
          neek: 29,
          body: 25,
          belly: 21,
          legs: 27,
        },
        defence: {
          head: 25,
          neek: 27,
          body: 28,
          belly: 23,
          legs: 26,
        },
      },
      {
        id: "106",
        name: "Hitmonlee",
        image: "./assets/pokemon/106/106.webp",
        hp: 100,
        attack: {
          head: 28,
          neek: 26,
          body: 30,
          belly: 23,
          legs: 29,
        },
        defence: {
          head: 26,
          neek: 28,
          body: 29,
          belly: 25,
          legs: 27,
        },
      },
      {
        id: "136",
        name: "Flareon",
        image: "./assets/pokemon/136/136.webp",
        hp: 100,
        attack: {
          head: 27,
          neek: 30,
          body: 24,
          belly: 28,
          legs: 22,
        },
        defence: {
          head: 25,
          neek: 28,
          body: 26,
          belly: 30,
          legs: 24,
        },
      },
      {
        id: "186",
        name: "Politoed",
        image: "./assets/pokemon/186/186.webp",
        hp: 100,
        attack: {
          head: 26,
          neek: 22,
          body: 29,
          belly: 27,
          legs: 24,
        },
        defence: {
          head: 28,
          neek: 24,
          body: 27,
          belly: 25,
          legs: 26,
        },
      },
      {
        id: "271",
        name: "Lombre",
        image: "./assets/pokemon/271/271.webp",
        hp: 100,
        attack: {
          head: 24,
          neek: 27,
          body: 26,
          belly: 30,
          legs: 23,
        },
        defence: {
          head: 26,
          neek: 29,
          body: 24,
          belly: 28,
          legs: 25,
        },
      },
      {
        id: "390",
        name: "Chimchar",
        image: "./assets/pokemon/390/390.webp",
        hp: 100,
        attack: {
          head: 29,
          neek: 23,
          body: 28,
          belly: 25,
          legs: 27,
        },
        defence: {
          head: 27,
          neek: 25,
          body: 30,
          belly: 26,
          legs: 28,
        },
      },
    ];
  }
}
