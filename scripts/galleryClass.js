/*
Params:
*******
imageContainer format:
<ul>
	<li><a href="largeImage.jpg"><img src="thumbImage.jpg" /></a></li>
</ul>

numbThumbs:
	0 - display all thumbs
	num - number of thumbs to display

galleryControl format, can be anywhere on the page:
<ul id="gallery-control">
	<li id="gallery-control-prev"><a href="#">previous </a></li>
	<li id="gallery-control-next"><a href="#">next</a></li>
</ul>

	
Additional function:
*******************
	changeMaxThumbsTo(newNumber);
	- useful for when different orientations have different number of thumbnails
	
Customization:
**************
customize transition animation through:
#gallery-large-image
#gallery-large-image.loaded 


*/

function Gallery(imageContainer, numThumbs, galleryControl){
	this.imageContainer = imageContainer;
	this.maxThumbsShown = numThumbs;
	this.imagesArray = new Array();
	this.imagesArrayDisplayType = "";
	this.galleryControl = galleryControl;
	
	this.init();
}

Gallery.prototype = {
	changeMaxThumbsTo: function (numThumbs) {
		this.maxThumbsShown = numThumbs;
		this.showThumbsForPage(0);
	},
	init: function () {
		this.imagesArray = this.imageContainer.getElementsByTagName("li");
		this.imagesArrayDisplayType = this.imagesArray[0].style.display;
		if(this.imagesArrayDisplayType == ""){
			this.imagesArrayDisplayType = "inline";
		}
		//TODO: cache large images
	
		this.initGalleryControls(this.galleryControl);
		this.initImageOverlayControls(this.imageContainer.getElementsByTagName("li"));
	},
	initGalleryControls: function (galleryControls) {
		var self = this;
		galleryControls.prevButton = this.galleryControl.getElementsByTagName("a")[0];
		galleryControls.nextButton = this.galleryControl.getElementsByTagName("a")[1];


		this.showThumbsForPage(0);
		galleryControls.prevButton.addEventListener("click",function(event){
			var prevPage = Number(self.galleryControl.getAttribute("page")) - 1;
			self.showThumbsForPage(prevPage);
			event.stopPropagation();
			event.preventDefault();
			return false;
		}, false);
		
		galleryControls.nextButton.addEventListener("click",function(event){
			var nextPage = Number(self.galleryControl.getAttribute("page")) + 1;
			self.showThumbsForPage(nextPage);
			event.stopPropagation();
			event.preventDefault();
			return false;
		}, false);
	},
	initImageOverlayControls: function (controls) {
		var self = this;
		var previousImage;
		var nextImage;
		var largeImagesArray = new Array();

		
		for (var i = 0 ; i < controls.length ; i++ ){
			var classname = controls[i].getElementsByTagName("a")[0].getAttribute('class');
			if(classname == null || classname.indexOf('activatedefaultclick') == -1){
				controls[i].getElementsByTagName("a")[0].onclick = function (event) {
					self.displayImageFor(this);
					if(event){
						event.stopPropagation();
						event.preventDefault();
					}
				};
			}
		}
		
		
	},
	showThumbsForPage: function (pageNum) {
		var startVisible = pageNum * this.maxThumbsShown;
		//console.log("startVisible is: " + startVisible);
		for ( var i = 0 ; i < this.imagesArray.length ; i ++ ){
			if ( i - startVisible >= 0 && i - startVisible < this.maxThumbsShown){
				this.imagesArray[i].style.display = this.imagesArrayDisplayType;
			}
			else {
				this.imagesArray[i].style.display = "none";
			}
		}
		this.galleryControl.setAttribute("page", pageNum);
		if (pageNum - 1 < 0 ){
			this.galleryControl.prevButton.style.visibility = "hidden";
		}
		else {
			this.galleryControl.prevButton.style.visibility = "visible";
		}
		
		if ((pageNum + 1)*this.maxThumbsShown >= this.imagesArray.length ){
			this.galleryControl.nextButton.style.visibility = "hidden";
		}
		else {
			this.galleryControl.nextButton.style.visibility = "visible";		
		}
	},
	displayImageFor: function (control) {

		var overlayexists = false;
		var galleryBackground = document.getElementById('gallery-large-image-background');
		if(galleryBackground){
			overlayexists = true;
		}else{
			galleryBackground = null;
		}

	 	function createNavLink(navId, text, title, onClickFunction){
			var nav = document.createElement("li");
			nav.setAttribute("id", navId);
			var link = document.createElement("a");
			link.innerHTML = text;
			link.setAttribute('title',title);
			link.addEventListener("click", onClickFunction, false);
			nav.appendChild(link);
			return nav;
		}
	
	 	var largeImage = new Image();
	 	largeImage.setAttribute("id","gallery-large-image");
	 	largeImage.src = control.getAttribute("href");
		var self = this;

		var imageNavigation = document.createElement("ul");
		imageNavigation.setAttribute("id","gallery-large-image-nav");
	
		var prevImageControl = control.parentElement?control.parentElement.previousElementSibling:control.parentNode.previousSibling.previousSibling;

		if(document.getElementById("gallery-previous-image")){
				document.getElementById("gallery-previous-image").setAttribute("id","");
		}

		if(prevImageControl) {
			prevImageControl.setAttribute("id","gallery-previous-image");
			previousImageNav = createNavLink('gallery-large-image-nav-prev', '<img src="styles/images/lang.png" />','previous', function(){
				document.getElementById("gallery-previous-image").getElementsByTagName("a")[0].onclick();
			});
			imageNavigation.appendChild(previousImageNav);	
		}

		var nextImageControl = control.parentElement?control.parentElement.nextElementSibling:control.parentNode.nextSibling.nextSibling;
		if(document.getElementById("gallery-next-image")){
			document.getElementById("gallery-next-image").setAttribute("id","");
		}
	
		if(nextImageControl){
			nextImageControl.setAttribute("id","gallery-next-image");
			var nextImageNav = createNavLink('gallery-large-image-nav-next', '<img src="styles/images/rang.png" />', 'next', function(){
				document.getElementById("gallery-next-image").getElementsByTagName("a")[0].onclick();
			});
			imageNavigation.appendChild(nextImageNav);	
		}
		
		var galleryBackgroundContainer = document.createElement("div");
		galleryBackgroundContainer.style.display = "table";
		galleryBackgroundContainer.style.height = "100%";
		galleryBackgroundContainer.style.width = "100%";
		galleryBackgroundContainer.style.position = "absolute";
		galleryBackgroundContainer.style.top = 0;
		galleryBackgroundContainer.style.left = 0;
		//galleryBackgroundContainer.style.background = "rgba(0,0,0,0.8)";
		galleryBackgroundContainer.style.zIndex = "6";
		
		var galleryBackgroundImageContainer = document.createElement("div");
		galleryBackgroundImageContainer.setAttribute("id","gallery-large-image-container");
		galleryBackground = document.createElement("div");
		galleryBackground.setAttribute("id","gallery-large-image-background");
		//galleryBackground.style.display = "table-cell";
		galleryBackground.style.verticalAlign = "middle";
		//galleryBackground.style.background = "rgba(0,0,0,0.8)";
		
		galleryBackgroundImageContainer.appendChild(galleryBackground);
		galleryBackground.appendChild(largeImage);	
		//galleryBackground.appendChild(imageNavigation);
		var videotag = document.createElement('video');
		videotag.setAttribute('width',1);
		videotag.setAttribute('height',1);
		galleryBackground.appendChild(videotag);

		largeImage.addEventListener("load", function(){
			largeImage.setAttribute("class", "loaded");

		}, false);

		galleryBackgroundContainer.appendChild(galleryBackgroundImageContainer);
		galleryBackgroundContainer.appendChild(imageNavigation);

		document.body.appendChild(galleryBackgroundContainer);
		
		galleryBackgroundContainer.addEventListener("click", function() {
			largeImage.setAttribute("class", "");//added to reduce flickering
			largeImage.addEventListener('webkitTransitionEnd',function(){
				document.body.removeChild(galleryBackgroundContainer);
			}, false);
			
		}, false);
	}
}