// Catch any error
//window.onerror = function(msg, file, line) {
//    alert(msg + "::" + file + "::" + line);
//    return true;
//}

/*
 * Open the drawer when the menu ison is clicked.
 */
var menu = document.querySelector('#menu');
var drawer = document.querySelector('.nav');

menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});
