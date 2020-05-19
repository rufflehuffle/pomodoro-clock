const settingsButton = document.querySelector('#settings');
const settings = document.querySelector('#settings-container');
const dark = document.querySelector('#dark');

function toggleVisibility() {
    for (let i = 0; i < arguments.length; i++) {
        (arguments[i].style.display === 'none' || !(arguments[i].style.display)) ? (arguments[i].style.display = 'block') : (arguments[i].style.display = 'none');
    }
    
}