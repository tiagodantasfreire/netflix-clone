const API_KEY = '0424781ff8e683a7bc83a0925d402e0b'; // Chave da API
const API_BASE = 'https://api.themoviedb.org/3'; // Endereço para as requisições

// Função que busca os dados
const basicFetch = async (endpoint) => {
    
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json(); // pega o json da requisição
    return json; // retorna o resultado

    // async e await retornam uma promise
    // await espera o resultado da promise para executar a próxima linha
}

export default {
    // função que retorna os dados da Home
    getHomeList: async () => {
        return [
            {   
                // retorna series e filmes originais da netlfix
                slug: 'originais',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-br&api_key=${API_KEY}`) 
            },
            {   
                // retorna as séries e filmes em alta da semana 
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=pt-br&api_key=${API_KEY}`) 
            },
            {   
                // retorna os filmes em alta
                slug: 'top rated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-br&api_key=${API_KEY}`) 
            },
            {
                // retorna filmes de ação
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-br&api_key=${API_KEY}`) 
            },
            {   
                // retorna filmes de comédia
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-br&api_key=${API_KEY}`) 
            },
            {
                // retorna filmes de terror
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-br&api_key=${API_KEY}`) 
            },
            {
                // retorna filmes de romance
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-br&api_key=${API_KEY}`) 
            },
            {
                // retorna documentários
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-br&api_key=${API_KEY}`) 
            }
        ]
    }
}
