window.onload = (function () {
    loadHeader();
});

function loadHeader(){
    $('.degree-banner-container').load("banner.html");
    $('.degrees-menu').load("menu.html");
}



function setNavbarActive() {
    var hrefPage = (location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    $('a[href="' + hrefPage + '"]').closest('li').addClass('active');
}

