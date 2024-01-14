const Pirate = require("../models/pirate.model");

module.exports.findAllPirates = (req, res) => {
  Pirate.find()
    .then((allPirates) => {
      res.json({ pirate: allPirates });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
};

module.exports.getPirate = (request, response) => {
  Pirate.findOne({ _id: request.params.id })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};

module.exports.createPirate = (request, response) => {
  const { firstName, position } = request.body;
  Pirate.exists({ firstName })
    .then((firstNameExists) => {
      if (firstNameExists) {
        return Promise.reject({
          errors: { firstName: { message: "This name already exists" } },
        });
      } else {
        return Pirate.exists({ position: "Captain" });
      }
    })
    .then((captainExists) => {
      if (captainExists && position === "Captain") {
        return Promise.reject({
          errors: {
            position: {
              message: "Captain already exists",
            },
          },
        });
      } else {
        return Pirate.create(request.body);
      }
    })
    .then((pirate) => response.json(pirate))
    .catch((err) => response.json(err));
};


module.exports.updatePirate = (request, response) => {
  const { id } = request.params;
  const {
    firstName,
    imgURL,
    phrase,
    position,
    treasures,
    pegLeg, 
    eyePatch, 
    hookHand,
  } = request.body;

  Pirate.findById(id)
    .then((pirate) => {
      if (!pirate) {
        return response.status(404).json({ message: 'Pirate not found' });
      }

      return Pirate.exists({ firstName, _id: { $ne: id } });
    })
    .then((pirateExists) => {
      if (pirateExists) {
        throw {
          status: 400,
          errors: {
            firstName: { message: 'This name already exists' },
          },
        };
      }

      if (position === 'Captain') {
        return Pirate.exists({ position: 'Captain', _id: { $ne: id } });
      }

      return false;
    })
    .then((captainExists) => {
      if (captainExists) {
        throw {
          status: 400,
          errors: {
            position: {
              message: 'Captain already exists',
            },
          },
        };
      }

      return updatePirate(id, {
        firstName,
        imgURL,
        phrase,
        position,
        treasures,
        pegLeg, 
        eyePatch, 
        hookHand,
      });
    })
    .then((updatedPirate) => response.json(updatedPirate))
    .catch((err) => {
      const status = err.status || 500;
      const errors = err.errors || { message: 'Internal Server Error' };

      response.status(status).json(errors);
    });
};

function updatePirate(id, newData) {
  return Pirate.findByIdAndUpdate(id, newData, { new: true });
}

module.exports.deletePirate = (request, response) => {
  Pirate.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
