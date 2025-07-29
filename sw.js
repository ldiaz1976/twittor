importScripts('js/sw-utils.js');


const APP_CACHE = 'app-v2';
const LIBS_CACHE = 'libs-v1';
const DYNAMIC_CACHE = 'dynamic-v1';


const APP_SHELL = [
    // '/', // raiz solo para desarrollo no para live
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
]

const APP_SHELL_LIBS = [
    'css/animate.css',
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'js/libs/jquery.js'
]


self.addEventListener('install', e => {


    const appCache = caches.open(APP_CACHE).then(cache => cache.addAll(APP_SHELL));
    const appLibsCache = caches.open(LIBS_CACHE).then(cache => cache.addAll(APP_SHELL_LIBS));

    e.waitUntil(Promise.all([appCache, appLibsCache]));


});

self.addEventListener('activate', e => {

    const removeCaches = caches.keys().then(keys => {

        keys.forEach(key => {
            if (key !== APP_CACHE && key.includes("app")) {
                return caches.delete(key);
            }

            if (key !== LIBS_CACHE && key.includes("libs")) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes("dynamic")) {
                return caches.delete(key);
            }

        })

    });

    e.waitUntil(removeCaches);


});

self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {
            return fetch(e.request).then(newRes => {
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }

    });


    e.respondWith(respuesta);


});
