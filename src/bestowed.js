var bestowed = bestowed || {};

(function(){
	"use strict";
	
	bestowed.current = 0;
	bestowed.maxSlides = 0;
	bestowed.slideCache = null;

	bestowed.init = function() {
		bestowed.slideCache = bestowed.slides();
		bestowed.maxSlides = bestowed.slideCache.length;
		bestowed.changeSlide(0);
		bestowed.current = 0;
	};
	
	bestowed.slides = function() {
		if(bestowed.slideCache) {
			return bestowed.slideCache;
		}
		return document.getElementsByClassName('outline-2');
	};
	
	bestowed.changeSlide = function(to) {
		if(to >= bestowed.maxSlides || to < 0) {
			return;
		}
		var current = document.getElementsByClassName('current');
		var previous = document.getElementsByClassName('previous');

		if(previous[0]) {
			bestowed.removeClass(previous[0], 'previous');
		}

		if(current[0]) {
			bestowed.replaceClass(current[0], 'current', 'previous');
		}
		
		bestowed.slides()[to].className += ' current';
		bestowed.current = to;
	};

	bestowed.nextSlide = function() {
		bestowed.changeSlide(bestowed.current + 1);		
	};

	bestowed.previousSlide = function() {
		bestowed.changeSlide(bestowed.current - 1);
	};
	
	bestowed.removeClass = function(element, theClass) {
		var re = new RegExp(theClass,"g");
		element.className = element.className.replace(re, '');
	};

	bestowed.replaceClass = function(element, origClass, newClass) {
		var re = new RegExp(origClass,"g");
		element.className = element.className.replace(re, newClass);
	};

	bestowed.handleClick = function(e) {
		if(e.altKey === true) {
			bestowed.previousSlide();
		} else {
			bestowed.nextSlide();
		}
		e.preventDefault();
		return false;
	};

	bestowed.handleKeyUp = function(e) {
		if(e.keyCode === 40 || e.keyCode === 39) {
			bestowed.nextSlide();
		} else if (e.keyCode === 38 || e.keyCode === 37) {
			bestowed.previousSlide();
		}
	};
})();

window.addEventListener("load", bestowed.init);
document.addEventListener("click", bestowed.handleClick);
window.addEventListener("keyup", bestowed.handleKeyUp);










