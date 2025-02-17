import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/AnnuaireJeux/',
  plugins: [react(), tailwindcss(),VitePWA({
    //mise a joour auto des serveur woker
    registerType:'autoUpdate',

    //fichier à inculre dans le cache
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],

    //configuration ddu manifest
    manifest : {
      name: 'Annuaire des jeux',  //nom complet
      short_name: 'Jeux',  //nom court pourl'écran daccueil
      description: 'Application de recherche de jeux video',
      theme_color: '#ffffff',  //couleur du theme
      start_url: '/',  //page de demarrage
      display: 'standalone',  //Mode d'affichage
      background_color: '#ffffff',  //couleur de fond au démarrage

      //Liste des icon
      icons: [
        {
          src: 'pwa-192x192.png', //Chemin relatif au dossier public
          sizes: '192x192',  //taille de l'icone
          type: 'image/png' //type de fichier
        },
        {
          src: 'pwa-512x512.png',//chemin dossier
          sizes: '512x512',
          type:'image/png',
          purpose: 'any maskable'
        }
      ]

    },
    workbox: {
      runtimeCaching: [{
        //Pattern pour les urls de l'API RAWG
        urlPattern: /^https:\/\/api\.rawg\.io\/api/,
        //Stratègie de cache : sert le cache d'abord, puis met à jour
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'api-cache',
          //configuration de l'expiration du cache
          expiration:{
            maxEntries: 100,  //Nombre max d'entrées
            maxAgeSeconds: 86400 //durée de vie (24h)
          },
          //Types de reponses à metre en cache
          cacheableResponse: {
            statuses: [0,200]   //Codes HTTP acceptés
          }
        }
      }]
    }

  })],
})
