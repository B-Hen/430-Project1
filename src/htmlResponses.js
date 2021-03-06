const { ADDRGETNETWORKPARAMS } = require('dns');
const fs = require('fs'); // pull in the file system module
const { getDefaultSettings } = require('http2');

// get the pages needed as endpoints
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const CSS = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const appCSS = fs.readFileSync(`${__dirname}/../client/app.css`);
const indexCSS = fs.readFileSync(`${__dirname}/../client/index.css`);
const addCSS = fs.readFileSync(`${__dirname}/../client/add.css`);
const adminCSS = fs.readFileSync(`${__dirname}/../client/admin.css`);
const errorCSS = fs.readFileSync(`${__dirname}/../client/error.css`);
const app = fs.readFileSync(`${__dirname}/../client/app.html`);
const home = fs.readFileSync(`${__dirname}/../client/index.html`);
const add = fs.readFileSync(`${__dirname}/../client/add.html`);
const admin = fs.readFileSync(`${__dirname}/../client/admin.html`);
const picture = fs.readFileSync(`${__dirname}/../client/budget.png`);
const error = fs.readFileSync(`${__dirname}/../client/error.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/Documentation.html`);
const documentationCSS = fs.readFileSync(`${__dirname}/../client/Documentation.css`);

// get an error Page
const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' }); // send response headers
  response.write(errorPage); // send content
  response.end(); // close connection
};

// get the default style page
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(CSS); // send content
  response.end(); // close connection
};

// get the Css for the app page
const getAppCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(appCSS); // send content
  response.end(); // close connection
};

// get the css for the index page
const getIndexCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(indexCSS); // send content
  response.end(); // close connection
};

// get the css for the add page
const getaddCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(addCSS); // send content
  response.end(); // close connection
};

// get the css fir the admin page
const getAdminCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(adminCSS); // send content
  response.end(); // close connection
};

// get the css for the error page
const getErrorCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(errorCSS); // send content
  response.end(); // close connection
};

// get the css for the documentation page
const getDocCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' }); // send response headers
  response.write(documentationCSS); // send content
  response.end(); // close connection
};

// get the App Page
const getJokes = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(app); // send content
  response.end();
};

// get the Home page
const getHomePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(home); // send content
  response.end();
};

// get the error Page
const getErrorPage = (request, response) => {
  response.writeHead(400, { 'Content-Type': 'text/html' }); // send response headers
  response.write(error); // send content
  response.end();
};

// get the Add page
const AddPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(add); // send content
  response.end();
};

// get the admin page
const getAdmin = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(admin); // send content
  response.end();
};

// get the picture for the error page
const getPicture = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpg' }); // send response headers
  response.write(picture); // send content
  response.end();
};

// get the picture for the error page
const getDocumentation = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' }); // send response headers
  response.write(documentation); // send content
  response.end();
};

// export all the endpoints
module.exports.get404Response = get404Response;
module.exports.getCSS = getCSS;
module.exports.getJokes = getJokes;
module.exports.getHomePage = getHomePage;
module.exports.AddPage = AddPage;
module.exports.getAdmin = getAdmin;
module.exports.getPicture = getPicture;
module.exports.getAppCSS = getAppCSS;
module.exports.getIndexCSS = getIndexCSS;
module.exports.getaddCSS = getaddCSS;
module.exports.getAdminCSS = getAdminCSS;
module.exports.getErrorCSS = getErrorCSS;
module.exports.getErrorPage = getErrorPage;
module.exports.getDocumentation = getDocumentation;
module.exports.getDocCSS = getDocCSS;
