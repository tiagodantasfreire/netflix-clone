import React, { useState } from 'react';
import './MovieRow.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0)

    // Rolagem das listas
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2); // Rola a lista de acordo com a metade da tela do usuario
        if(x > 0){
            x = 0
        }
        setScrollX(x);
    }

    const handleRigthArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2); // Rola a lista de acordo com a metade da tela do usuario
        let listW = items.results.length * 150
        if((window.innerWidth - listW) > x){ // Tamanho da Tela - Tamanho da lista
            x = (window.innerWidth - listW) - 60 // X = Tamanho da Tela - Tamanho da lista - Padding 
        }
        setScrollX(x)
    }

    return (
        <div className="movierow">
            <h2>{title}</h2>
            <div className="movierow--left">
                <NavigateBeforeIcon style={{fontSize: 50}} onClick={handleLeftArrow}/>
            </div>
            <div className="movierow--right">
                <NavigateNextIcon style={{fontSize: 50}} onClick={handleRigthArrow}/>
            </div>

            <div className="movierow--listarea">
                <div className="movierow--list" style={{
                marginLeft: scrollX,
                width: items.results.length * 150
                }
                }>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movierow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
            
            </div>
        </div>
    );
}