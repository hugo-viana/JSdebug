# :page_with_curl: JSDebug

## :speech_balloon: Description

Here we have a very simple and very basic script to output console log entries to an html element.

The idea was not to develop a "master piece", but only to find a "simple and effective" workaround for the security measures implemented in some  companies (like mine), where they have restricted access to console devops in all web browsers, and therefore we are blind to the live log outputs.

In the example provided below, I overwrite the console global variable with an `HTMLLogger` instance so that all console entries go straight to the `HTMLLogger`, but you can also case use the `HTMLLogger` as an additional logger to the console log.

For example, if you have a web app that performs certain actions and you want to display to the user all this actions, `HTMLLogger` could come in handy with some minor tweaks.

## :mag_right: How to use it

I'll explain it step by step but you can find a workable example in `test.html` file located in the `tests` folder of this repo.

1. At this moment (maybe i'll improve it later), this package has some parts that require `fontawesome` and `bootstrap`, so you must import it, as well as the `jsdebug.css` style file:

    ```html
    <head>
        <link rel="stylesheet" href="../src/jsdebug.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    </head>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
    </body>
    ```

1. Create the html element where you'll want to send the console log:

    ```html
    <div id="logDiv"></div>
    ```

    It doesn't matter where you locate the div just as long as it's inside the body tag and prior to any script tag (except the bootstrap script):

1. Place a the following script blocks prior to any other script blocks:

    ```html
    <script src="../src/jsdebug.js"></script>
    <script>
        console.log("Before activating HTMLLogger");
        let logDiv = document.getElementById("logDiv");
        console = new HTMLLogger(logDiv);
        console.log("After activating HTMLLogger");
    </script>
    ```

    :warning: If you have other scripts prior to these 2, all console log entries will go to the standard browser log instead of your html element.

The **JSDebug** links provided in this example are local paths. If you want to use the public links, my recommendation is that you use [jsdelivr for GitHub](https://www.jsdelivr.com/github).

For example, to use the latest **JSDebug** available version, use:
- :link: CSS: https://cdn.jsdelivr.net/gh/hugo-viana/JSdebug@master/src/jsdebug.css
- :link: JS: https://cdn.jsdelivr.net/gh/hugo-viana/JSdebug@master/src/jsdebug.js

## :test_tube: Additional options/features

- **Log Filter**

    If you want to be able to filter log entries by log level, you have to create a select element and an additional element (a `div` for instance) and register it into the `HTMLLogger` instance:

    HTML:
    ```html
    <body>
        <select id="selectLogLevels"></select><div id="selectedLogLevels"></div>
        <div id="logDiv"></div>
    </body>
    ```

    Javascript:
    ```javascript
    let selectLogLevels = document.getElementById("selectLogLevels");
    let selectedLogLevels = document.getElementById("selectedLogLevels");
    console.setLevelsController(selectLogLevels, selectedLogLevels);
    ```

## :no_entry: Limitations

The standard [console API](https://developer.mozilla.org/en-US/docs/Web/API/console) allows for several additional methods that this package doesn't support (at the moment). The only known methods for this package are:
- console.log()
- console.error()
- console.warn()
- console.info()
- console.debug()

## :bulb: Collaboration

I don't think this is one of the most worthy repositories for you to invest into, but if you have and idea or a new feature proposal, please feel free to open an issue in this repo.
