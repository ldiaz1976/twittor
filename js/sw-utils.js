
function actualizaCacheDinamico(dynamicCacheName, req, res) {

    if (res.ok) {
        caches.open(dynamicCacheName).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        });
    } else {
        return res;
    }

}