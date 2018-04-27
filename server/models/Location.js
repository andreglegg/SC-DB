const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  Yela: {
    Grimhex: {
      sell: [
        {
          com_id: {
            type: Number,
          },
          price: {
            type: Number,
          }
        }
      ],
      buy: [
        {
          com_id: {
            type: Number,
          },
          price: {
            type: Number,
          }
        }
      ]
    },
    "Deakins Research Outpost": {
      sell: [
        {
          com_id: {
            type: Number,
          },
          price: {
            type: Number,
          }
        }
      ],
      buy: [
        {
          com_id: {
            type: Number,
          },
          price: {
            type: Number,
          }
        }
      ]
    }
  }
});

module.exports = mongoose.model('Location', LocationSchema);
