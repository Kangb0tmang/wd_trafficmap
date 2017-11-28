# Traffic Map
> Code Test for Wave Digital
_____

## Installation Instructions
1. Clone the repository to your device. https://github.com/Kangb0tmang/wd_trafficmap

2. Navigate to the root fo the folder and run: 
```
npm install
```
3. Install node if you don't have it on your device: https://nodejs.org/en/download/

4. Start up the server on port 8000. http://localhost:8000/

## Troubleshooting
- scripts in package.json should be:
```
"scripts": {
    "start": "nodemon app.js",
    "build-css": "node-sass --include-path scss scss/main.scss   public/css/main.css",
    "watch-css": "nodemon -e scss -x \"npm run build-css\""
  },
```
- dependencies should be:
```
"devDependencies": {
    "express-compile-sass": "^3.0.4",
    "node-sass": "^4.7.2",
    "nodemon": "^1.12.1"
  },
  "dependencies": {
    "ejs": "^2.5.7",
    "express": "^4.16.2",
    "request": "^2.83.0"
  }
```
- Port assigned to 8000 or another one you like in app.js:
```
const PORT = 8000;
app.listen(PORT);
```
- If no stying applied, open another tab in your terminal and run this code to start converting sass to css and watch for sass changes:
```
npm run build-css
npm run watch-css
```
- Update packages
_____
## Usage Instructions
- The default location is coordinates of Melbourne (according to Google). Can be changed in the code in map.js by changing the 'melbourne' variable on line 2
```
var melbourne = { lat: -37.8136, lng: 144.9631 };
```
- Same thing can be changed for default zoom level in map.js on line 3:
```
var zoomLevel = 16;
```
- Can also click the find my location button (have to allow permissions for Google otherwise it won't work).
- Click on any red marker to bring up the info window with the data for that incident.
- Click on a cluster (blue, yellow or red circle with a number on it indicating number of incidents in that area) to go to that area and view the individual incidents.
- Might be a bit slow due to loading the markers. Do a hard refresh on the page (```ctrl+shift+r```).

## Approach and Conceptual Overview 
- First was to decide whether to go with just plain javascript without any frameworks or choose a framework like node or react. I chose node as it was able to handle api requests and manage a single route (hope page). There wasn't a need to make custom elements in react.
- I tested whether I could pass the list of incidents to different .js files before I extracted the data I needed.
- Before I got the coordinates for the incidents for the markers I used the demo Google Maps Cluster API to get it appearing on the screen before proceeding.
- I extracted the data I needed by outputting it on the page and the console and then putting it in the Maps API and incident list.

## Technology and Frameworks Used
- Google Maps Javascript API - Cluster Markers
- Google Maps Geocoding
- Node JS with Express
- SASS
- Material Design Lite framework

## Assumptions
- That a user would want to view the incidents in their vicinity so I added the find my location button.

## Design Decisions and Additional Features
- Added a find my current location button to find incidents within your vicinity. Though it wasn't a requirement, it made sense to be able to view incidents within your vicinity rather than the default location in the Melbourne CBD. 
- On mobile view, made the list appear below the list button rather than an overlay so you can view both list and map rather than have to close the list. Both options were practical and made sense but I had to choose one and went with showing the list not as an overlay.
- Chose the cluster marker API rather than listing out all 400+ markers which will slow down the load time even more. Though it's more clicks to get to the marker you want, it is easier to click on a marker rather than trying to click on one and click on the marker that is overlapping it.
- Made the list a vertical scrollbar on both desktop and mobile so it didn't expand the page vertically with the large number of markers populating the list.
- Using material design lite made styling easier with prebuilt templates, styles and elements such as the buttons to find my location and expand the list in mobile view.
- Would've liked to convert the plain javascript to jQuery for readability and less code but couldn't manage to get it to work.
- Used a blue marker for current location instead of the standard blue dot. Didn't manage to find it.
- Changed to mobile view at screen width of 812px for the iPhone X and phones with smaller screen sizes will be subsequently styled. Source was this guide: https://css-tricks.com/snippets/css/media-queries-for-standard-devices/

## Other Notes
- Some clusters have multiple icons in the same spot which didn't bring up the individual markers. There was an individual marker in the same spot with very similar information.

## Lessons Learnt and Further Improvements
- Use jQuery and/or underscore instead of just plain Javascript for code readability.
- Maybe add more colour to some elements.
- Add more media queries for tablet view.
_____

### Conclusion
Thank you Guy and David for giving me the opportunity to do the code test. I hope this README will give you insights to my thought process and decision making.
