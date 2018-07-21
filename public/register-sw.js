console.log ("Registering SW");
if ('serviceWorker' in navigator) {
    console.log ("Service Worker is supported");
	navigator.serviceWorker.register('sw.js')
		.then (() => { 
            console.log('Service Worker Registered'); 
        })
        .catch ((error) => {
            console.log (error);
        });
}
else {
    console.log ("Browser doesn't support service workers");
}