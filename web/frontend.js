/* eslint-disable import/newline-after-import */
// initialize tracer

const tracer = require('dd-trace').init({
  service:"frontend"
});


const axios = require('axios');
const express = require('express');

const app = express();


// Allow cross-origin, traced requests. See http://enable-cors.org/server_expressjs.html
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', [
    'Origin', 'Accept', 'X-Requested-With', 'X-B3-TraceId',
    'X-B3-ParentSpanId', 'X-B3-SpanId', 'X-B3-Sampled'
  ].join(', '));
  next();
});

app.get('/', (req, res) => {
  axios.get('http://localhost:9000/api')
  .then(response => res.send(response.data))
  .catch(err => console.error('Error', err.response ? err.response.status : err.message))
});

app.listen(8081, () => {
  console.log('Frontend listening on port 8081!');
});
