const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
});

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

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})