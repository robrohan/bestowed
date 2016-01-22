var bestowed = bestowed || {};

(function(){
	"use strict";
	
	bestowed.current = 0;
	bestowed.maxSlides = 0;
	bestowed.slideCache = null;

	bestowed.cachedHead = null;
	bestowed.CSS_ENTRY = '/css/main.css';
	bestowed.JS_ENTRY = '/js/main.js';

	bestowed.init = function() {
		bestowed.slideCache = bestowed.slides();
		bestowed.maxSlides = bestowed.slideCache.length;
		bestowed.changeSlide(0);
		bestowed.current = 0;
		
		bestowed.writeMeta({'charset':'utf-8'});
		bestowed.writeMeta({'http-equiv':'X-UA-Compatible', 'content':"IE=edge,chrome=1"});
		bestowed.writeMeta({'name':"viewport", 'content':"width=device-width, initial-scale=1"});
		
		bestowed.writeStyle('bestowed.css');
		var theme = bestowed.findThemePath();
		bestowed.writeStyle(theme + bestowed.CSS_ENTRY);
		bestowed.writeScript(theme + bestowed.JS_ENTRY);
	};
	
	bestowed.writeStyle = function(path) {
		bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName("head")[0];
		var link = document.createElement('link');
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", path);
		bestowed.cachedHead.appendChild(link);
	}
	
	bestowed.writeScript = function(path) {
		bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName("head")[0];
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", path);
		bestowed.cachedHead.appendChild(script);
	}
	
	bestowed.writeMeta = function(settings) {
		bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName("head")[0];
		var meta = document.createElement('meta');
		
		for(var k in settings) {
			meta.setAttribute(k, settings[k]);
		}
		
		bestowed.cachedHead.appendChild(meta);
	}
	
	bestowed.findThemePath = function() {
		var metas = document.getElementsByTagName("meta");
		var mlen = metas.length;
		for(var x=0; x<mlen; x++) {
			var metaName = metas[x].getAttribute('name');
			if(metaName === 'bestowed-theme') {
				return metas[x].getAttribute('value');
			}
		}
	}
	
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
		if(e.keyCode === 40 || e.keyCode === 39 | e.keyCode === 32) {
			bestowed.nextSlide();
		} else if (e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 8) {
			bestowed.previousSlide();
		}
	};
})();

window.addEventListener("load", bestowed.init);
document.addEventListener("click", bestowed.handleClick);
window.addEventListener("keyup", bestowed.handleKeyUp);
