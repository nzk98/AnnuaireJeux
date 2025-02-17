import { useEffect, useState } from "react";
import React, {useContext} from "react";
import haversine from "../../haversine";





const Myshop = () => {
    //je fait mon useState sur la distance dans magasin
    const [distanceMagasin, setDistanceMagasin] = useState(null);

    useEffect(() => {
        //je vais chercher la position exact de l'utilisateur 
        navigator.geolocation.getCurrentPosition(
            //j'enregistre la lattitude, longitude dans des variable
            (position) => {
                const myLat = position.coords.latitude;
                const myLong = position.coords.longitude;
                const myCoord = { latitude: myLat, longitude: myLong };
                //je commence ma requete ajax pour avoir les magasins
                fetch("https://formacitron.github.io/shopslist/shops.json")
                .then((response) => {
                        //si la response n'est pas ok alors il affiche une erreur et retourne faux
                        if (!response.ok) {
                            console.error("Erreur de la requête:", response);
                            return false;
                        }
                        //sinon il retourne response.Json 
                        return response.json();
                    })
                    //je prend les donnée de response que je met dans data 
                    .then((data) => {
                        //j'enregistre la distance et le nom du magasin dans une variable magasin proche
                        let magasinProche = { 
                            distance: Infinity, 
                            magasin: "",
                        };
                        //on va bouclé sur les magasin pour afficher celui le plus proche
                        for (const magasin of data) {
                            //j'enregistre dans une variable les coordonnée des magasin
                            let coords = { 
                                latitude: magasin.gps_lat,
                                longitude: magasin.gps_lng
                            };
                            
                            let distance = haversine(myCoord, coords);
                            // si la distance est plus petite que la distance de la variable magasin proche
                            if (distance < magasinProche.distance) {
                                //alors tu enregistre ça dans magasin proche
                                magasinProche = {
                                    distance: distance,
                                    magasin: magasin.name,
                                };
                            }
                        }
                        //convertir les metre en KM
                        magasinProche.distance = magasinProche.distance/1000; // Convertir en Km

                        setDistanceMagasin(magasinProche);
                    })
            },
            //on gere les erreur
            (error) => {
                console.error("Erreur de géolocalisation:", error.message)
            }
        );
    }, []);

    return (
        <>
        <div>
            <h1>Magasin le plus proche</h1>
            {distanceMagasin ? (
                <p>
                    {distanceMagasin.magasin} à {distanceMagasin.distance.toFixed(2)} Km
                </p>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
        </>
    );
};

export default Myshop;
 

// const MyShop = () => {
//     // useEffect prend toujours 2 valeur generalement un tableau vide en 2eme valeur 
//     // si pas de 2eme valeur a chaque raffraichisement de page pour une requete AJAX 
//     //useEffect continuera a faire des requete a l'infinit
//     useEffect(() => {

//     }, [])
//     //requete ajax pour la position des magasin
//     fetch('https://formacitron.github.io/shopslist/shops.json')
//     .then(response =>{
//         if(!response.ok){
//             console.log('Erreur de la requête');
//             return false; // J'arrête l'exécution du script
//         }
//         return response.json();
//     })
//     .then(data =>{
//         console.log('Résultat ', data);
//     })


//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const latitude = position.coords.latitude;
//             console.log("Latitude", position.coords.latitude);
//             const longitude = position.coords.longitude;
//             console.log("longitude", position.coords.longitude);
//             const Précision = position.coords.accuracy;
//             console.log("Précision", position.coords.accuracy,"mètres");
//             return{
//                 lat: latitude;
//                 long: longitude;
//             }
//         },
//         (error) => {
//             console.error(error.message);
//         }
//     )


    



//   return (
//   <>
  
//   </>  

// )
// }
