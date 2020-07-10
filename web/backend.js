/* eslint-disable import/newline-after-import */
// initialize tracer
const tracer = require('dd-trace').init({
  service:"backend"
});

const express = require('express');

const app = express();

// instrument the server
function sleep(milliseconds) {
  const start = new Date().getTime();
  for (let i = 0; i < 1e10; i += 1) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

app.get('/api', (req, res) => {
  sleep(1500);
  res.send(new Date().toString());
});

app.listen(9000, () => {
  console.log('Backend listening on port 9000!');
});
