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
      },
      {
        id: "4",
        name: "Charmander",
        image: "./assets/pokemon/4/4.webp",
      },
      {
        id: "7",
        name: "Squirtle",
        image: "./assets/pokemon/7/7.webp",
      },
      {
        id: "106",
        name: "Hitmonlee",
        image: "./assets/pokemon/106/106.webp",
      },
      {
        id: "136",
        name: "Flareon",
        image: "./assets/pokemon/136/136.webp",
      },
      {
        id: "186",
        name: "Politoed",
        image: "./assets/pokemon/186/186.webp",
      },
      {
        id: "271",
        name: "Lombre",
        image: "./assets/pokemon/271/271.webp",
      },
      {
        id: "390",
        name: "Chimchar",
        image: "./assets/pokemon/390/390.webp",
      },
    ];
  }
}
