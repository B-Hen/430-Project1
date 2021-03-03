// array of jokes
const _ = require('underscore');

const budget = [

];

// function to get jokes for JSON
const getRandomJokeJSON = (numberOfJokes) => {
  // first make sure that the number of jokes is a number we can actually use
  let limit = Number(numberOfJokes); // cast 'limit' to a Number
  limit = !limit ? 1 : limit; // if limit is not a number because it is the "falsy" NAN default to 1
  limit = limit < 1 ? 1 : limit; // if limit is less than 1 default it to 1
  limit = limit > budget.length ? budget.length : limit; // make limit length

  // next shuffel the jokes in the array and sav to new array
  // const jokes2 = _.shuffle(jokes);

  const budget3 = []; // new array to reutrn

  // loop through and add the jokes to the array that will be returned
  for (let i = 0; i < limit; i++) {
    budget3[i] = budget[i];
  }

  // return the array as JSON
  return JSON.stringify(budget3);
};

// function to get jokes for XML
const getRandomJokeXML = (numberOfJokes) => {
  // first make sure that the number of jokes is a number we can actually use
  let limit = Number(numberOfJokes); // cast 'limit' to a Number
  limit = !limit ? 1 : limit; // if limit is not a number because it is the "falsy" NAN default to 1
  limit = limit < 1 ? 1 : limit; // if limit is less than 1 default it to 1
  limit = limit > budget.length ? budget.length : limit; // make limit length

  // next shuffel the jokes in the array and sav to new array
  // const jokes2 = _.shuffle(jokes);

  const budget3 = []; // new array to reutrn

  // loop through and add the jokes to the array that will be returned
  for (let i = 0; i < limit; i++) {
    budget3[i] = `<joke><q>${budget[i].q}</q><a>${budget[i].a}</a></joke>`;
  }

  if (limit === 1) return budget3[0];

  return `<jokes>${budget3}</jokes>`;
};

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomJokeResponse = (request, response, params = 1, acceptedTypes = 'application/json', httpMethod) => {
  // check to see that "text/xml" is in the acceptedTypes
  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'HEAD') {
      const bytes = getBinarySize(getRandomJokeXML(params));
      response.writeHead(200, { 'Content-Type': 'text/xml', 'Content-Length': bytes });
      response.end();
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomJokeXML(params));
      response.end();
    }
  } else if (httpMethod === 'HEAD') {
    const bytes = getBinarySize(getRandomJokeJSON(params));
    response.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': bytes });
    response.end();
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getRandomJokeJSON(params)); // send content
    response.end(); // close conection
  }
};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// method to get the current budget
const getBudget = (request, response) => {
  const responseJSON = {
    budget,
  };

  respondJSON(request, response, 200, budget[0]);
};

// method to add a budget
const addBudget = (request, response, body) => {
  const responseJSON = {
    message: 'Budget is required',
  };

  // if parameter was passed in return error message
  if (!body.budget) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // we DID get a budget
  let responseCode = 201; // "created"
  if (budget[0] === null) { // update
    responseCode = 204;
  } else {
    budget[0] = { budget: '' }; // make a new budget
  }

  // update or initialize values, as the case may be
  budget[0].budget = body.budget;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode); // this is for 204, a "no content" header
};

// method to add expesive
const addExpense = (request, response, body) => {
  const responseJSON = {
    message: 'You need to add all the parameters!',
  };

  // if parameter not passed in
  if (!body.item || !body.cost || !body.type || !body.necessary) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // if we did get all them
  const responseCode = 201;

  if (budget.length === 0) budget.push({ budget: "You don't have a budget. Go enter one on the Edit Page!" });
  budget.push({
    item: body.item, cost: body.cost, type: body.type, necessary: body.necessary,
  });

  responseJSON.message = 'Created Successfully';
  return respondJSON(request, response, responseCode, responseJSON);
};

module.exports = {
  getRandomJokeResponse,
  getBudget,
  addBudget,
  addExpense,
};
