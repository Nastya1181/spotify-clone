class Api {
    static client_id = 'ce637c1d56ff41bda965745758be9101';
    static client_secret = 'b3dd84cfd89f42908b8deb70905a4951';
    static baseUrl = 'https://api.spotify.com/';
    static accountsUrl = 'https://accounts.spotify.com/';

    static requestAuthorize()
    {
      return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded', 
          'Authorization': 'Basic '+ btoa(this.client_id + ':' + this.client_secret)
        },
        body: 'grant_type=client_credentials'
      }).then((res) => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(res);
        })
    }

    static search(searchParam,limit,url=`${this.baseUrl}v1/search?q=${searchParam}&type=track,playlist&include_external=audio&limit=${limit}`) {
      return fetch(url, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      method: 'GET'
      }).then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(res);
      }).then((data)=>{return data})
      .catch((err) => {
        console.log(err);
        if (err.status === 401){
          alert('Вы не авторизованы, нажмите "Войти" в правом верхнем углу');
          localStorage.setItem('logButtonState','войти');  
          }
        /*  } */
      });
      }

      static  getFeaturedPlaylists() {
        return fetch(`${this.baseUrl}v1/browse/featured-playlists`, {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        method: 'GET'
        }).then((res) => {
        if (res.ok) {
        return res.json();
        }
        return Promise.reject(res);
        }).then((data)=>{return data})
        .catch((err) => {
          console.log(err);
        });
        }
         


       /*  static  getAlbumTracks(albumId,limit) {
          return fetch(`${this.baseUrl}v1/albums/${albumId}/tracks?limit=${limit}`, {
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          method: 'GET'
          }).then((res) => {
          if (res.ok) {
          return res.json();
          }
          return Promise.reject(res);
          }).then((data)=>{return data})
          .catch((err) => {
            console.log(err);
            if (err.status === 401){
              alert('Вы не авторизованы, нажмите "Войти" в правом верхнем углу');}

          });
          } */

}

export default Api;