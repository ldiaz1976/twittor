
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

function getContacts() {

    if (navigator.contacts) {
        const props = ["name", "email", "tel", "address", "icon"];
        const opts = { multiple: true };

        try {
            navigator.contacts.select(props, opts).then(contacts => {
                alert(contacts);
                console.log(contacts);
            });
        } catch (ex) {
            alert(ex);// Handle any errors here.
            console.log(ex);// Handle any errors here.
        }

    } else {
        console.log("bye Contacts")
    }



}