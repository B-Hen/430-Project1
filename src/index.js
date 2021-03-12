// console.log("First web service starting up ...");
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// 1 - pull in the HTTP server module

// 2 - pull in URL and query modules (for URL parsing)

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// struct to hold all the endpoint URLs and which handler method to
// go with it
const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokeResponse,
  '/getBudget': jsonHandler.getBudget,
  '/default-styles.css': htmlHandler.getCSS,
  '/app.css': htmlHandler.getAppCSS,
  '/index.css': htmlHandler.getIndexCSS,
  '/add.css': htmlHandler.getaddCSS,
  '/admin.css': htmlHandler.getAdminCSS,
  '/error.css': htmlHandler.getErrorCSS,
  '/app.html': htmlHandler.getJokes,
  '/index.html': htmlHandler.getHomePage,
  '/': htmlHandler.getHomePage,
  '/add.html': htmlHandler.AddPage,
  '/admin.html': htmlHandler.getAdmin,
  '/budget.jpg': htmlHandler.getPicture,
  '/clear': jsonHandler.clearBudget,
  notFound: htmlHandler.get404Response,
};

// method to handle all the Post Request
const handlePost = (request, response, parsedUrl) => {
  // check to see if the user wants to add to the budget
  if (parsedUrl.pathname === '/addBudget') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addBudget(request, response, bodyParams);
    });
    // check to see if the user wants to add an expense
  } else if (parsedUrl.pathname === '/addExpense') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addExpense(request, response, bodyParams);
    });
    // Check to see if the user wants to clear all the expenses
  } else if (parsedUrl.pathname === '/clear') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.clearBudget(request, response, bodyParams);
    });
    // else check to see if the user just wants to delete on expense
  } else if (parsedUrl.pathname === '/delete') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.deleteExpense(request, response, bodyParams);
    });
  }
};

// 7 - this is the function that will be called every time a client request comes in
// this time we will look at the `pathname`, and send back the appropriate page
// note that in this course we'll be using arrow functions 100% of the time in our server-side code
const onRequest = (request, response) => {
  // get the URL and any parameters that are with it
  const parseURL = url.parse(request.url);
  const { pathname } = parseURL;
  const paramas = query.parse(parseURL.query);
  const { limit } = paramas;
  const httpMethod = request.method;

  // post request
  if (httpMethod === 'POST') {
    handlePost(request, response, parseURL);
  } else {
    // get the contents of request.headers then split into array of strings
    let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
    acceptedTypes = acceptedTypes || [];

    // check to see if the GET request URL is in the struct and if not error
    if (urlStruct[pathname]) {
      urlStruct[pathname](request, response, limit, acceptedTypes, httpMethod);
    } else {
      urlStruct.notFound(request, response);
    }
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
