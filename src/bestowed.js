// Comment
var exports = exports || {};
var bestowed = bestowed || {};

(function() {
  'use strict';

  bestowed.current = 0;
  bestowed.maxSlides = 0;
  bestowed.slideCache = null;

  bestowed.cachedHead = null;
  bestowed.CSS_ENTRY = '/css/main.css';
  bestowed.JS_ENTRY = '/js/main.js';
  bestowed.CSS_FILE = 'bestowed.min.css';
  bestowed.fullPath = null;

  bestowed.init = function() {
    // cache the slides
    bestowed.slideCache = bestowed.slides();
    // and the length
    bestowed.maxSlides = bestowed.slideCache.length;
    // and the path to this script
    bestowed.fullPath = bestowed.scriptPath(document.getElementsByTagName('script'));

    bestowed.changeSlide(0);
    bestowed.current = 0;

    // Add some meta headers that org-mode export doesn't do
    bestowed.writeMeta({
      'charset': 'utf-8',
    });
    bestowed.writeMeta({
      'http-equiv': 'X-UA-Compatible',
      'content': 'IE=edge,chrome=1',
    });
    bestowed.writeMeta({
      'name': 'viewport',
      'content': 'width=device-width, initial-scale=1',
    });

    // Load the basic system css file
    bestowed.writeStyle(bestowed.fullPath + bestowed.CSS_FILE);

    // Try to load the theme specified in the org file
    var theme = bestowed.findThemePath();
    if (bestowed.isLocalPath(theme)) {
      theme = bestowed.fullPath + theme;
    }
    try {
      bestowed.writeStyle(theme + bestowed.CSS_ENTRY);
      bestowed.writeScript(theme + bestowed.JS_ENTRY);
    } catch (e) {
      console.log('Failed to load theme. ' + e);
    }
  };

  bestowed.isLocalPath = function(path) {
    if (path.toString().match(/^http/) || path.toString().match(/^file/)) {
      return false;
    }
    return true;
  };

  bestowed.scriptPath = function(scriptsArray) {
    if (bestowed.fullPath) {
      return bestowed.fullPath;
    }
    var givenPath = scriptsArray[scriptsArray.length - 1].src;
    var parts = givenPath.split('/');
    parts.pop();
    var newPath = parts.join('/');
    return newPath + '/';
  };

  bestowed.writeStyle = function(path) {
    bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', path);
    bestowed.cachedHead.appendChild(link);
  };

  bestowed.writeScript = function(path) {
    bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', path);
    bestowed.cachedHead.appendChild(script);
  };

  bestowed.writeMeta = function(settings) {
    bestowed.cachedHead = bestowed.cachedHead || document.getElementsByTagName('head')[0];
    var meta = document.createElement('meta');

    for (var k in settings) {
      if (settings.hasOwnProperty(k)) {
        meta.setAttribute(k, settings[k]);
      }
    }

    bestowed.cachedHead.appendChild(meta);
  };

  bestowed.findThemePath = function() {
    var metas = document.getElementsByTagName('meta');
    var mlen = metas.length;
    for (var x = 0; x < mlen; x++) {
      var metaName = metas[x].getAttribute('name');
      if (metaName === 'bestowed-theme') {
        return metas[x].getAttribute('value');
      }
    }
  };

  bestowed.slides = function() {
    if (bestowed.slideCache) {
      return bestowed.slideCache;
    }
    return document.getElementsByClassName('outline-2');
  };

  bestowed.changeSlide = function(to) {
    if (to >= bestowed.maxSlides || to < 0) {
      return;
    }
    var current = document.getElementsByClassName('current');
    var previous = document.getElementsByClassName('previous');

    if (previous[0]) {
      bestowed.removeClass(previous[0], 'previous');
    }

    if (current[0]) {
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
    var re = new RegExp(theClass, 'g');
    element.className = element.className.replace(re, '');
  };

  bestowed.replaceClass = function(element, origClass, newClass) {
    var re = new RegExp(origClass, 'g');
    element.className = element.className.replace(re, newClass);
  };

  bestowed.handleKeyDown = function(e) {
    if (e.keyCode === 40 || e.keyCode === 39 | e.keyCode === 32 | e.keyCode === 74) {
      bestowed.nextSlide();
      e.preventDefault();
      return false;
    } else if (e.keyCode === 38 || e.keyCode === 37 || e.keyCode === 8 || e.keyCode === 75) {
      bestowed.previousSlide();
      e.preventDefault();
      return false;
    }
  };

  bestowed.register = function() {
    if (typeof (window) !== 'undefined') {
      // Register our listeners
      window.addEventListener('load', bestowed.init);
      // document.addEventListener('click', bestowed.handleClick);
      window.addEventListener('keydown', bestowed.handleKeyDown);
    }
  };
})();

bestowed.register();

exports.bestowed = bestowed;
