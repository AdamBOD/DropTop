if (!window.Promise) {
    window.Promise = Promise;
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register ('./sw.js').then (() => {
        console.log ('Service Worker registered.');
    });
}
else {
    console.log ('Browser doesn\'t support Service Workers.');
}