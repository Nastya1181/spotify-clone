class TracksContainer {  /* В TS можно было создать интерфейс IContainer */

  constructor(type, next=null) {
      this.type = type;
     /*  this.nameRu = nameRu; */
      this.next = next;
    } 


  static getLastItem(wrapper) {
    return function() {
      return wrapper.querySelector('.tracks-list__track:last-child');
    }
  }


  template() { 
    return `<section class="tracks-list main__tracks-list tracks-list_all">
    <h2 class="title"></h2>
    <a class="all-link tracks-list__all-link all-link_hidden" id="${this.type}All" href="#">все</a> 
    <div class="tracks-list__tracks-container" id="${this.type}ContainerAll" data-next="${this.next}"></div>
    </section>`;}
}/* В title добавить можно по запросу ${$searchInput.value} */

export default TracksContainer;