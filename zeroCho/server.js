const http = require('http');
var qs = require('querystring');

http.createServer((request, response) => {
  var body = '';
  return request
    .on('error', (err) => {
      console.log(err);
    })
    .on('data', (data) => {
      console.log(data);
      body = body + data;
    })
    .on('end', () => {
      response.on('error', (err) => {
        console.error(err);
      });
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      var post = qs.parse(body);
      var name = post.name;
      var email = post.email;
      var windowOpen = "<script type='text/javascript'> window.open('http://localhost:80/creative/timer.html', 'memberok', 'width=400, height=140, resizable=no') </script>";
      response.write('hi\n' + name + email + '\n' + windowOpen);
      response.end('the end!');
    });
}).listen(50000 , () => {
  console.log('Server on port 50000!')
});

const express = require('express');
const app = express();
const path = require('path');
const route = require('./router/route');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'html'));

app.use(express.static(path.join(__dirname, 'html')));
app.use('/', route);
app.use((req, res, next) => {
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('서버 에러!');
});
app.listen(50001, () => {
  console.log('Express App on port 50001!');
});
