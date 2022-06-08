import { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import { search } from './Api';
import TracksSection from './components/TracksSection';
import useSearchQuery from './hooks/useSearchQuery';
import CardsSection from './components/CardsSection';
import PlaylistTracks from './components/PlaylistTracks';


function App() {
    const [searchQ, setSearchQ] = useState('');
    const [tracksData, cardsData] = useSearchQuery(searchQ);


    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout searchQ={searchQ} setSearchQ={setSearchQ} />}> {/* tracksData={tracksData} setTracksData={setTracksData} */}
                    <Route index element={<><TracksSection
                        data={tracksData}
                        mode='clear'
                        title='Треки'
                        itemsType="tracks"
                        updateFunc={search}
                        isObserved={false} />
                        <CardsSection
                            data={cardsData}
                            mode='clear'
                            title='Плейлисты'
                            itemsType="playlists"
                            updateFunc={search}
                            isObserved={false} /></>} />
                    <Route path='tracksAll' element={
                        (<TracksSection
                            data={tracksData}
                            mode='update'
                            itemsType="tracks"
                            title='Треки'
                            updateFunc={search}
                            isObserved={true} />)
                    } />
                    <Route path='playlistsAll' element={<CardsSection
                        data={cardsData}
                        mode='update'
                        title='Плейлисты'
                        itemsType="playlists"
                        updateFunc={search}
                        isObserved={true} />} />
                    <Route path='playlist/:id' element={<PlaylistTracks />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
