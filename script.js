function getTimeRemaining(endtime) {
    var total = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((total / 1000) % 60);
    var minutes = Math.floor((total / 1000 / 60) % 60);
    var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    var days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
        total,
        days,
        hours,
        minutes,
        seconds,
    };
}

function initializeClock(endtime) {
    function updateClock() {
        var t = getTimeRemaining(endtime);

        var countdown = document.getElementById('countdown');
        countdown.innerHTML =
            t.days + ' Days : ' +
            ('0' + t.hours).slice(-2) + ' Hours : ' +
            ('0' + t.minutes).slice(-2) + ' Minutes : ' +
            ('0' + t.seconds).slice(-2) + ' Seconds';

        if (t.total <= 60000) {
            countdown.innerHTML =
                ('0' + t.seconds).slice(-2) + ' . ' +
                ('00' + Math.floor(t.total % 1000)).slice(-3);
        }

        if (t.total <= 86400000) {
            countdown.style.color = '#00f';
        } else if (t.total <= 60000) {
            countdown.style.color = '#f00';
        } else {
            countdown.style.color = '#0f0';
        }

        if (t.total <= 0) {
            clearInterval(timeinterval);
            countdown.innerHTML = 'The 2023 Fleur Dis League Fantasy Draft is now OPEN!';
            countdown.style.color = '#0af';
            onTheClock.innerHTML = '';
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var draftDate = new Date('2023-09-02T18:30:00-07:00');
var countdown = document.getElementById('countdown');
var onTheClock = document.getElementById('onTheClock');

initializeClock(draftDate);

var espnButton = document.getElementById('espnButton');
espnButton.addEventListener('click', function() {
    openESPNFantasy();
});

function openESPNFantasy() {
    var espnWindow = window.open('https://www.espn.com/fantasy/', '_blank');

    if (espnWindow) {
        espnWindow.focus();
    }
}