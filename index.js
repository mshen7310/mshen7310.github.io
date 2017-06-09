self.addEventListener('install', function(e) {
  	console.log('Install Event:', e);
});
self.addEventListener('activate', function(e) {
  	console.log('Activate Event:', e);
});
self.addEventListener('fetch', function(event) {
	event.respondWith(
	    fetch(event.request).then(function(response) {
	        caches.open(cacheName).then(function(cache) {
	            if(response.status >= 500) {
	                cache.match(event.request).
	                then(function(response) {
	                    return response;
	                }).catch(function() {
	                    return response;
					}); 
	            } else {
                    cache.put(event.request,
                    response.clone());
                    return response;
				} 
			});
		}));
});	                    