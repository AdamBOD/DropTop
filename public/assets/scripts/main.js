var socket = io();

if (!window.Promise) {
    window.Promise = Promise;
}

$('#submitUsername').click(() => {
    console.log(`Username: ${$('.username').val()}`)
    socket.emit('setName', $('.username').val());
});

socket.on("welcome", (data) => {
    console.log(data);
});

$(document).ready(function () {
    $('#material-tabs').each(function () {

        var $active, $content, $links = $(this).find('a');

        $active = $($links[1]);
        $active.addClass('active');

        $content = $($active[0].hash);

        $links.not($active).each(function () {
            $(this.hash).hide();
        });

        $(this).on('click', 'a', function (e) {

            $active.removeClass('active');
            $content.hide();

            $active = $(this);
            $content = $(this.hash);

            $active.addClass('active');
            $content.show();

            e.preventDefault();
        });
    });

    console.log (localStorage.getItem ("sessionID"));

    if (localStorage.getItem ("sessionID") === null) {
        loadLogin();
    }
});

function loadLogin () {
    $(".mainBody").fadeOut (() => {
        $(".mainBody").load ("/content/login.txt", () => {
            $(".mainBody").fadeIn();
            $(document).on ("click", "#logInButton", logIn ($("#username").val(), $("#password").val()));
            $(document).on ("click", "#registerLink", loadRegister());
        });
    });
}

function loadRegister () {
    $(".mainBody").fadeOut (() => {
        $(".mainBody").load ("/content/register.txt", () => {
            $(".mainBody").fadeIn();
            $(document).on ("click", "#registerButton", register ($("#username").val(), $("#password").val()));
            $(document).on ("click", "#registerLink", loadRegister());
        });
    });
}

function loadHome () {
    $(".mainBody").fadeOut (() => {
        $(".mainBody").load ("/content/home.txt", () => {
            $(".mainBody").fadeIn();
        });
    });
}

function logIn (username, password) {
    socket.emit ("login", {user: username, password: password});
    loadHome()
}

function register (username, password) {
    socket.emit ("register", {user: username, password: password});
}