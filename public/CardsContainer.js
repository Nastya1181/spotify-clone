class CardsContainer {
  /**
   * @constructor
   * @param {string} type - тип элементов (на данный момент только playlists, возможно добавление albums и тд)
   * @param {string} next - ссылка на следующие 10 элементов типа
   */
  constructor(type, next = null) {
    this.type = type;
    /* this.nameRu = nameRu; */
    this.next = next;
  }

  /**
   * Метод получения функции получения последнего элемента типа
   * @param {object} wrapper - обертка, в которой нужно искать последний элемент типа
   * @returns {function} функция по получению последнего элемента типа
   */
  static getLastItem(wrapper) {
    return function () {
      return wrapper.querySelector(".card:last-child");
    };
  }

  /**
   * Метод получения первого элемента типа
   * @param {object} wrapper - обертка, в которой нужно искать элемент типа
   * @returns {object} первый элемент типа
   */
  static getFirstItem(wrapper) {
    return wrapper.querySelector(".card:first-child");
  }

  /**
   * Метод получения HTML-кода элемента типа
   * @returns {string} - HTML-код элемента типа
   */
  template() {
    return `<div class="cards-box__container">
  <h2 class="cards-box__title title"></h2> 
  <a class="all-link cards-box__all-link all-link_hidden" id="${this.type}All" href="#">все</a> 
  <div class="cards-box__cards-container cards-box__cards-container_all-visible" id="${this.type}ContainerAll" data-next="${this.next}"></div>`;
  }
} /* В title добавить можно по запросу ${$searchInput.value}*/

export default CardsContainer;
