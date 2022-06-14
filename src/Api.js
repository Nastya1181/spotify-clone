const clientId = "ce637c1d56ff41bda965745758be9101";
const clientSecret = "b3dd84cfd89f42908b8deb70905a4951";
const baseUrl = "https://api.spotify.com/";
const accountsUrl = "https://accounts.spotify.com/";

/** Ошибка 401. Для получения запрашиваемого ответа нужна аутентификация. */
const unauthorized = 401;

/** Ошибка 400. Cервер не понимает запрос из-за неверного синтаксиса. */
const badRequest = 400;

/**
 * Метод получения init параметра fetch для GET запросов
 */
const getGETRequestOptions = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    method: "GET",
  };
};

/**
 * Метод получения от сервера access токена
 */
export function requestAuthorize() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  };
  const dataCallback = (data) => {
    localStorage.setItem("access_token", data.access_token);
  };
  return handleFetch(`${accountsUrl}api/token`, requestOptions, dataCallback);
}

/**
 * Метод получения от сервера результатов поиска
 * @param {string} searchParam - параметр поиска
 * @param {string} [url] - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
 */
export function search(
  searchParam,
  url = `${baseUrl}v1/search?q=${searchParam}&type=track,playlist&include_external=audio`
) {
  return handleFetch(url, getGETRequestOptions(), (data) => {
    return data;
  });
}

/**
 * Метод получения от сервера подборки плейлистов от редактора
 */
export function getFeaturedPlaylists() {
  return handleFetch(
    `${baseUrl}v1/browse/featured-playlists`,
    getGETRequestOptions(),
    (data) => {
      return data;
    }
  );
}

/**
 * Метод получения от сервера треков плейлиста
 * @param {string} playlistId - id, полученный от сервера
 * @param {string} [url] - ссылка для получения ответа от сервера, может быть получена от сервера для получения следующих 10 элементов
 */
export async function getPlaylistTracks(
  playlistId,
  url = `${baseUrl}v1/playlists/${playlistId}/tracks`
) {
  const dataCallback = async (data) => {
    let items = Object.entries(data.items).map(
      ([item, data]) => data.track
    );
    return {
      tracks: {
        next: data.next,
        items: items,
      },
    };
  };

  return handleFetch(url, getGETRequestOptions(), dataCallback);
}
/**
 * Метод обработки fetch
 * @param {string} url - resource параметр fetch
 * @param {object} fetchOptions - init параметр fetch
 * @param {function} dataCallback - функция, выполняющая основную логику работы с извлеченными данными
 */
async function handleFetch(url, fetchOptions, dataCallback) {
  let result;
  try {
    let response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(response.status);
    }
    let dataJson = await response.json();
    result = dataCallback(dataJson);
  } catch (err) {
    switchError(err.message);
  }
  return result;
}

/**
 * Обработка ошибок
 * @param {number} errName - название ошибки
 */
export function switchError(errName) {
  switch (errName) {
    case unauthorized: {
      if (localStorage["access_token"] === null) {
        alert("Прежде чем начать использование сервиса, залогиньтесь");
      } else {
        requestAuthorize();
      }
      break;
    }
    case badRequest: {
      console.log("нет того, что вы запрашиваете");
      break;
    }
    default:
      console.log("странно, что-то не то");
      break;
  }
}