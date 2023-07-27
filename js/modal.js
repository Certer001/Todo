const modalWindow = document.querySelector('.modal-window');
const closeBtnNode = document.querySelector('#js-close-btn');

window.onload = openWindow;

closeBtnNode.addEventListener('click', function() {
    modalWindow.style.display = 'none';
});

function openWindow() {
    modalWindow.style.display = 'block';
}