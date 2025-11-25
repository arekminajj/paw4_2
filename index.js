'use strict';

const express = require('express');
const app = express();

app.get('/math/circle/:r', (req, res) => {
  
  const PI = 3.14
  const r = Number(req.params.r);

  const area = PI * r * r;
  const circumference = 2 * PI * r;

  const result = {"area": area,"circumference": circumference}
  res.json(result);
});

//TODO2


//TODO3


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});