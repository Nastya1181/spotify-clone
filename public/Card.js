class Card {
  /**
   * @constructor
   * @param {string} name - имя элемента (плейлиста и тд)
   * @param {string} imgUrl - ссылка на обложку элемента
   * @param {object} artists - исполнители/авторы элемента
   * @param {string} id - id элемента, полученный от сервера
   */
  constructor(name, imgUrl, artists, id) {
    this.name = name;
    this.id = id;
    this.imgUrl = imgUrl;
    typeof artists === "string"
      ? (this.artists = artists)
      : (this.artists = this.getArtists(artists)); //interface isearchitem
  }

  /**
   * Получение строки автора из массива
   * @param {object} artistsArr - массив авторов
   * @returns {string} строка из всех авторов
   */
  getArtists(artistsArr) {
    let artistsStr = "";
    artistsArr.forEach((artist) =>
      artistsStr.length === 0
        ? (artistsStr += artist["name"])
        : (artistsStr += ", " + artist["name"])
    );
    return artistsStr;
  }

  /**
   * Получение HTML-кода элемента
   * @returns {string} HTML-код элемента
   */
  template() {
    return `<div class="card" id="${this.id}">
          <img  class="card__img" src="${this.imgUrl}" alt="card img">
          <div class="card__title">${this.name}</div>
          <div class="card__artists">${this.artists}</div>
        </div>`;
  }
}

export default Card;
