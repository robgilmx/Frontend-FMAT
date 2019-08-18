window.onload= (function () {
    loadLISHeader();
});

function loadLISHeader(){
    $('.degree-banner-container').load("lis/banner.html");
    $('.degrees-menu').load("lis/menu.html");
}



function setNavbarActive() {
    var hrefPage = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    $('a[href="' + hrefPage + '"]').closest('li').addClass('active');
}

function showGuia(){
    $('.degree-container').empty();
    $('.degree-container').load('lis/guia-estudiante.html');
}
function showObjetivos(){
    $('.degree-container').empty();
    $('.degree-container').load('lis/objetivos.html');
}

