import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import PlaylistTracksPage from './components/PlaylistTracks';
import SearchPage from './components/SearchPage';
import SearchItemsAllPage from './components/SearchItemsAllPage';
import useFetch from './hooks/useFetch';

//Todo: <мне> <Пересмотреть композицию элементов/узнать другой способ избегания антипаттерна Props Spreading>
//Todo: <мне> <Избавиться от отправки лишних запросов при загрузке страницы>
function App() {
    const [searchQ, setSearchQ] = useState('');
    const {data:searchData, loading} = useFetch(`https://api.spotify.com/v1/search?q=${searchQ}&type=track,playlist&include_external=audio`);

    return (
        <Router >
            <Routes>
                <Route path='/' element={<Layout searchQ={searchQ} setSearchQ={setSearchQ} />}>
                    <Route index element={<SearchPage data={searchData} searchQ={searchQ} loading={loading} />} />
                    <Route path='tracksAll' element={<SearchItemsAllPage data={searchData} searchQ={searchQ} title='Треки' itemsType='tracks' containerType='tracks'/>} />
                    <Route path='playlistsAll' element={<SearchItemsAllPage data={searchData} searchQ={searchQ} title='Плейлисты' itemsType='playlists' containerType='cards'/>} /> 
                    <Route  path='playlist/:id' element={<PlaylistTracksPage  title='Плейлист' itemsType='tracks' containerType='tracks' />}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
