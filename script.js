function showMenu() {
    var x = document.getElementById('menuShow');
    if (x.classList.contains('show')) {
        x.classList.remove('show');
        setTimeout(() => {
            x.style.visibility = 'hidden';
        }, 1000);
    } else {
        x.style.visibility = 'visible';
        x.classList.add('show');
    }
}

let alarm = new Audio('./assets/audio/pizza.mp3');
let timerStartet = false;
let timeLeft; 
let timerInterval;

function startTimer() {
    if (!timerStartet) {
        let endTime = new Date().getTime() + timeLeft; 
        timerInterval = setInterval(function () {
            let currentTime = new Date().getTime();
            timeLeft = endTime - currentTime; 
            if (timeLeft >= 0) {
                let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
                let seconds = Math.floor((timeLeft / 1000) % 60);
                minutes = minutes < 10 ? '0' + minutes : minutes; 
                seconds = seconds < 10 ? '0' + seconds : seconds; 
                document.getElementById('timer').innerHTML = minutes + ':' + seconds; 
            } else {
                clearInterval(timerInterval); 
                alarm.play();
                document.getElementById('timer').innerHTML = '00:00'; 
            }
        }, 1000);
        timerStartet = true;
    }
}

function setTimer(time) {
    timeLeft = time * 60 * 1000; 
}

function attachClickEvents() {
    const paragraphs = document.querySelectorAll('.pizzaArea p');
    paragraphs.forEach(paragraph => {
        paragraph.addEventListener('click', () => {
            const timeMatch = paragraph.textContent.match(/\d+/); 
            if (timeMatch) {
                const time = timeMatch[0];
                setTimer(time);
                document.getElementById('timer').innerHTML = (time < 10 ? '0' : '') + time + ':00'; 
            }
        });
    });
}

function stopTimer() {
    if (timerStartet) {
        clearInterval(timerInterval);
        timerStartet = false; 
    } else {
        startTimer(); 
    }
}

window.onload = attachClickEvents;

document.getElementById('startButton').addEventListener('click', function() {
    if (timeLeft > 0) {
        startTimer();
    } else {
        alert('Bitte wählen Sie eine Zeit aus.');
    }
});