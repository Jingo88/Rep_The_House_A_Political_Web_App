# Rep The House

**Rep The House** is a political web application. Its purpose is to provide it's users easier access to information on the current legislators in the United States House of Representatives. The current APIs allow us to filter through information with regards to the current bills legislators are sponsoring, and the donations they have received. 

This web application pulls from two seperate API keys using an Express.js server. I clear through the JSON information using mostly vanilla JS with some jQuery. The bubble chart is done in D3, and the styling in CSS and BootStrap. This is a Single Page Application where the user makes AJAX GET requests to the server that will grab the data from the APIs and return them as JSON files. 

## Different Files

### index.ejs
Did not write many lines of code in this file. Used to hold static information, and the script tags. This is a Single Page Application with DOM manipulation all within the JS files

### style.css
The CSS file... 

### define.js
This file was used to create elements, and the smaller basic functions that I will be calling in the main.js file

### main.js
This is the main file that holds almost all the DOM manipulation. The functions that call the server, and create/use the elements are written first. The event listeners for the buttons and input boxes are located at the end of the script file. 

### d3style.js
Creates the D3.js bubble chart. This chart adapts it's size and numbers to each new array of data, which will come when new legislators are searched and donation information is requested.

### server.js
This is not a pure CRUD application because the data is coming in from API's and do not have to be altered by the user. All of the requests are GET request, that pull json data from two different political APIs.

### vendor files
Only one outside source is being used and that is "BootStrap." I have not user any specific BootStrap template but the core styling looks pretty enough for me. 

### Hosting on Digital Ocean

##### Ports 
On your server you should set the "app.listen" to port 80 so users visiting your site do not have to declare a port number

##### API Keys
Using scp (Secure Copy) you can push your API keys to your Digital Ocean box without going through Github. 