function setUp () {
    var range = document.getElementById("range_password");
    var num_pass = document.getElementById("num_pass_field");
    range.value = 15;
    num_pass.value = 15;
    generatePassword();
}

window.onload = setUp();

function generatePassword () {
    hideMessage();
    var a_z = "abcdefghijklmnopqrstuvwxyz";
    var A_Z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var num = "1234567890";
    var spec = "!@#$%^&*(){}<>?";

    var cb1 = document.getElementById("cb_1");
    var cb2 = document.getElementById("cb_2");
    var cb3 = document.getElementById("cb_3");

    var password = "";

    var size = document.getElementById("num_pass_field").value;

    for(var i = 0; i < size; ++i) {
        var type = getRandomInt(10);
        if(type <= 5) {
            if(cb1.checked) {
                type = getRandomInt(3);
                if(type == 0) {
                    password += A_Z[getRandomInt(26)];
                } else {
                    password += a_z[getRandomInt(26)];
                }
            } else {
                password += a_z[getRandomInt(26)];
            }
        } if (type > 5 && type <= 8) {
            if(cb2.checked) {
                password += num[getRandomInt(10)];
            } else {
                password += a_z[getRandomInt(26)];
            }
        } if (type > 8) {
            if(cb3.checked) {
                password += spec[getRandomInt(15)];
            } else {
                password += a_z[getRandomInt(26)];
            }
        }
    }
    
    console.log(password);
    document.getElementById("result_password").value = password;
}

function rangeControl() {
    var range = document.getElementById("range_password");
    var num_pass = document.getElementById("num_pass_field");

    num_pass.value = range.value;

    range.addEventListener('input', function (e) {
        num_pass.value = e.target.value;
    });
    num_pass.addEventListener('input', function (e) {
        range.value = e.target.value;
    });
}

function cb_Control() {
    var cb = document.getElementsByName("cb_settings");
    var check = 0;
    for (var i = 0; i<3; ++i) {
        if(cb[i].checked)
            ++check;
    }
    if(check < 2) {
        cb_CheckLast();
    } else {
        cb_UnCheckLast();
    }
}

function cb_CheckLast() {
    var cb = document.getElementsByName("cb_settings");
    for (var i = 0; i<3; ++i) {
        if(cb[i].checked)
            cb[i].disabled = true;
    }
}

function cb_UnCheckLast() {
    var cb = document.getElementsByName("cb_settings");
    for (var i = 0; i<3; ++i) {
        if(cb[i].checked)
            cb[i].disabled = false;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function copyToClipboard() {
    navigator.clipboard.writeText(document.getElementById("result_password").value);
    document.getElementById("message").style.setProperty("color", "#198754");
}

function hideMessage() {
    document.getElementById("message").style.setProperty("color", "transparent");
}
