"use strict";

const express = require("express");
const app = express();
app.use(express.json());
const { categories, funnyJoke, lameJoke } = require("./jokes");

app.get("/math/circle/:r", (req, res) => {
  const PI = 3.14;
  const r = Number(req.params.r);

  const area = PI * r * r;
  const circumference = 2 * PI * r;

  const result = { area: area, circumference: circumference };
  res.json(result);
});

app.get("/math/rectangle/:w/:h", (req, res) => {
  const w = Number(req.params.w);
  const h = Number(req.params.h);

  const area = w * h;
  const perimiter = 2 * w + 2 * h;

  const result = { area: area, perimiter: perimiter };
  res.json(result);
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = Number(req.params.base);
  const exponent = Number(req.params.exponent);
  const passRoot = req.query.root === "true";

  if (Number.isNaN(base)) {
    return res.status(400).json({ error: "invalid input." });
  }

  if (Number.isNaN(exponent)) {
    return res.status(400).json({ error: "invalid input." });
  }

  const result = Math.pow(base, exponent);
  const root = Math.sqrt(base);

  if (passRoot) {
    return res.json({ result, root });
  }

  return res.json({ result });
});

app.get("/jokebook/categories", (req, res) => {
  return res.json({ categories });
});

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;

  let jokes;

  if (category === "funnyJoke") {
    jokes = funnyJoke;
  } else if (category === "lameJoke") {
    jokes = lameJoke;
  } else {
    return res.json({ error: `no jokes for category ${category}` });
  }

  const randomJoke = pickRandom(jokes);
  return res.json(randomJoke);
});

// wlasny endpoint z losowym zartem z losowej kategorii.
app.get("/jokebook/random", (req, res) => {
  const category = pickRandom(categories);

  let jokes;

  if (category === "funnyJoke") {
    jokes = funnyJoke;
  } else if (category === "lameJoke") {
    jokes = lameJoke;
  }

  const randomJoke = pickRandom(jokes);
  return res.json({ category, ...randomJoke });
});

app.post("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;
  const { joke, response } = req.body;

  if (!joke || !response) {
    return res.status(400).json({ error: "Both 'joke' and 'response' are required." });
  }

  let jokes;

  if (category === "funnyJoke") {
    jokes = funnyJoke;
  } else if (category === "lameJoke") {
    jokes = lameJoke;
  } else {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  jokes.push({ joke, response });

  return res.json({
    message: `Joke added to category ${category}`,
    added: { joke, response }
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
