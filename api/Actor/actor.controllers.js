const Actor = require("../../models/Actor");

exports.addCeleb = async (req, res, next) => {
  try {
    const newCeleb = await Actor.create(req.body);
    res.status(201).json(newCeleb);
    next(error);
  } catch (error) {
    next(error);
  }
};
