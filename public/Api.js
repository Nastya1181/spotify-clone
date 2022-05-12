class Api {
    static client_id = 'ce637c1d56ff41bda965745758be9101';
    static client_secret = 'b3dd84cfd89f42908b8deb70905a4951';
    static baseUrl = 'https://api.spotify.com/';
    static accountsUrl = 'https://accounts.spotify.com/';

    /**
     * Метод получения от сервера access токена 
     */
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
        }).then((data)=>{return data})
        .catch((err) => {
          this.switchError(err.status);
        });;
    }

    /**
     * Метод получения от сервера результатов поиска 
     * @param {string} searchParam - параметр поиска
     * @param {string} url - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
     */
    static search(searchParam,url=`${this.baseUrl}v1/search?q=${searchParam}&type=track,playlist&include_external=audio`) {
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
        this.switchError(err.status);
      });
    }

/**
 * Метод получения от сервера подборки плейлистов от редактора  
 */
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
          this.switchError(err.status);
        });
        }
         
/**
 * Метод получения  от сервера треков плейлиста
 * @param {string} playlistId - id, полученный от сервера
 * @param {string} url - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
 */
        static  getPlaylistTracks(playlistId,  url=`${this.baseUrl}v1/playlists/${playlistId}/tracks`) {
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
          }).then((data) => {
            let items = [];
            let dataItems = data['items'];
            for (let item in dataItems)
            {
              items.push(dataItems[item]['track']);
            }
            return {'tracks': {
              'next': data['next'],
              'items': items
            }}
          }) 
          .catch((err) => {
            this.switchError(err.status);
          });
          }

          /**
           * Обработка ошибок
           * @param {number} errStatus - статус ошибки
           */
          static switchError(errStatus) {
            switch(errStatus) {
              case 401:
                {
                  if  (localStorage['access_token'] == null)
                  {
                    alert('Прежде чем начать использование сервиса, залогиньтесь');
                  }
                  else {
                    alert('Перелогинитьтесь, срок действия токена истек');
                  }
                  break;
                }
              case 400:
                {
                  alert('нет того, что вы запрашиваете');     
                  break;
                }
              default:
                alert('странно, что-то не то');
                break;
            }
          }
}

export default Api;