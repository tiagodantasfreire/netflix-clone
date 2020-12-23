import React, { useEffect, useState } from 'react'; // useState salva a lista de filmes
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import './App.css'

export default () => {

    const [movieList, setMovieList] = useState([]); // 

    useEffect(() => {

        //Quando a tela for carregada será executada essa função
        const loadAll = async () => {
            // Pega a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);
        }

        loadAll();
    }, []);

    // - Header
    // - Destaque
    // - Listas
    // - Rodapé 

    return(
        <div className="page">
            <section className="lists">
                {/* Função que retorna as listas */}
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/> // componente que retorna as listas
                ))}
            </section>
        </div>
    )
}
