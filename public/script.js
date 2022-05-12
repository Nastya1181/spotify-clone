import Api from './Api.js';
import Track from './Track.js';
import Card from './Card.js';
import TracksContainer from './TracksContainer.js'; 
import CardsContainer from './CardsContainer.js'; 


const $allItemsLinks= document.querySelectorAll('.all-link');
const $searchInput =  document.querySelector('.header__search-input');
const $login = document.getElementById('logButton');
const $footerTrack = document.querySelector('.footer__track');
const $mainWrapper = document.querySelector('.main__wrapper');
const $footer = document.querySelector('.footer');
const $featuredPlaylists = document.querySelector('.recent-playlists');//остались recent-playlists потому что при flow с авторизацией, были бы недавно прослушанные плейлисты пользователя
const $loginSpan = $login.querySelector('.header__user');// элемент называется user, потому что при flow с авторизацией, отображался бы ник
const $searchPage = document.getElementById('searchPage');

/**
 * Обработчик события загрузки HTML.
 * При загрузке страницы - проверка, авторизован ли пользователь, добавление подборки плейлистов от редактора в aside.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('access_token') == null)
    {
        localStorage.setItem('logButtonState','войти');
    }
    else {
        Api.getFeaturedPlaylists().then((data) => {
            data['playlists']['items'].forEach((item) => {
                let template = `<li class="side-menu__item"><a href="#" class="side-menu__link link recent-playlists__link" id="${item['id']}">${item['name']}</a></li>`;
                $featuredPlaylists.insertAdjacentHTML('beforeend', template);
            })

        });
    }
    $loginSpan.textContent = localStorage['logButtonState'];
    //проверка на пустой

});

/**
 * Обработчик события клика по кнопке "вход" и "выход" 
 * Авторизирует пользователя: запрашивает access токен у сервера.
 * Если пользователь уже авторизирован, то удаляет токен из localStorage
 */
$login.addEventListener('click', async function(e)  {
    if (localStorage.getItem('access_token') == null) {
        await Api.requestAuthorize().then((data)=>{
            localStorage.setItem('access_token', data.access_token);
        });

        localStorage.setItem('logButtonState','выйти');  
    }
    else {
        localStorage.removeItem('access_token');
        localStorage.setItem('logButtonState','войти');  
    }
    location.reload();
});

/**
 * Обработчик события клика по ссылке с id = searchPage
 * Перезагружает страницу
 */
$searchPage.addEventListener('click', () => {location.reload();});


/**
 * Обработчик события клика по плейлистам из подборки редактора 
 * Запрашивает и отображает треки плейлиста. 
 */
$featuredPlaylists.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('recent-playlists__link')){
    $searchInput.style.visibility = 'hidden';
    getPlaylistTracks(event.target.id); 
    }
});

/**
 * Функция, обрабатывающая результат запроса треков плейлиста. 
 * После добавления результата на страницу, 
 * создает Intersection observer для постепенной подгрузки плейлистов при скролле main.
 * @param {string} id - id плейлиста, полученный от сервера
 */
function getPlaylistTracks(id) {
    Api.getPlaylistTracks(id).then((data) => {
        let containerAllEls  = getContainerAllElements('tracks', data['tracks']['next']); 
        addItems('tracks', containerAllEls, data['tracks']);
        TracksContainer.getFirstItem($mainWrapper).scrollIntoView();
        startObserve('tracks',  containerAllEls, Api.getPlaylistTracks)
    });
}

/**
 * Обработчик события ввода в поле поиска.
 * Обрабатывает результат запроса поиска трека и плейлиста.
 */
$searchInput.addEventListener('input', (event) => {
    const input = event.target;
    const searchValue = input.value;

    if (searchValue !== ''){    
        const searchRes = Api.search(searchValue);
        searchRes.then((data) => {
        if (data !== undefined) {
            $allItemsLinks.forEach((link) => link.classList.remove('all-link_hidden')); 
        }    
        for (let type in data) {
            displaySearchResult(type, data, searchValue);
        }
        });
    }
});


/**
 * Добавляет результаты запроса поиска на страницу.
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {object} data - данные, полученные от сервера
 * @param {string} searchValue - строка, введенная пользователем в поле поиска
 */
function displaySearchResult(type, data, searchValue) {
    let container = document.getElementById(`${type}Container`);
    container.innerHTML = '';

    if (data[type]['items'].length === 0)
        {
            container.innerHTML = `<div class="filler">Ничего не найдено по запросу ${searchValue}</div>`;
            let allItemsLink = document.getElementById(`${type}All`);
            allItemsLink.classList.add('all-link_hidden'); 
        }
    else {
            container.dataset.next = data[type]['next'];///
            addItems(type, container, data[type]);
        }
}


/**
 * Обработчик события клика по обложке трека/плейлиста
 */
document.addEventListener('click',(event) => {
    if (event.target && event.target.classList.contains('track-main-attrs__cover')){
        trackClickCallback(event)}

    else if (event.target && event.target.classList.contains('card__img')) {
            if (event.target.parentNode.parentNode.id.includes('playlists')){ //на случай, если на странице будут и другие категории 
                getPlaylistTracks(event.target.parentNode.id); 
        }  
    }
});

/**
 * Обработчик события клика по кнопке 'все'
 */
$allItemsLinks.forEach((link) => link.addEventListener('click', (event) => allItemsLinkCallBack(event)));


/**
 * Callback клика по кнопке 'все',
 * Определяет тип элементов в контейнере, 
 * Переносит элементы в новый контейнер, в котором отображаются все элементы с помощью Intersection observer
 */
function allItemsLinkCallBack(event) {
    $searchInput.style.visibility = 'hidden';
    let type = event.target.id.split('All')[0];
    let container = document.getElementById(`${type}Container`);
    let containerAllEls = getContainerAllElements(type, container.dataset.next, container);

    startObserve(type,  containerAllEls, Api.search);
}


/**
 * Callback клика по обложке трека
 * отображает данные песни в футере
 */
function trackClickCallback(event) {  
    if (!$footer.classList.contains('footer_visible'))
            {
                $footer.classList.add('footer_visible');
            }
            let track = event.target.parentNode;
        
            $footerTrack.querySelector('.track-main-attrs__cover').src = track.querySelector('.track-main-attrs__cover').src;
            $footerTrack.querySelector('.track-main-attrs__name').textContent = track.querySelector('.track-main-attrs__name').textContent;
            $footerTrack.querySelector('.track-main-attrs__artists').textContent = track.querySelector('.track-main-attrs__artists').textContent;
}

/**
 * Добавляет на страницу новый контейнер для отображения всех элементов определенного типа
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {string} next - ссылка для получения следующих 10 элементов от сервера
 * @param {object} prevContainer - предыдущий контейнер, необязательный параметр, нужен в случае переноса полученных ранее элементов
 * @returns {object} контейнер для отображения всех элементов
 */
function getContainerAllElements(type, next, prevContainer) {                  
    let template = getContainerTemplate(type, next);
    

    $mainWrapper.innerHTML = '';  
    $mainWrapper.insertAdjacentHTML('afterbegin', template);
    let containerAllEls = document.getElementById(`${type}ContainerAll`);
    if (prevContainer !== undefined) {
        containerAllEls.insertAdjacentHTML('beforeend', prevContainer.innerHTML);
    }
    return containerAllEls;
}


/**
 * Запускает Intersection observer 
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {object} container - контейнер, последний элемент которого будет отслеживать observer
 * @param {function} apiFunc - функция, которая вызывается всякий раз при пересечении отслеживаемого элемента с областью видимости документа
 */
function startObserve(type, container, apiFunc) {
    if (container.dataset.next != 'null'){
        let getTarget = getObserverTarget(type, $mainWrapper);
        let observer = createIntersectionObserver(type, container, getTarget, apiFunc);   
        observer.observe(getTarget());
    } 
}

/**
 * Создает Intersection observer
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {object} container - контейнер, последний элемент которого будет отслеживать observer
 * @param {function} getObserverTarget - функция для получения отслеживаемого элемента
 * @param {function} apiFunc - функция, которая вызывается всякий раз при пересечении отслеживаемого элемента с областью видимости документа
 * @returns {object} - IntersectionObserver instance
 */
function createIntersectionObserver(type, container, getObserverTarget, apiFunc) {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { 
                observer.unobserve(entry.target);
                var res = apiFunc('', container.dataset.next);
                res.then((data) => {
                    if (data.ok === false) {return Response.reject(data);}
                    container.dataset.next = data[type]['next'];
                    addItems(type, container, data[type]);
                    if (container.dataset.next != 'null'){ 
                        observer.observe(getObserverTarget());
                    } 
                }).catch((err) => {
                    Api.switchError(err.status);
                  });
            }
        })
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 1
    });
}

/**
 * Получает функцию по получению последнего элемента определенного типа 
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {object} wrapper - обертка, в котором нужно искать последний элемент
 * @returns {function} функция по получению последнего элемента определенного типа 
 */
function getObserverTarget(type,wrapper) {
     let getLastItemFunc;
     type === 'tracks'? getLastItemFunc = TracksContainer.getLastItem(wrapper) : getLastItemFunc = CardsContainer.getLastItem(wrapper);
     return getLastItemFunc;
}

/**
 * Получает HTML-код контейнера, отображающего все элементы
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {string} next - ссылка для получения следующих 10 элементов от сервера
 * @returns {string} шаблон контейнера, отображающего все элементы определенного типа
 */
function getContainerTemplate(type,  next) {
    let container;
    type === 'tracks'? container = new TracksContainer(next) : container = new CardsContainer(type, next);
    return container.template();
}

/**
 * Добавляет элементы в контейнер
 * @param {string} type - тип добавляемых элементов (tracks/playlists)
 * @param {object} container - контейнер, в который нужно добавить элементы
 * @param {object} data - данные, полученные от сервера
 */
function addItems(type, container, data) {
    const  template = getItemTemplateFunc(type);
    data['items'].forEach((item) => 
        {
           try {
            container.insertAdjacentHTML('beforeend', template(item));
            }
           catch {
              alert(`Спотифай забыл добавить какое-то из свойств объекту ${item.type} c id=${item.id}, пропустим его`);
           }
        })
}

/**
 * Получает функцию по получению HTML-кода элемента определенного типа
 * @param {string} type - тип элемента ('tracks'/'playlists')
 * @returns {function} функция получения HTML-кода элемента определенного типа
 */
function getItemTemplateFunc(type) {
    switch(type) {
        case 'tracks':
            return (item) => { 
                return new Track(item['name'], item['album']['images'][2]['url'],
                                 item['artists'], item['id'], 
                                 item['duration_ms']).template()}; 
        case 'playlists':
            return (item) => { return new Card(item['name'], item['images'][0]['url'],item['owner']['display_name'], item['id']).template();}
    }
}