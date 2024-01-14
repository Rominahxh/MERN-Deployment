const PirateController = require("../controllers/pirate.controller");

module.exports = (app) => {
  app.get("/api/pirates", PirateController.findAllPirates);
  app.get("/api/pirates/:id", PirateController.getPirate);
  app.post("/api/pirates/new", PirateController.createPirate);
  app.patch("/api/pirates/edit/:id", PirateController.updatePirate);
  app.delete("/api/pirates/:id", PirateController.deletePirate);
};
