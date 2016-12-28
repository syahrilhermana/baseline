/**
 * Created by syahrilhermana on 8/23/16.
 */

$( document ).ready(function() {
    // init
    limit = document.getElementById('display-limit');
    page  = exec('page');
    if (page==null || page=="") {
        page = '';
    }else {
        page = '?page='+page;
    }

    size  = exec('size');
    if (size==null || size=="") {
        size = '';
    }else {
        size = '&#38;size='+size;
    }

    query = exec('text');
    if (query==null || query=="") {
        query = '';
    }else {
        query = '&#38;text='+query;
    }
});

function exec(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&#38;");
    var regex = new RegExp("[?&#38;]" + name + "(=([^&#38;#]*)|&#38;|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}