# Google Books API React Search

A Google Books API query application that demonstrates a MERN stack with React, Express, Mongo DB and NodeJS. 

try it at:  https://mbg-nyt--reactsearch.herokuapp.com  

## Overview    
 Functionally it provides means to use the Google API to find books.   Its overall features include two main pages:  

 Search Page:  
 1) A search box to query Google Books based on keyword  
 2) A results list of found books, thumbnails, authors and a short description of each  
 3) A View button to redirect the browser to the Google book page  
 4) A save button that writes the book summary and key links to a MongoDB database  

 Saved Page:  
 1) On load, displays the summary of any saved books  
 2) A results list of saved books, thumbnails, authors and a short description of each  
 3) A View button to redirect the browser to the Google book page  
 4) A delete button that removes the book from the MongoDB database  
 
 ## Demonstration of Functionality    
![Google Book Search](./docs/Looney-Tunes-Clicky-Game.gif)  

## Developer notes  
- **.gitignore.** - ubiquitous git file to keep node modules and passwords out of GIT    
- **client/...** - the React application with the starting App.js logic    
- **controllers/...** - middleware calls to the Mongoose Model API  
- **models/..** - the Mongoose database API schema objects    
- **routes/..** - the express HTTP routes  
- **scripts/..** - script to load the database with sample data
- **server.js** - the express server and entry point for the back-end server application    

## How to install/run the application    
1. Download and install the latest version of Node.js following the website instructions for your platform    
   ` https://nodejs.org/en/download/`   
2. Clone this repository into a clean diretory  
   `$ git clone <repository url>`  
3. Bring down the latest package dependencies using node package manager    
   `npm install`    
4. Use Node to start the application and load the browser at http://localhost:3000      
   `npm start`    

## Technology Used  
    
| Package/Interface | Version     | Description                                                              |
| ----------------- | ----------- | ------------------------------------------------------------------------ |
| React.js          | __16.8.1__  | Main javascript engine for this application                              |
| Axios             | __0.18.0__  | Library used to make aynchronous calls over the web                      |
| Dotenv            | __6.2.0__   | Package used to keep private keys out of Git                             |
| Express           | __4.16.3__  | The workhorse web server provider                                        |
| if-env            | __1.0.4__   | Package used simplify startup scripts basd on environments               |
| Mongoose          | __5.3.16__  | Package to conifgure schemas and interface with MongoDB                  |
  
## Authors    
Michael Galarneau - Initial work - five0ffour  
February, 2019  
  
## Acknowledgements    
Heroku - an Amazon hosted cloud deployment framework  

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
