import  Card from './card.js';

class Track extends  Card {
  /**
   * @constructor
   * @param {string} name - имя трека
   * @param {string} imgUrl - ссылка на обложку трека
   * @param {object} artists -  исполнители/авторы элемента
   * @param {string} id - id, полученный от сервера
   * @param {number} msDuration - продолжительнось трека в ms
   */
    constructor(name, imgUrl, artists, id, msDuration) {
        super(name, imgUrl, artists, id);
        this.minutesDuration = this.getMinutesDuration(msDuration);
    }

    /**
     * Получение продолжительности трека в минутах
     * @param {number} ms - продолжительнось трека в ms
     * @returns {string} продолжительность трека в минутах
     */
    getMinutesDuration(ms) {
        let seconds = ms *  0.001;
        let minutes = Math.floor(seconds / 60);
        let secondsRemainder = Math.ceil(seconds % 60);
        if (secondsRemainder < 10 && secondsRemainder)
        {
            secondsRemainder = '0' + secondsRemainder;
        }
        return `${minutes}:${secondsRemainder}`;
    }

    /**
     * Получение HTML-кода трека
     * @returns {string} HTML-код трека
     */
    template()  {
        return `<div class="tracks-list__track" id=${this.id}>
        <div class="track-main-attrs">
          <img class="track-main-attrs__cover" src="${this.imgUrl}" alt="song cover">
          <div class="track-main-attrs__labels">
            <a href="#" class="track-main-attrs__name link link_white">${this.name}</a><br>
            <a href="#" class="track-main-attrs__artists link">${this.artists}</a>
          </div>
        </div>
        <div class="tracks-list__track-duration">${this.minutesDuration}</div>
      </div>`
    }
}

export default Track;