//console.log('Hello from Node.js...');

// const person = require('./person');
// console.log(person);

// const Person = require('./person');
//
// const person1 = new Person('Gonzalo Ortega', 30);
// person1.greeting();

// const Logger = require('./logger');

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
  // console.log(request.url);
  // if (request.url === '/') {
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (error, content) => {
  //     if (error) throw error;
  //     response.writeHead(200, {
  //       'Content-Type': 'text/html'
  //     });
  //     response.end(content);
  //   });
  // }
  // if (request.url === '/about') {
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (error, content) => {
  //     if (error) throw error;
  //     response.writeHead(200, {
  //       'Content-Type': 'text/html'
  //     });
  //     response.end(content);
  //   });
  // }
  // if (request.url === '/api/users') {
  //   const users = [{
  //       name: 'Paco Garcia',
  //       age: 43
  //     },
  //     {
  //       name: 'Jorge Guerrero',
  //       age: 21
  //     }
  //   ];
  //   response.writeHead(200, {
  //     'Content-Type': 'application/json'
  //   });
  //   response.end(JSON.stringify(users));
  // }

  // Build dynamic file path
  let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url);

  // console.log(filePath);
  // response.end();

  // Extenssion of file
  let extname = path.extname(filePath);

  // Initial content type
  let contentType = 'text/html';

  // Check extension and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'text/json';
      break;
    case '.png':
      contentType = 'text/png';
      break;
    case '.jpg':
      contentType = 'text/jpg';
      break;
  }

  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (error, content) => {
          response.writeHead(200, {
            'Content-Type': 'text/html'
          });
          response.end(content, 'utf8');
        })
      } else {
        // Some server error
        response.writeHead(500);
        response.end(`Server error: ${error.code}`);
      }
    } else {
      // Success
      response.writeHead(200, {
        'Content-Type': contentType
      });
      response.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));