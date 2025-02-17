// import React from "react";
import React,{useContext ,useState} from "react";
import { Link } from "react-router-dom";
import BookmarksContext from "../BookmarksContext";



const Home = () => {
    const [searchText , setSearchText] = useState('');

    const { bookmarks, toggleBookmarks} = useContext(BookmarksContext);
    

    //On utilise un state pour garder nos données

    const [games, setGames] = useState([
        {id: 1, name: "Jeux 1", rating: 4.6},
        {id: 2, name: "Jeux 2", rating: 3.5},
        {id: 3, name: "Jeux 3", rating: 4.2},
        {id: 4, name: "Jeux 4", rating: 1.5},
        {id: 5, name: "Jeux 5", rating: 3.7},
        {id: 6, name: "Jeux 6", rating: 5}
    ])
    const handleSearch = (e) => {
        e.preventDefault();
        const apikey = '126c9de760a64ac89c97a2cb39d88a08';
        const  url = `https://api.rawg.io/api/games?key=${apikey}&search=${encodeURI(searchText)}`;
        fetch(url)
        .then( response => response.json() )
        .then (data => { setGames(data.results) } )
        .catch( () => {alert ('Une erreur est survenue ') } )
        ;
    }
    
    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     const  url = 'https://www.formacitron.com/games-api-fallback/games/';
    //     fetch(url)
    //     .then( response => response.json() )
    //     .then (data => { setGames(data.results) } )
    //     .catch( () => {alert ('Une erreur est survenue ') } )
    //     alert ("La recherche est lancée !");
    // }
   
    return(
        <> {/* Un fragment doit être ajouté pour ne retourner qu'un seul composant*/}
        <form className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl" onSubmit={handleSearch}>
            <input type="text" className="form-control" autoFocus={true} onInput={e => {setSearchText(e.target.value)}} value={searchText} placeholder="Rechercher" />
            <button type="submit" className="bg-blue-700 rounded-r text-white px-4 py-2" >Rechercher</button>
        </form>
        
        <Link to={'/Bookmarks'}>Favoris</Link>
        <br></br>
        <Link to={'/MyShop'}>Les Magasins</Link>
        {/* Ajoutons notre liste*/}
        <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
        {games.map(game => (
            <li className="py-2  px-4 border-b border-gray-500 flex" key={game.id}>
                <Link to={`/Details/${game.slug}`} className="flex">
                <img src={game.background_image} alt="" className="w-50 pr-2" />
                <div className="text-2xl font-bold flex-grow">{game.name}</div>
                <div>{game.rating}</div>
                </Link>
                <button onClick={() => {toggleBookmarks(game)}}>{bookmarks.some(bookmarks => bookmarks.name === game.name ) ? '★'  : '☆'} </button>
            </li>
        ))}
        </ul>
        </>
    );
}
export default Home;