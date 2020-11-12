$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});

$(function () {
    $('#bs-example-navbar-collapse-1').on('shown.bs.collapse', function (e) {
        $('#my_dropdown').dropdown('toggle', 'open').hide();
        console.log('shown:', e);
    });
});

function spiderjam(mym, myd) {
    document.write("<a href=mailto:" + mym + "&#64;" + myd + ">" + mym + "&#64;" + myd + "</a>");
}

function reset_menus() {
    sizing($(window).width());
}

// Take action if the request on URI has internal link '#'
function internal_link() {
    var urlArray = window.location.href.split('#');
    if (urlArray.length == 2 && urlArray[1] != "") {
        switch (urlArray[1]) {
            case "intro": $('#tab-1-content').show(); break;
            case "grants": $('#tab-2-content').show(); break;
            case "selectedpubs": $('#tab-3-content').show(); break;
            case "courses": $('#tab-4-content').show(); break;
            case "advising": $('#tab-5-content').show(); break;
            case "service": $('#tab-6-content').show(); break;
            default: break;
        }
    }
}

function sizing(windowWidth) {
    //alert(windowWidth);
    if (windowWidth < 1024) { // desktop size
        $('.twittertop').hide();
        $('.twitterlow').show();
    } else {
        $('.twittertop').show();
        $('.twitterlow').hide();
    }

    if (windowWidth <= 480) { // ipad:768, Nexus10:800, 480
        $('.allshow').hide(); //
        $('.noshow').show();
        $('.expandshow').show();
        $('.collapseshow').hide();
        $('.alwaysshow').show();
    } else {
        $('.allshow').show();
        $('.noshow').hide();
        $('.expandshow').hide();
        $('.collapseshow').hide();
        $('.alwaysshow').show();
    }
}

jQuery(document).ready(function ($) {
    var windowWidth = $(window).width();
    $(window).resize(function () {
        // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
        if ($(window).width() != windowWidth) {
            windowWidth = $(window).width();
            sizing(windowWidth);
        }
    });
    sizing(windowWidth);
    internal_link();
});
