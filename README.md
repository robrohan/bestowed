# Bestowed

Bestowed is a _simple_ framework for creating presentations out of org-mode files.  Org-mode is an outlining mode inside of emacs.

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

## Building

    $ npm install -g grunt
    $ npm install
    $ grunt

The output should be in the build directory.
