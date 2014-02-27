feedUrl = "http://www.sonypictures.com/previews/movies/carrie.xml";
autocloseToggle = true;
singlevideoToggle = false;
callbackToggle = true;
clipName = 1;
parentSwf = 'enterthesite-video';
absolutePathForResources = true;


function isIOS() {
    var isiPhone = navigator.userAgent.toLowerCase().search("iphone") > 0;
    var isiPad = navigator.userAgent.toLowerCase().search("ipad") > 0;
    var isiPod = navigator.userAgent.toLowerCase().search("ipod") > 0;
    return (isiPhone || isiPad || isiPod) ? true : false;
}
function clickType() {
    return isIOS() ? "touchend" : "click";
}
if (!document.getElementsByClassName)
    document.getElementsByClassName = function(cn) {
	var allT = document.getElementsByTagName('*'), allCN = [], i = 0, a;
	while (a = allT[i++]) {
	    a.className == cn ? allCN[allCN.length] = a : null;
	}
	return allCN
    }

function initStylesAndMethods() {
    Cufon.replace('.cf_trajanPro', {fontFamily: 'Trajan Pro'});
    Cufon.now();
}

var curLang;
function init() {
    setTimeout(function() {
	window.scrollTo(0, 1);
    }, 100);
    if (navigator.userAgent.match(/Android/i)) {
	document.body.className = "android";
    }
    else {
	document.body.className = "ios";
    }

    createGallery();
    createVideoGallery();
    addSiteStateEvents();
    addTracking();
    initStylesAndMethods();

    var allInputs = [];

    var inputs = document.getElementsByTagName('input');
    var selects = document.getElementsByTagName('select');

    for (i = 0; i < inputs.length; i++) {
	inputs[i].onblur = function() {
	    window.scrollTo(0, 1);
	}
    }

    for (j = 0; j < selects.length; j++) {
	selects[j].onblur = function() {
	    window.scrollTo(0, 1);
	}
    }

    addTicketingWidget('10/11/2012'); //add ticketing widget and set release date

    //TRANSLATION BUTTON
    curLang = "english";
    document.getElementById("languageButton").addEventListener(clickType(), function(e) {
	curLang = curLang == "english" ? "spanish" : "english";
	var otherLang = curLang == "english" ? "spanish" : "english";

	var curEls = document.getElementsByClassName(curLang);
	var otherEls = document.getElementsByClassName(otherLang);

	for (var i = 0; i < curEls.length; i++)
	    curEls[i].style.display = "block";
	for (var i = 0; i < otherEls.length; i++)
	    otherEls[i].style.display = "none";


	if (curLang == "english") {
	    $("#languageButton")
		    .css("background-position-y", "16px")
		    .attr("data-tracking", "englishs_button promotion");

	    sCode.trackOutboundClick('index.html', 'english_button');

	    $("#callbtn .bottom span").text('AT');
	    $("body, #callbtn").removeClass('esp');
	}
	else {
	    $("#languageButton").css("background-position-y", "0");

	    sCode.trackOutboundClick('index.html', 'espanol_button');

	    $("#callbtn .bottom span").text('EN');
	    $("body, #callbtn").addClass('esp');
	}
    }, false);
    //HIDE ALL OF OTHER LANGUAGE FOR NOW
    var otherLang = curLang == "english" ? "spanish" : "english";
    var otherEls = document.getElementsByClassName(otherLang);
    for (var i = 0; i < otherEls.length; i++)
	otherEls[i].style.display = "none";



    /*document.getElementById("playvideo").addEventListener(clickType(), function(e){
     e.preventDefault();
     openOverlay();
     return false;
     }, false);*/
}

function addTicketingWidget(releaseDate) {
    var dateSelector = new mobileDateSelector(releaseDate);
    dateSelector.createDates();

    document.getElementById('search-btn').addEventListener("click", function(e) {
	e.preventDefault();
	doShowtimeSearch();
    }, false)
}

function toggleMenu() {
    var menu = document.getElementsByTagName("menu")[0];
    var currentState = menu.className;
    if (currentState.match("close")) {
	menu.className = currentState.replace("close", "open");
    }
    else {
	menu.className = currentState.replace("open", "close");
    }
}

function addSiteStateEvents() {
    var anchoritems = document.getElementsByTagName('a');


    for (var i = 0; i < anchoritems.length; i++) {
	anchoritems[i].addEventListener('click', siteState, false);
    }


    var widgetOverlay = document.getElementById('overlay');
    widgetOverlay.addEventListener('click', function() {
	var homeSec = document.getElementById('home');
	home.className = '';
    }, false);

}

var hideMenu = null;

function siteState(evt) {
    var home = document.getElementById('home');
    var href = this.getAttribute('href');

    if (href == '#home') {
	home.className = '';
	window.clearInterval(hideMenu);
    } else if (href != null && href.match(/^#/)) {
	home.className = 'hide';
    }

    /*
     Detect if subpage has been closed by using back button for Android
     */
    hideMenu = window.setInterval(function() {
	if (window.location.hash == '#home' || window.location.hash == '') {
	    home.className = '';
	    window.clearInterval(hideMenu);
	}
    }, 1000);
}

/*
 Example for promotion tracking:
 <a href="test.html" data-tracking="promotion">Test</a>
 
 Options for tracking:
 data-tracking="promotion"
 data-tracking="featured"
 data-tracking="order"
 data-tracking="page"
 
 Notes: only accounts for anchors.  This should be it's own class.
 */
function addTracking(obj) {
    //alert('addtracking');
    var doc = obj ? obj : document;

    var datatrackingstr = 'data-tracking';
    var first = 0;

    var as = doc.getElementsByTagName('a');
    for (var i = 0; i < as.length; i++) {
	var a = as[i];
	var data = a.getAttribute(datatrackingstr);
	if (data) {
	    var parsedDataAttr = data.split(' ');
	    var last = parsedDataAttr.length - 1;

	    switch (parsedDataAttr[last])
	    {
		case "promotion":
		    a.removeEventListener('click', callPromotion, false);
		    a.addEventListener('click', callPromotion, false);
		    break;
		case "order":
		    a.removeEventListener('click', callOrder, false);
		    a.addEventListener('click', callOrder, false);
		    break;
		case "featured":
		    a.removeEventListener('click', callFeatured, false);
		    a.addEventListener('click', callFeatured, false);
		    break;
		case "page":
		    a.removeEventListener('click', callPage, false);
		    a.addEventListener('click', callPage, false);
		    break;
		case "download":
		    a.addEventListener('click', callDownload, false);
		    break;
		case "trailer":
		    a.addEventListener('click', callVideo, false);
		    break;
	    }
	}
    }
    var lb = doc.getElementById("languageButton");
    //lb.addEventListener('click', callPage, false);


    var videos = doc.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
	var videoplayer = videos[i];
	var data = videoplayer.getAttribute(datatrackingstr);
	if (data) {
	    videoplayer.addEventListener('play', function(evt) {
		if (evt.target.currentTime.toFixed(1) < 1) {
		    sCode.trackDownload(data);
		}
	    }, false);
	}
    }
    function callDownload(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	if (isOmnitureExists()) {
	    sCode.trackDownload(data[0]);
	}
    }

    function callVideo(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	if (isOmnitureExists()) {
	    sCode.trackVideo(data[0], 'start');
	}
    }


    function callPromotion(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	var href = this.getAttribute('href');
	if (isOmnitureExists())
	{
	    sCode.trackOutboundClick(href, data[first]);
	}
    }

    function callOrder(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	var href = this.getAttribute('href');
	if (isOmnitureExists())
	{
	    sCode.trackOutboundClickToBuy(href, data[first]);
	}
    }

    function callFeatured(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	var href = this.getAttribute('href');
	if (isOmnitureExists())
	{
	    sCode.trackFeaturedContentClick(href, data[first]);
	}
    }

    function callPage(evt) {
	var data = this.getAttribute(datatrackingstr).split(' ');
	var href = this.getAttribute('href');
	if (isOmnitureExists())
	{
	    sCode.trackPageView(data[first] + ".html", '');
	}
    }

    function isOmnitureExists() {
	if (typeof(sCode) == 'object') {
	    return true;
	}

	false;
    }
}

function createGallery() {
    var galleryviewport = document.getElementById('galleryviewport');
    var photosperpage = 6;

    if (galleryviewport) {
	var gallery = document.getElementById('gallery');
	var controls = document.getElementById('controls');
	var galleryclassname = gallery.getAttribute('class');

	if (gallery && controls && typeof(Gallery) == 'function') {
	    g = new Gallery(gallery, photosperpage, controls);
	}
    }
}

function createVideoGallery() {
    var galleryviewport = document.getElementById('videoviewport');
    var photosperpage = 1;

    if (galleryviewport) {
	var gallery = document.getElementById('videogallery');
	var controls = document.getElementById('videocontrols');
	var galleryclassname = gallery.getAttribute('class');

	if (gallery && controls && typeof(Gallery) == 'function') {
	    g = new Gallery(gallery, photosperpage, controls);
	}
    }
}



/* TICKETING WIDGET */

function addTicketingWidget(releaseDate) {

    var dateSelector = new mobileDateSelector(releaseDate);
    document.getElementById('search-btn').addEventListener("click", function(e) {
	try {
	    sCode.trackFeaturedContentClick(window.location, e.currentTarget.getAttribute("data-tracking"));
	    e.preventDefault();
	    doShowtimeSearch();
	}
	catch (err) {
	    console.log(err);
	}

	e.preventDefault();
    }, false);


    dateSelector.createMonth();
    dateSelector.createDays();
    dateSelector.createYear();

}

function doShowtimeSearch() {

    validateZip = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/;
    var zip = document.getElementById('formzip').value;

    if (!zip.match(validateZip)) {
	alert('Please enter a valid zip code.');
	document.getElementById('formzip').focus();
	return false;
    }

    var dObj = document.getElementById('day');
    var d = dObj.options[dObj.selectedIndex].value.split("/");

    var showtime = {
	url: "showtimes/index.html", //http://www.sonypictures.com/movies/herecomestheboom/mobile/showtimes/index.html
	movie: "69",
	zip: zip,
	month: d[0],
	day: d[1],
	year: d[2]
    };

    var showtimeFullPath = showtime.url + "?zip=" + showtime.zip + "&month=" + showtime.month + "&day=" + showtime.day + "&year=" + showtime.year + "&movie=" + showtime.movie;


    //sCode.trackFeaturedContentClick(showtimeFullPath, "mobile_showtimeswidget_search_button");  


    //window.location = showtimeFullPath;
    window.open(showtimeFullPath);
}

var mobileDateSelector = function(releaseDate) {

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.d = (new Date().getTime() > new Date(releaseDate).getTime()) ? new Date() : new Date(releaseDate); //use the current date but only if its past the release date

    this.createDates = function(el, days, selectid) {
	el = el || 'dateselector'; //what element to render the container in
	days = days || 7; //how many days to show
	selectid = selectid || 'formdate'; //whatever the id of this field will be

	var dateHtml, i, curDate;
	var d = this.d;

	curDate = new Date();
	dateHtml = '<select name="' + selectid + '" id="' + selectid + '">';

	for (i = 0; i <= days; i++) {
	    if (Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() == Number(curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()) { //if its the current date 
		dateHtml += "<option value=\"" + Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "\">Today, " + this.months[d.getMonth()] + " " + d.getDate() + "</option>\n";
	    } else {
		dateHtml += "<option value=\"" + Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "\">" + this.weekdays[d.getDay()] + ", " + this.months[d.getMonth()] + " " + d.getDate() + "</option>\n";
	    }
	    d = new Date(d.getTime() + 86400000); //move timestamp forward a day
	}

	dateHtml += '</select>';
	document.getElementById(el).innerHTML = dateHtml;
    }

    this.createDays = function(el, days, selectid) {
	el = el || 'day'; //what element to render the container in
	days = days || 7; //how many days to show
	selectid = selectid || 'day'; //whatever the id of this field will be

	var dayHtml, i, curDate;
	var d = this.d;

	curDate = new Date();


	for (i = 0; i <= days; i++) {
	    if (Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() == Number(curDate.getMonth() + 1) + "/" + curDate.getDate() + "/" + curDate.getFullYear()) { //if its the current date 
		dayHtml += "<option value=\"" + Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "\">Today, " + d.getDate() + "</option>\n";
	    } else {
		dayHtml += "<option value=\"" + Number(d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + "\">" + this.weekdays[d.getDay()] + ", " + d.getDate() + "</option>\n";
	    }
	    d = new Date(d.getTime() + 86400000); //move timestamp forward a day
	}

	document.getElementById(el).innerHTML = dayHtml;


    }


    this.createMonth = function(el, days, selectid) {
	el = el || 'month'; //what element to render the container in
	days = days || 7; //how many days to show
	selectid = selectid || 'month'; //whatever the id of this field will be

	var monthHtml, i, curDate;
	var d = this.d;

	curDate = new Date();

	var checkingMonth = d.getMonth() + 1;

	monthHtml += "<option value=\"" + Number(d.getMonth() + 1) + "\">" + this.months[d.getMonth()] + "</option>\n";

	for (i = 0; i <= days; i++) {

	    var curMonth = d.getMonth() + 1;

	    if (curMonth != checkingMonth) {
		monthHtml += "<option value=\"" + Number(d.getMonth() + 1) + "\">" + this.months[d.getMonth()] + "</option>\n";
		checkingMonth = curMonth;
	    }
	    d = new Date(d.getTime() + 86400000); //move timestamp forward a day
	}


	document.getElementById(el).innerHTML = monthHtml;


    }

    this.createYear = function(el, days, selectid) {


	el = el || 'year'; //what element to render the container in
	days = days || 7; //how many days to show
	selectid = selectid || 'year'; //whatever the id of this field will be

	var yearHtml, i, curDate;
	var d = this.d;

	curDate = new Date();

	var checkingYear = d.getFullYear();

	yearHtml += "<option value=\"" + d.getFullYear() + "\">" + d.getFullYear() + "</option>\n";

	for (i = 0; i <= days; i++) {
	    var curYear = d.getFullYear();
	    if (curYear > checkingYear) {
		yearHtml += "<option value=\"" + d.getFullYear() + "\">" + d.getFullYear() + "</option>\n";
		checkingYear = curYear;
	    }
	    d = new Date(d.getTime() + 86400000); //move timestamp forward a day
	}


	document.getElementById(el).innerHTML = yearHtml;

    }


}


window.addEventListener('load', init, false);