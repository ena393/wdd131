
let selectElem = document.querySelector('select');
let logo = document.querySelector('footer img');
let html = document.documentElement;

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        html.classList.add('dark');
        logo.src = "https://wddbyui.github.io/wdd131/images/byui-logo-white.png";
    } else {
        html.classList.remove('dark');
        logo.src = "https://wddbyui.github.io/wdd131/images/byui-logo-blue.webp";
    }
}