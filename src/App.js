import React, { useEffect, useState } from 'react'; // useState salva a lista de filmes
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow'
import './App.css'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null)
    const [blackHeader, setBlackHeader] = useState(false)

    useEffect(() => {

        //Quando a tela for carregada será executada essa função
        const loadAll = async () => {
            // Pega a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //Pega o filme em destaque (fetured)
            let originals = list.filter(i=>i.slug === 'originais');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')

            setFeaturedData(chosenInfo)
        }

        loadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true)
            }else{
                setBlackHeader(false)
            }
        }

        window.addEventListener('scroll', scrollListener)
        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    }, []);


    // Aqui é onde a página é gerada
    return(
        <div className="page">

            <Header black={blackHeader} />
            
            {featuredData &&
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">
                {/* Função que retorna as listas */}
                {movieList.map((item, key) => ( // só utiliza o key quando é um loop
                    <MovieRow key={key} title={item.title} items={item.items}/> // componente que retorna as listas
                ))}
            </section>

            <footer>
                Feito por Tiago Dantas <br/>
                Direitos de imagem à Netflix <br/>
                Dados fornecidos pelo site themoviedb.org
            </footer>
                    
            {movieList.length <= 0 && 
            <div className="loading">
                <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando"/>
            </div>
            }
        </div>
    )
}
