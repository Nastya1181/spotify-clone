const clientId = "ce637c1d56ff41bda965745758be9101";
const clientSecret = "b3dd84cfd89f42908b8deb70905a4951";
const baseUrl = "https://api.spotify.com/";
const accountsUrl = "https://accounts.spotify.com/";

/** Ошибка 401. Для получения запрашиваемого ответа нужна аутентификация. */
const unauthorized = 401;

/** Ошибка 400. Cервер не понимает запрос из-за неверного синтаксиса. */
const badRequest = 400;

/**
 * Метод получения от сервера access токена
 */
export function requestAuthorize() {
  return fetch(`${accountsUrl}api/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      this.switchError(err.status);
    });
}

/**
 * Метод получения от сервера результатов поиска
 * @param {string} searchParam - параметр поиска
 * @param {string} url - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
 */
export function search(
  searchParam,
  url = `${baseUrl}v1/search?q=${searchParam}&type=track,playlist&include_external=audio`
) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      this.switchError(err.status);
    });
}

/**
 * Метод получения от сервера подборки плейлистов от редактора
 */
export function getFeaturedPlaylists() {
  return fetch(`${baseUrl}v1/browse/featured-playlists`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      this.switchError(err.status);
    });
}

/**
 * Метод получения  от сервера треков плейлиста
 * @param {string} playlistId - id, полученный от сервера
 * @param {string} url - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
 */
export function getPlaylistTracks(
  playlistId,
  url = `${baseUrl}v1/playlists/${playlistId}/tracks`
) {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((data) => {
      let items = [];
      let dataItems = data["items"];
      for (let item in dataItems) {
        items.push(dataItems[item]["track"]);
      }
      return {
        tracks: {
          next: data["next"],
          items: items,
        },
      };
    })
    .catch((err) => {
      this.switchError(err.status);
    });
}

/**
 * Обработка ошибок
 * @param {number} errName - название ошибки
 */
export function switchError(errName) {
  switch (errName) {
    case unauthorized: {
      if (localStorage["access_token"] == null) {
        alert("Прежде чем начать использование сервиса, залогиньтесь");
      } else {
        alert("Перелогинитьтесь, срок действия токена истек");
      }
      break;
    }
    case badRequest: {
      alert("нет того, что вы запрашиваете");
      break;
    }
    default:
      alert("странно, что-то не то");
      break;
  }
}
