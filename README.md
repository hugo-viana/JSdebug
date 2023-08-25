# :page_with_curl: JSDebug

## Description

Here we have a very simple and very basic script to output console log entries to an html element.

The idea was not to develop a "master piece", but only to find a "simple and effective" workaround for the security measures implemented in some  companies (like mine), where they have restricted access to console devops in all web browsers, and therefore we are blind to the live log outputs.

## How to use it

1. Create the html element where you'll want to send the console log:

    ```html
    <body>
    <div id="logDiv"></div>
    </body>
    ```

    It doesn't matter where you locate the div just as long as it's inside the body tag and prior to any script tag.

1. Place a the following script blocks prior to any other script blocks:

    ```html
    <script src="../src/jsdebug.js"></script>
    <script>
        let logDiv = document.getElementById("logDiv");
        console = new HTMLLogger(logDiv);
    </script>
    ```

    :warning: If you have other scripts prior to these 2, all console log entries will go to the standard browser log instead of your html element.

1. (**optional**) If you want to use the out-of-the-box styling, you'll have to import it, as well as a font-awesome style package:

    ```html
    <head>
        <link rel="stylesheet" href="../src/jsdebug.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer">
    </head>
    ```

The **JSDebug** links provided in this example are local paths. If you want to use the public links, my recommendation is that you use [jsdelivr for GitHub](https://www.jsdelivr.com/github).

For example, to use the latest **JSDebug** available version, use:
- :link: CSS: https://cdn.jsdelivr.net/gh/hugo-viana/JSdebug@master/src/jsdebug.css
- :link: JS: https://cdn.jsdelivr.net/gh/hugo-viana/JSdebug@master/src/jsdebug.js

## Limitations

The standard [console API](https://developer.mozilla.org/en-US/docs/Web/API/console) allows for several additional methods that this package doesn't support (at the moment). The only known methods for this package are:
- console.log()
- console.error()
- console.warn()
- console.info()
- console.debug()

## Collaboration

I don't think this is one of the most worthy repositories for you to invest into, but if you have and idea or a new feature proposal, please feel free to open an issue in this repo.
