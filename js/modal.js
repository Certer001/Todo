const modalWindow = document.querySelector('.modal-window');
const openWindowBtnNode = document.querySelector('#js-openWindow-btn');
const closeBtnNode = document.querySelector('#js-close-btn');


openWindowBtnNode.addEventListener('click', function() {
    modalWindow.style.display = 'block';
})

closeBtnNode.addEventListener('click', function() {
    modalWindow.style.display = 'none';
});
