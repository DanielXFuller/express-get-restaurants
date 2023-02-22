const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");

const port = 3000;

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a single restaurant by id
app.get('/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).send('Restaurant not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Create a new restaurant
app.post('/restaurants', async (req, res) => {
  const { name, location } = req.body;
  try {
    const restaurant = await Restaurant.create({ name, location });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update an existing restaurant by id
app.put('/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  const { name, location } = req.body;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
      restaurant.name = name;
      restaurant.location = location;
      await restaurant.save();
      res.json(restaurant);
    } else {
      res.status(404).send('Restaurant not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a restaurant by id
app.delete('/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
      await restaurant.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Restaurant not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});