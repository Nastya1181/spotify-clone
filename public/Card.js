class Card {
    constructor(name, imgUrl, artists, id) {
      this.name = name;
      this.id = id;
      this.imgUrl= imgUrl;
      typeof artists === 'string'? this.artists = artists : this.artists = this.getArtists(artists);//interface isearchitem
    }
  
    getArtists(artistsArr) {
      let artistsStr = '';
      artistsArr.forEach((artist) => artistsStr.length === 0? artistsStr += artist['name'] : artistsStr += ', ' + artist['name']);
      return artistsStr;
    };
  
    template()  {
          return `<div class="card" id="${this.id}">
          <img  class="card__img" src="${this.imgUrl}" alt="card img">
          <div class="card__title">${this.name}</div>
          <div class="card__artists">${this.artists}</div>
        </div>`;
      }
        
  }
  
  export default Card;