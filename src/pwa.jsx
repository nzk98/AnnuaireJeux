import {registerSW} from 'virtual:pwa-register';

//configuration de la mise a jour du service orker
const updateSW = registerSW({
    //Appelé quand une mise a jour est disponible
    onNeedRefresh() {
        if(confirm('Une nouvelle version est disponible. Voulez-vous mettre a jours ? ')){
            updateSW();
        }
    },
    //Appelé quand l'application est préte pour le mode hors-ligne
    onOfflineReady(){
        console.log('Application prête pour une utilisation hors-ligne')
    },
})