var socket = io();

if (!window.Promise) {
    window.Promise = Promise;
}

$('#submitUsername').click (() => {
    console.log (`Username: ${$('.username').val()}`)
    socket.emit ('setName', $('.username').val());
});

socket.on ("welcome", (data) => {
    console.log (data);
});