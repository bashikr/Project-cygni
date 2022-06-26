# Gallerio 
Gallerio is a full-stack application that presents images as a gallery. It utilizes the flickr.photos.search API in the backend, and present the data in the frontend. The backend is built using Node.js and Express to create a REST API. The frontend of the application is made using Vanilla JavaScript, HTML5, CSS3, Webpack, Babel.js, and Jest. It is responsive and works with the newest versions of Chrome, Firefox, and Edge.

## The application supports:
* Endless scroll.
* Persistence/caching on the server and client side.
* Automatized build with linting, concatenation and minifying.
* Availability rules like area, alternative for images, and keyboard navigation.
* Runs on docker and docker compose.

## How it works:

First navigate to the backend folder and add your Flickr API key to **FLICKR_API_KEY**  environment variable in the .env file. Now to be able to use it you have two choices:

1. Traditionally by navigating to the root of the back- and front-end folders and then run npm install (Node should be installed on your machine). Afterwards, run the command  npm start in the back- and frontend folders. Finally, navigate to http://localhost:8080 from your browser.

2. Using docker by navigating to the root of the project and then run:
 
    - docker-compose build
    - docker-compose up -d

Afterwards, navigate to http://localhost:8080 from your browser and the application will be there 😊.
