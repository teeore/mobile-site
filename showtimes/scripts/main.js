function generateDates(releaseDate, daysToShow) {

	var startTime;
	 
	var curDate = new Date();
	
	var formattedDate = formatDateToHashDate(curDate);	
	
	
	if (releaseDate.length > 0) {
		 
		 if (compareDates(curDate, releaseDate)) { //ensure it always starts at least at the release date
			 startTime = releaseDate;
			  
		 } else {
		     startTime = formattedDate;
			  
		 }
		 
	}
     
	if (!daysToShow) { daysToShow = 7; } 
	
	startTime = new Date(startTime.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")); 
	 
    
	var datesArray = [];
	var valuesArray = [];
	var str = 'Today';
	
	var date = new Date();
	  
	date.setDate(startTime.getDate());
	date.setMonth(startTime.getMonth()); 
	date.setYear(startTime.getFullYear()); 
	
	
	for (var i = 0; i <= daysToShow; i++) {	
		
		var value = formatDateToHashDate(date);  
	
        if (date.getTime() == curDate.getTime()) {
			datesArray.push(str + ", " + MonthAsString(date.getMonth()) + " " + date.getDate());
			
        } else {
			datesArray.push(DayAsString(date.getDay()) + ", " + MonthAsString(date.getMonth()) + " " + date.getDate());
        } 		
		
        valuesArray.push(value);
		date = new Date(date.getTime() + 86400000); //move timestamp forward a day
		
    }
	
	
	if (datesArray.length > 0 && valuesArray.length > 0) {
		outputDates(datesArray, valuesArray);
	}
	
}


function formatDateToHashDate(date) {

    var d  = date.getDate();
	var curDay = (d < 10) ? '' + d : d;
	
	var m = date.getMonth() + 1;
	var curMonth = (m < 10) ? '' + m : m;
	
	var yy = date.getYear();
    var curYear = (yy < 1000) ? yy + 1900 : yy;
	
	var formattedDate = curMonth + "/" + curDay + "/" + curYear;
	return formattedDate;

}


function outputDates(dates, values) {
	
	var dates = dates;
	var values = values;
	
	var outputStr = "";
	var datesList = document.getElementById('date');
	
	for (var i = 0; i < dates.length; i++) {
		outputStr += '<option value="' + values[i] + '">' + dates[i] + '</option>';
	}
	
	datesList.innerHTML = outputStr;
	
}


function compareDates(today, release) {

   
  var result = dates.compare(today, release);
  
  if (result > 0 ) {
      return false;
  } else {
	  return true;
  } 
  
  
  /*function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[2], parts[1]-1, parts[0]); // months are 0-based
  }

  if (parseDate(today) < parseDate(release)) {
     return false;
  } else {
	 return true;
  }
  */
    
}


var dates = {

    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

function MonthAsString(monthIndex) {

    var d = new Date();
	
    var month = new Array();
	
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    return month[monthIndex];
}

function DayAsString(dayIndex) {

    var weekdays = new Array(7);
	
    weekdays[0] = "Sun";
    weekdays[1] = "Mon";
    weekdays[2] = "Tue";
    weekdays[3] = "Wed";
    weekdays[4] = "Thu";
    weekdays[5] = "Fri";
    weekdays[6] = "Sat";

    return weekdays[dayIndex];
}


function updateSelectedDay(day) {
   
	var selDay = day;
	var sel = document.getElementById('date');
	var allDays = document.getElementById('date').options;
	 
	
	for (i=0; i<allDays.length; i++) {
		var val = allDays[i].value;
		
		if(val == selDay) {
			  console.log('match', day)
			  sel.selectedIndex = i;
		}
	}
	 
	
}

function isiPad(){
    if( navigator.userAgent.match(/iPad/i) ){
	document.getElementById("viewport").setAttribute("content","width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0");
	document.getElementById("head").style.backgroundImage="url('images/header_ipad.jpg')";
	document.getElementById("head").style.backgroundPosition="center top";
	document.getElementById("head").style.backgroundRepeat = "no-repeat";
	document.getElementById("search-bar").style.backgroundImage="url('images/bg-showtimes-header-ipad.gif')";
	document.getElementById("search-bar").style.backgroundPosition="left center"; 
	
	document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
    }
}

function isNotiPad(){

    if( navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/BlackBerry/)
	){
	/*document.getElementById("viewport").setAttribute("content","width=device-width, maximum-scale=2.0, minimum-scale=.5, user-scalable=yes");*/
	document.getElementById("viewport").setAttribute("content","width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0"); 
	document.getElementById("head").style.backgroundPosition="center top";
	document.getElementById("search-bar").style.backgroundPosition="center bottom";
	document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
	
    }
}

function isOmnitureExists(){
    if(typeof(sCode)=='object'){
	return true;
    }
    false;
}
function onDateClick(href){
    if (isOmnitureExists())
    {
	var domain = href.match(/:\/\/(.[^/]+)/)[1];
	if(domain == "www.movietickets.com"){
	    sCode.trackOutboundClickToBuy(href, "movietickets_showtimeswidget");
	}
	else if(domain == "mobile.fandango.com"){
	    sCode.trackOutboundClickToBuy(href, "fandango_showtimeswidget");
	}
    }
    window.open(href);
}



function formatDate(month, day, year){

    switch(month)
    {
	case '1':
	    month = "JANUARY";
	    break;
	case '2':
	    month = "FEBRUARY";
	    break;
	case '3':
	    month = "MARCH";
	    break;
	case '4':
	    month = "APRIL";
	    break;
	case '5':
	    month = "MAY";
	    break;
	case '6':
	    month = "JUNE";
	    break;
	case '7':
	    month = "JULY";
	    break;
	case '8':
	    month = "AUGUST";
	    break;
	case '9':
	    month = "SEPTEMBER";
	    break;
	case '10':
	    month = "OCTOBER";
	    break;
	case '11':
	    month = "NOVEMBER";
	    break;
	case '12':
	    month = "DECEMBER";
	    break;
    }
	
    return month + " " + day + ", " + year;
}

var search_results;
var striptoggle = 'even';
function showResults(xml){
    if($(xml).find('showtime').length != 0){
	
	search_results = '<table cellspacing="0" cellpadding="0">';
		
	$.each($(xml).find('theater'), function(){
	    var name = $(this).find('name').text();
			
	    if(striptoggle=="even"){
		striptoggle = "odd";
	    }else{
		striptoggle = "even";
	    }
	    search_results += '<tr class="listing '+striptoggle+'">';
	    search_results += '<td class="theater-name" valign="middle">'+name+'</td>';
	    search_results += '<td class="times">';
			
	    $.each($(this).find('showtime'), function(){
		var url = $(this).attr('url');
		var time = $(this).text();
				
		search_results += '<li><a style="cursor:pointer" onClick="onDateClick(\''+url+'\')">'+time+'</a></li>';
	    });
			
	    search_results += '</td></tr>';
	
	});
		
	search_results += '</table>';
	$('#listings').html(search_results);
    }
    else{
	var dateArr = $('#date').val().split("/");
	$('#listings').html('<span class="no-listings">There are no showtime listings for '+formatDate(dateArr[0], dateArr[1], dateArr[2])+'.</span>');
    }
}

function submitSearch(zip, month, day, year){
    $.ajax({
	type: 'POST',
	dataType: "html",
	url: fetchphp,
	data: "zip="+zip+"&month="+month+"&day="+day+"&year="+year+"&movie="+movie+"&result=mobile",
	success: function(xml){
	    showResults(xml);
	},
	error: function(data){
	    $('#listings').html('<span class="error">An error occurred while retrieving showtimes. Please try again.</span>');
	}
    });

}

function doSearchValidation(){
    if($('#zip').val().match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/)){
	var dateArr = $('#date').val().split("/");
	//console.log("The Date data is " + dateArr);
	$('#listings').html('<img src="images/loader.gif" class="loading" alt="Loading, please wait..." />');
	$('#search-desc').removeClass('hidden');
	$('#search-date').html(formatDate(dateArr[0], dateArr[1], dateArr[2]));
	submitSearch($('#zip').val(), dateArr[0], dateArr[1], dateArr[2]);
    }
    else{
	$('#listings').html('<span class="error">Zip Code is invalid. Please correct the problem and try again.</span>');
	$('#search-desc').addClass('hidden');
    }
}

function onClickSearchValidation(){
    if (isOmnitureExists())
    {
	var dateArr = $('#date').val().split("/");
	sCode.trackFeaturedContentClick(fetchphp+"?zip="+$('#zip').val()+"&month="+dateArr[0]+"&day="+dateArr[1]+"&year="+dateArr[2]+"&movie="+movie+"&result=mobile", "showtimeswidget_search_button");  
    }
    doSearchValidation();

}


function doAutoSearch(){
    validateZip = /(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/;

    var zip = $.getUrlVar('zip');
    var month = $.getUrlVar('month');
    var day = $.getUrlVar('day');
    var year = $.getUrlVar('year');	
	
    var month = encodeURI(month);
    var day = encodeURI(day);
    var year = encodeURI(year);
	
    if(zip.match(validateZip)) {
	var zip = encodeURI(zip);
    }
    else {
	var zip = '';
    }
	
    if((zip != "")&&
	(day != "")&&
	(month != "")&&
	(year != "")){
	$('#zip').val(zip);
	$('#zip').removeClass("def-blur");
		
	doSearchValidation();
    }
    else if(zip != ""){
	$('#zip').val(zip);
	$('#zip').removeClass("def-blur");
		
	doSearchValidation();
    }else{
	$('#zip').val('Zip Code');
	$('#listings').html('<span class="directions">Please enter a zip code and date above and click <em>Search</em></span>');
    }
}
function extendUrlParam(){
    $.extend({
	getUrlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0, len=hashes.length; i < len; i++)
	    {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	    }
	    return vars;
	},
	getUrlVar: function(name){
	    if($.getUrlVars()[name])
	    {
		return $.getUrlVars()[name];
	    }
	    else{
		return "";
	    }
	}
    });
}

function checkTracking() {

    var allLinks = document.getElementsByTagName('a');
	
	for(var i=0,iCounter=allLinks.length;i<iCounter;i++){
	
	     if(allLinks[i].getAttribute('rel') == 'outbount-click') {
		    
			var link =  allLinks[i];
		 
		    $(link).click(function(e){
		 
				var url = e.currentTarget.getAttribute('href');
				var tracking = e.currentTarget.getAttribute('data-tracking');
			     
				if (sCode) { 
				    sCode.trackOutboundClick(url, tracking);
				}
				
			});
		 
		 }
		 
	}
	
}

$(document).ready(function(){

    extendUrlParam();
	
	generateDates(releaseDate, daysToShow);

	var url = window.document.URL.toString();
	
    if (url.indexOf("?") > 0) 
    {
	   movie =$.getUrlVar('movie');
	   var day = $.getUrlVar('day');
	   var month =$.getUrlVar('month');
	   var year = $.getUrlVar('year');
	   var zip = $.getUrlVar('zip');
	   
	   var selDay = month+"/"+day+"/"+year;
	   
	  
	   submitSearch(zip, month, day, year);
	   updateSelectedDay(selDay);
	   
	
	} 

	
    $('#zip').focus(function() {
	if($(this).val() == "Zip Code"){
	    $(this).val("");
	    $(this).removeClass("def-blur");
	}
    });

    $('#zip').blur(function() {
	if($(this).val() == ""){
	    $(this).val("Zip Code");
	    $(this).addClass("def-blur");
	}
    });
	
    doAutoSearch();
	checkTracking();
	

	
});

function init() {

    setTimeout(function() {
	window.scrollTo(0, 1);
    }, 100);
    if (navigator.userAgent.match(/Android/i)) {
	document.body.className = "android";
    }
    else if (navigator.userAgent.match(/iPhone/i)) {
	document.body.className = "ios";
    }
    else {
	document.body.className = "";
    }
	
	 
    isiPad();
    isNotiPad();
	
	
     Cufon.replace('.cufon', { fontFamily: 'HelveticaNeueLTStd-Md' });
//Cufon.replace('.cufon2', { fontFamily: 'FuturaStd-Medium' });
//Cufon.replace('.cufon3', { fontFamily: 'Futura Std' });
	
}

window.addEventListener('load', init, false);