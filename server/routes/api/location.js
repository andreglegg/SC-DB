const Location = require('../../models/Location');

module.exports = (app) => {
  app.get('/api/location', (req, res, next) => {
    Location.find()
      .exec()
      .then((location) => res.json(location))
      .catch((err) => next(err));
  });

  app.post('/api/location', function (req, res, next) {
    const location = new Location();

    location.save()
      .then(() => res.json(location))
      .catch((err) => next(err));
  });

  app.put('/api/location/edit/:id/:planet/:zone/:trade/:index/:price', (req, res, next) => {
    var planet = req.params.planet;
    var zone = req.params.zone;
    var trade = req.params.trade;
    var index = Number(req.params.index);
    var price = req.params.price;
    Location.findById(req.params.id)
      .exec()
      .then((location) => {
        location[planet][zone][trade][index] = { com_id: 5, price: price };

        location.save()
          .then(() => res.json(location))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
