const CACHE_NAME = 'lightning-cube-cache-v1';
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
    'resources/fonts/MinecraftTen.otf',
    'resources/fonts/MinecraftTen.ttf',
    'resources/fonts/MinecraftSeven.otf',
    'resources/fonts/MinecraftSeven.ttf',
    'https://github.com/JeamDeveloper/Lightning-Cube/blob/b825d46606c034cd388afe4c455f28235f2bb9e6/resources/images/icons/MMAPlus%20Icon.PNG?raw=true',
    'https://github.com/JeamDeveloper/Lightning-Cube/blob/f69418991959d3e14dfebefdc162dcc0ad8a75c9/resources/images/background/MM-Addon-Showcase-01.jpg?raw=true',
    'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenLauncherButton.png?raw=true',
    'https://github.com/JeamDeveloper/Lightning-Cube/blob/5aff47a73f83947efecd99b74e50855641235ed6/resources/images/buttons/GreenPressesLauncherButton.png?raw=true'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en caché');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Activación y limpieza de caché antigua
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Intercepción de peticiones para cargar desde caché o red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cargar desde caché si está disponible
                if (response) {
                    return response;
                }

                // Si no está en caché, cargar desde la red
                return fetch(event.request).then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    // Clonar la respuesta para añadirla al caché
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                });
            })
    );
});
