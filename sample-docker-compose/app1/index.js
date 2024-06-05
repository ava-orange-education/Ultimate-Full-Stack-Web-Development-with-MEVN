const express = require('express');
const fs = require('fs');
const app = express();
const port = 4001;

app.get('/data', (req, res) => {
  const message = `Hello from App 1 at ${new Date()}\n`;
  fs.appendFileSync('/app-data/message.txt', message);
  res.send(`Message written by App 1. ${message}`);
});

app.listen(port, () => {
  console.log(`App 1 (Writer) listening at http://localhost:${port}`);
});
