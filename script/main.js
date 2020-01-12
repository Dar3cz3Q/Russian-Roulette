window.addEventListener("load", function () {
    const currentDate = new Date();
    var actualyear = currentDate.getFullYear();
    $(".footer-container").html(`<span class="footer-text">RussianRoulette&nbsp;&copy;&nbsp;All&nbsp;rights&nbsp;reserved&nbsp;${actualyear}</span>`)
})

window.addEventListener("load", function () {
    var preloaderEl = document.querySelector(".preloader-container");
    $(".preloader-container").addClass("preloader-hidding");
    preloaderEl.addEventListener("transitionend", function () {
        $(".preloader-container").addClass("preloader-hidden");
        $(".preloader-container").removeClass("preloader-hidding");
    });
});

window.addEventListener("load", function () {
    for (let i = 2; i < 38; i++) {
        $(".users-choose").append(`<div class="user-number flex" data-count="${i}">${i}</div>`);
        var createdEl = document.getElementsByClassName("user-number")[i - 2];
        createdEl.addEventListener("click", selectcountofplayers);
    };
});

const killedplayers_type = [];

function selectcountofplayers() {
    var playerscount = $(this).data("count");
    $(".users-count-container").addClass("hidden-element");
    $(".players-container").removeClass("hidden-element");
    for (let i = 0; i < playerscount; i++) {
        killedplayers_type[i] = i + 1;
        $(".players-content").append(`
            <div class="person flex">
                <img id="photo-${i + 1}" src="img/white.png" class="person-image flex" alt="Good person" draggable="false"> 
                <input id="name-${i + 1}" class="person-name flex" contenteditable="true" placeholder="Person: ${i + 1}" maxlength="7">
            </div>
        `);
        //$(".players-container").append(`<audio id="sound-${i}" src="audio/rewolwer.mp3"></audio>`);
    }
}

window.addEventListener("click", function () {
    var eventEl = document.getElementsByClassName("players-random-button")[0];
    eventEl.addEventListener("click", randomizer);
});

const killedplayers = [];
var randomizercounting = 0;
//var soundcounter = 0;

function randomizer() {
    //soundcounter++
    const sound = document.getElementById('sound');
    sound.currentTime = 0
    sound.play();
    const status = [];
    var playerscount = $(".person").length;
    var randomplayer = Math.floor(Math.random() * playerscount + 1);
    $.each(killedplayers, function (i) {
        var checkingnumber = killedplayers[i];
        if (checkingnumber === randomplayer) {
            status[0] = false;
            return false;
        } else {
            status[0] = true;
        }
    });
    if (status[0] === false) {
        randomizer();
    } else {
        killedplayers[randomizercounting] = randomplayer;
        randomizercounting++;
        showresult(randomplayer);
        if (killedplayers.length === playerscount - 1) {
            killedplayers.sort();
            killedplayers_type;
            const thewinner = [];
            $.each(killedplayers_type, function (i) {
                var value1 = killedplayers_type[i],
                    value2 = killedplayers[i];
                if (value1 === value2) {
                    console.log("OK");
                } else {
                    thewinner[0] = value1;
                    return false;
                }
            });
            var nameid = document.getElementById('name-' + thewinner[0] + '');
            var thewinnername = nameid.value;
            nameid.disabled = "disabled";
            if (thewinnername === "") {
                var winnerfinal = 'Person: ' + thewinner[0] + '';
            } else {
                var winnerfinal = thewinnername;
            }
            $(".players-random-button").addClass("hidden-element");
            sound.addEventListener("ended", function () {
                $(".players-container").html(`
                    <div class="user-winner flex">
                        <span>The winner is:</span>
                        <div class="person flex">
                            <img src="img/white.png" class="person-image flex" alt="Good person" draggable="false"> 
                            <input class="person-name flex" contenteditable="true" value="${winnerfinal}" disabled>
                        </div>
                    </div>
                `)
            });
        }
    }
}

function showresult(resultnumber) {
    var photoid = document.getElementById('photo-' + resultnumber + '');
    photoid.src = "img/red.png";
    var nameid = document.getElementById('name-' + resultnumber + '');
    var actualname = nameid.value;
    if (actualname === "") {
        nameid.value = 'Person: ' + resultnumber + ' died';
    } else {
        nameid.value = '' + actualname + ' died';
    }
    nameid.disabled = "disabled";
}