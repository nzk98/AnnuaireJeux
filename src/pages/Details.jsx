// import { useEffect } from "react";
// import { data, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";


const Details  = () => {
    const {slug} = useParams();
    // const [description , setDescriptions] = useParams();
    const [game , setGame ] = useState();
    // const [detail , setDetail] = useState('', [])
    useEffect((e) => {
        // e.preventDefault();
        const apikey = '126c9de760a64ac89c97a2cb39d88a08';
        const  url = `https://api.rawg.io/api/games/${slug}?key=${apikey}`;

        fetch(url)
        .then( response => response.json() )
        .then (data => { console.log(data) , setGame(data) } )
        .catch( () => {alert ('Une erreur est survenue ') } )
        alert ("La recherche est lancée !");
    }, []);

    
    return (
        <div>
        {game ? (
            <div>
                <h1 className="text-4xl text-green-500">{game.name}</h1>
                <br></br>
                <img src={game.background_image} alt="centered Image" className=""/>
                <p className="text-xl">{game.description_raw}</p>
                {/* {game.developers.map(developer => (
                <li>{developer.name}</li>    
                ))} */}
            </div>
        ) : (
            <p>Chargement...</p>  // Message de chargement si le jeu n'est pas encore chargé
        )}
    </div>

    )
}
// console.log(data);
export default Details;