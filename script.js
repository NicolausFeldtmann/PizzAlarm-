
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