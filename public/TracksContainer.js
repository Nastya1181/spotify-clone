class TracksContainer {
  /* В TS можно было создать интерфейс IContainer */

  /**
   * @constructor
   * @param {*} next - ссылка на следующие 10 треков
   */
  constructor(next = null) {
    this.next = next;
  }

  /**
   * Метод получения функции получения последнего трека
   * @param {object} wrapper - обертка, в которой нужно искать последний трек
   * @returns {function} функция по получению последнего трека
   */
  static getLastItem(wrapper) {
    return function () {
      return wrapper.querySelector(".tracks-list__track:last-child");
    };
  }

  /**
   * Метод получения первого трека
   * @param {object} wrapper - обертка, в которой нужно искать первый трек
   * @returns {object} первый трек
   */
  static getFirstItem(wrapper) {
    return wrapper.querySelector(".tracks-list__track:first-child");
  }

  /**
   * Метод получения HTML-кода трека
   * @returns {string} - HTML-код трека
   */
  template() {
    return `<section class="tracks-list main__tracks-list tracks-list_all">
    <h2 class="title"></h2>
    <a class="all-link tracks-list__all-link all-link_hidden" id="tracksAll" href="#">все</a> 
    <div class="tracks-list__tracks-container" id="tracksContainerAll" data-next="${this.next}"></div>
    </section>`;
  }
} /* В title добавить можно по запросу ${$searchInput.value} */

export default TracksContainer;
