import './App.css'
import Home from './pages/Home';
import React, { useEffect, useState, useRef } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorMessage from './pages/ErrorMessage';
import Details from './pages/Details';
import BookmarksContext from './BookmarksContext'
import Bookmarks from './pages/Bookmarks';
import MyShop from './pages/MyShop';

function App() {
  //création du routeur

  const [bookmarks, setBookmarks] = useState([
    {
      slug: "super-mario-bros-3",
      name: "Super Mario Bros. 3",
      background_image: "https://media.rawg.io/media/screenshots/092/092fc1910f067a95a07c0fbfdbe25f03.jpg"
    },
    {
      slug: "the-legend-of-zelda-the-wind-waker",
      name: "The Legend of Zelda: The Wind Waker",
      background_image: "https://media.rawg.io/media/games/45f/45f6d31b0fcefe029e33d258a7beb6a2.jpg"
    }
  ]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorMessage />,
    },
    {
      path: "/Details/:slug",
      element: <Details />,
    },
    {
      path: "/MyShop",
      element: <MyShop/>
    }
  ], {basename: "/AnnuaireJeux"});
//function  pour ajouter un element dans les favoris
const addBookmark = (game)=> {
  const tmpBookmarks = [...bookmarks];//je fait une copie de bookmark
  tmpBookmarks.push(game);//je push l'élément souhaiter dans le tableau
  setBookmarks(tmpBookmarks);
} 
const toggleBookmarks = (game) => {
  if( bookmarks.some(bookmarks => bookmarks.name === game.name)){
    deleteBookmarks(game);
  }
  else {
    addBookmark(game);
  }
}
  // création d'une fonction pour supprimer un favoris
  const deleteBookmarks  = (index) => {
    const tmpBookmarks = [...bookmarks];//on crée une copie de bookmarks
    tmpBookmarks.splice(index,1);//On supprimer 1 entrée à partir de l'index
    setBookmarks(tmpBookmarks);//On met à jours le state avec le nouveau tableau
}
const [dataLoaded, setDataLoaded] =  useState(false);
useEffect(() => {
  if(dataLoaded) {
    console.log("Sauvegarde:", bookmarks)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
},[bookmarks])

useEffect( ()=>{
  const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  setBookmarks(savedBookmarks);
  console.log("chargement:", savedBookmarks);
  setDataLoaded(true);
},[])
// useEffect( () => {
//   localStorage.setItem("bookmorks", JSON.stringify(bookmarks));
// },[bookmarks]);
// useEffect( ()=>{
//   const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
//   setBookmarks(savedBookmarks);
// },[])

//État pourgérer l'affichage du bouton d'installation
const [canInstall, setInstall] = useState(false);
//Ref pour stocker l'événement d'installation
const deferredPrompt = useRef(null);

useEffect(() => {
  //Fonction appelée quand l'application peut être installée
  const handleBeforeInstallPrompt = (e) => {
    //Empeche l'affichage automatique du prompt
    e.preventDefault();
    //Stocke l'événement pour une utilisation ultérieur
    deferredPrompt.current = e ;
    //affiche notre bouton d'installation
    setCanInstall(true);
    };
    //Écoute l'événement d'installation
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    //Nettoyage à la destruction du composant
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };

}, [] );

//fonction appelée quand l'utilisateur clique sur le bouton d'installation
const handleInstallClick = async () => {
  if(!deferredPrompt.current){
    return ;
  }
  //affiche le prompt d'installation natif
  const result = await deferredPrompt.current.prompt();
  console.log(`Installation ${result.outcome}`);
  //Réinitialise l'état
  deferredPrompt.current = null;
  setCanInstall(false);
};

  return (
    <BookmarksContext.Provider value={{bookmarks, setBookmarks, addBookmark, deleteBookmarks, toggleBookmarks}}>
      {/* Affiche le bouton d'installation si disponible */}
      {canInstall && (
        <div className='bg-gray-300 shadow-gray-700 p-4 flex items-center'>
          <div className='flex-grow text-center'>
            <p>Voulez-vous installer l'application sur votre appareil ? </p>
          </div>
          <button className='px-4 py-2 rounded text-white bg-teal-600' onClick={handleInstallClick}>Installer</button>
        </div>
      )}
    <RouterProvider router={router}/>
    </BookmarksContext.Provider>
  );
  
}

export default App
