url = 'https://gamemodeon.de/sb/3';

document.addEventListener("deviceready", init, true);

function init() {
    var autologin = window.localStorage.getItem('autologin');
    if(autologin == 'true') {
        var user = window.localStorage.getItem('user');
        var passwd = window.localStorage.getItem('passwd');
        login(user, passwd);
    } else {
        $('#login').show();
    }
    $('#output').show();
    output();
    $('#main').show();
}

lid = 0;
function output() {
    $.get(url+'/output.php?lid='+lid+'&time='+new Date, function(data){
        if(data != '') {
            var lmsg = data.split("\n")
            lid = lmsg[0];
            $('#output').prepend(lmsg[1]);
        }
    });
    setTimeout("output()", 3000);
}

function savelogin(user, passwd) {
    window.localStorage.setItem('user', user);
    window.localStorage.setItem('passwd', passwd);
    window.localStorage.setItem('autologin', 'true');
}

function login(user, passwd) {
    user = user || $('[name="user"]').val();
    passwd = passwd || $('[name="passwd"]').val();
    $.post(url+'/input-login.php', { user: user, passwd: passwd }).done(function(data) {
        if(data != '') {
            sid = data;
            $('#login').hide();
            $('#input').show();
            $('#menubutton').show();
            if($('[name="savelogin"]').prop('checked')) {
                savelogin(user, passwd);
            }
        } else {
            $('#errorlogin').show();
        }
    });
}
function logout() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('passwd');
    window.localStorage.removeItem('autologin');
    $('#input').hide();
    $('#login').show();
    closemenu();
}

function input() {
    var message = $('[name="message"]').val();
    $.post(url+'/input-login.php', { sid: sid, message: message }).done(function(data) {
        $('[name="message"]').val('');
    });
}

function openmenu() {
    $('#main').hide();
    $('#menu').show();
}

function closemenu() {
    $('#menu').hide();
    $('#main').show();
}

function closeapp() {
    document.close();
}
