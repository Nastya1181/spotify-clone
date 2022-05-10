class CardsContainer {
    constructor(type, next=null) {
        this.type = type;
        /* this.nameRu = nameRu; */
        this.next = next;
      }


    static getLastItem(wrapper) {
        return function() {
          return wrapper.querySelector('.card:last-child');
        }
      }


    template() {
        return `<div class="cards-box__container">
    <h2 class="cards-box__title title"></h2> 
    <a class="all-link cards-box__all-link all-link_hidden" id="${this.type}All" href="#">все</a> 
    <div class="cards-box__cards-container cards-box__cards-container_all-visible" id="${this.type}ContainerAll" data-next="${this.next}"></div>`;}
}/* В title добавить можно по запросу ${$searchInput.value}*/

export default CardsContainer;