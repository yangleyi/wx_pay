const http = require('http')

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
}).listen(8888)
console.log('the server is start')