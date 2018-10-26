// asingar nombre a cache
const CACHE_NAME = 'V1_Cache_Savia_Pwa';

// ficheros a cachear en la aplicacion

var urlToCache = [
    './',
    './css/all.css', './css/style.css', './img/1.png', './img/2.png', './img/3.png', './img/4.png', './img/5.png', './img/6.png',
    './img/facebook.png', './img/instagram.png',
    './img/twitter.png', './img/favicon-1024.png',
    './img/favicon-512.png', './img/favicon-384.png',
    './img/favicon-256.png', './img/favicon-192.png',
    './img/favicon-128.png', './img/favicon-96.png',
    './img/favicon-64.png', './img/favicon-32.png',
    './img/favicon-16.png', './img/favicon.png',
]

// evento install
// Instalacion del services worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlToCache)
                .then(() => {
                    self.skipWaiting();
                })
        }).catch(err => {
            console.log('No se ha registrado el cache ', err);
        })
    );
});


// evento  activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(Name => {
                    if (cacheWhiteList.indexOf(Name) === -1) {
                        return caches.delete(Name);
                    }
                })
            )
        }).then(() => {
            // Activar Cache
            self.clients.claim();
        })
    );

});

// evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => {
        if (res) {
            return res;
        }
        return fetch(e.request);
    }));
});