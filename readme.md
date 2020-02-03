# Timeout

![Icon Timeout](src/img/sablieractive.png)

**Tags** : extension, chrome, timer, pomodoro, timeout

**Installation** : [Download](https://drive.google.com/open?id=1KZeOURkgLRXYMrtFFwwziJpOxntIQsiX) or clone the repository and package the extension directly in the browser extension options
- more tools -> extension -> activate developer mode -> load the unpackaged extension

A chrome extension that incorporates some of the basics of the pomodoro timer.

I created this extension to refine my acquired skills and learn how to create web extensions.

## Description
Once the extension is installed, just click on the icon for the timer to start. Once the timer reaches 0, a page opens asking you to start the pause or to stop the timer.

By default the working time is 2 hours for 25 minutes break.

Options are available to modify the working time and the pause time. To access it, you can right click on the icon and click on 'Options', a menu will open in a new tab.

## Contents

- **manifest.json**: it is mandatory for the creation of any browser extension
- **Backgournd.js**: JavaScript script that runs in the background. Useful for using the chrome extension API
- 2 html files **work.html** and **paused.html** : These pages allow you to activate the break or work timer
- **options.html** and **options.js** : Manage the timer options. the script is related to the **background.js** script
  
## Todo's
1. change the language (Defaut French)
2. Adapt it for multiple browsers
3. Add extension to chrome store (non international card problem)

## Authors
- Killian Thevenin - personnal project