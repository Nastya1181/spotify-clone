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
const $logo = document.querySelector('.side-menu__logo');


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('access_token') == null)
    {
        localStorage.setItem('logButtonState','войти');
        alert("Авторизируйтесь");
    }
    else {
        Api.getFeaturedPlaylists().then((data) => {
            data['playlists']['items'].forEach((item) => {
                let template = `<li class="side-menu__item"><a href="#" class="side-menu__link link" id="${item['id']}">${item['name']}</a></li>`;
                $featuredPlaylists.insertAdjacentHTML('beforeend', template);
            });
            
        });
    }
    $loginSpan.textContent = localStorage['logButtonState'];
    //проверка на пустой
   
});

$login.addEventListener('click', async function(e)  {
    if (localStorage.getItem('access_token') == null) {
        await Api.requestAuthorize().then((data)=>{
            localStorage.setItem('access_token', data.access_token);
        })
        .catch((err) => {
          console.log(err);
        });
        localStorage.setItem('logButtonState','выйти');  
    }
    else {
        localStorage.removeItem('access_token');
        localStorage.setItem('logButtonState','войти');  
    }
    location.reload();
});

$logo.addEventListener('click', () => {location.reload();});

$searchInput.addEventListener('input', (event) => {
    const input = event.target;
    const searchValue = input.value;
    const searchRes = Api.search(searchValue, 20);
    

    $allItemsLinks.forEach((link) => link.classList.remove('all-link_hidden'));
    searchRes.then((data) => {
        for (let type in data) {//метод?
            let container = document.getElementById(`${type}Container`);
            container.dataset.next = data[type]['next'];///
            container.innerHTML = '';
            addItems(type, container, data[type]);
        }
    });
});


document.addEventListener('click',(event) => {
    if (event.target && event.target.classList.contains('all-link'))
    {      
       let type = event.target.id.split('All')[0];
       let container = document.getElementById(`${type}Container`);
       let containerAllEls = getContainerAllElements(type, container, container.dataset.next);
      /*  containerAllEls.dataset.next = container.dataset.next; */

       startObserve(type,  containerAllEls, Api.search);
    }
    if (event.target && event.target.classList.contains('track-main-attrs__cover')){
        playlistClickCallback(event)}
});


function playlistClickCallback(event) {  
    if (!$footer.classList.contains('footer_visible'))
            {
                $footer.classList.add('footer_visible');
            }
            let track = event.target.parentNode;
        
            $footerTrack.querySelector('.track-main-attrs__cover').src = track.querySelector('.track-main-attrs__cover').src;
            $footerTrack.querySelector('.track-main-attrs__name').textContent = track.querySelector('.track-main-attrs__name').textContent;
            $footerTrack.querySelector('.track-main-attrs__artists').textContent = track.querySelector('.track-main-attrs__artists').textContent;
}


function getContainerAllElements(type, prevContainer, next=null) {                  
    let template = getContainerTemplate(type, next);
    

    $mainWrapper.innerHTML = '';  
    $mainWrapper.insertAdjacentHTML('afterbegin', template);
    let containerAllEls = document.getElementById(`${type}ContainerAll`);
    if (prevContainer !== undefined) {
        containerAllEls.insertAdjacentHTML('beforeend', prevContainer.innerHTML);
    }

    return containerAllEls;
}

function startObserve(type, container, apiFunc) {
    if (container.dataset.next != 'null'){
        let getTarget = getObserverTarget(type, $mainWrapper);
        let observer = createIntersectionObserver(type, container, getTarget);   
        observer.observe(getTarget());
    } 
}

function createIntersectionObserver(type, container, getObserverTarget) {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) { 
                var searchRes = Api.search('', 20, container.dataset.next);//добавить другие функции
                searchRes.then((data) => {
                    container.dataset.next = data[type]['next'];//вынести в отдельный метод
                    addItems(type, container, data[type]);
                    observer.unobserve(entry.target);
                    if (container.dataset.next != 'null'){
                        observer.observe(getObserverTarget());
                    } 
                });
            }
        })
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });
}

 function getObserverTarget(type,wrapper) {
     let getLastItemFunc;
     type === 'tracks'? getLastItemFunc = TracksContainer.getLastItem(wrapper) : getLastItemFunc = CardsContainer.getLastItem(wrapper);
     return getLastItemFunc;
}

function getContainerTemplate(type,  next) {
    let container;
    type === 'tracks'? container = new TracksContainer(type, next) : container = new CardsContainer(type, next);
    return container.template();
}


function addItems(type, container, data) {
    const  template = getItemTemplateFunc(type);
    data['items'].forEach((item) => 
        {
           container.insertAdjacentHTML('beforeend', template(item));
        })
}

function getItemTemplateFunc(type) {
    let func;
    switch(type) {
        case 'tracks':
            return (item) => { 
                return new Track(item['name'], item['album']['images'][2]['url'],
                                 item['artists'], item['id'], 
                                 item['duration_ms']).template()}; 
       /*  case 'albums':
            return (item) => { return new Card(item['name'], item['images'][0]['url'], item['artists'], item['id']).template();} */
        case 'playlists':
            return (item) => { return new Card(item['name'], item['images'][0]['url'],item['owner']['display_name'], item['id']).template();}
    }
}