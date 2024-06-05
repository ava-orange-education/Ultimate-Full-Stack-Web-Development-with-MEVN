const express = require('express');
const fs = require('fs');
const app = express();
const port = 4002;

app.get('/data', (req, res) => {
  try {
    const data = fs.readFileSync('/app-data/message.txt', 'utf8');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error reading message');
  }
});

app.listen(port, () => {
  console.log(`App 2 (Reader) listening at http://localhost:${port}`);
});
