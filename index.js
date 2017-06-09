self.addEventListener('install', function(e) {
  	console.log('Install Event:', e);
});
self.addEventListener('activate', function(e) {
  	console.log('Activate Event:', e);
});
self.addEventListener('fetch', function(event) {
	const tmp = fetch(event.request).then(function(response) {
        caches.open(cacheName).then(
        function(cache) {
            if(response.status >= 500) {
                cache.match(event.request).then(
                function(res) {
                    return res;
                }).catch(function() {
                    return response;
				}); 
            } else {
                cache.put(event.request, response.clone());
                return response;
			} 
		});
	});
	event.respondWith(tmp);
});	                    