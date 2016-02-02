# Bestowed

Bestowed is some simple Javascript and CSS code for creating presentations out of org-mode files.  Org-mode is an outlining mode inside of emacs.

## Quick Start

If you look in the example directory, you will find an _example.org_ file.  Open this file in emacs 24, and type _C+c C+e_ then type _h h_.  The output of this process is _example.html_ in the same folder as the org file.  Open _example.html_ in your favourite browser.

## Slower than Quick Start, but Still Quick.

In an org-mode file, at the top of the file type: _C+c C+e #_ then type _html_.  Change the following values:

    ...
    #+OPTIONS: html-preamble:t html-scripts:nil html-style:nil
    ...
    #+HTML_DOCTYPE: <!doctype html>
    ...

And add the following:

    #+HTML_HEAD: <meta name="bestowed-theme" value="themes/default"><script async src="http://s3.amazonaws.com/cdn.robrohan.com/bestowed/bestowed.min.js"></script>

Then export the org file as html by doing: _C+c C+e_ then type _h h_.  Open the exported html in your favourite browser (as long as your favourite is the latest Chrome or Safari).

If you prefer, here is a [YouTube video](https://www.youtube.com/watch?v=S0Ley_QoBHo) about how Bestowed works.

## Code Layout

    .
    ├── Gruntfile.js      <- Build file
    ├── README.md         <- this file
    ├── build/            <- Build output
    ├── example/          <- Example Org and present file
    ├── node_modules/     <- npm makes this
    ├── package.json      <- package info for grunt
    ├── src/              <- all the source
    └── test/             <- all the awesome tests

## Theme Code Layout

Themes do not have to live within the code base, but if they do you can reference them with a relative path.

    src
      ├── bestowed.css    <- Main, core styles
      ├── bestowed.js     <- The code itself
      └── themes/         <- Themes directory
          ├── default/    <- Example Theme
          │   ├── css/
          │   └── js/
          └── webqem/     <- Custom Theme
              ├── assets/
              ├── css/
              └── js/

## Building the Javascript Code

You will need Node and grunt installed.  Node can be installed from the node [website](https://nodejs.org/en/) or by using your favourite package manager.  Once node is installed, npm (node package manager) should also be installed.   You should then be able to run the following commands:

    $ npm install -g grunt
    $ npm install -g mocha
    $ npm install
    $ grunt

The output should be in the build directory.

## Running tests

    $ mocha
