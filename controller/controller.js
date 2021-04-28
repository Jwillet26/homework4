const Model = require('../models/name');

exports.sendInput = async (input) => new Model({ name: input }).save();

exports.autocomplete = async (query) => {
  const regex = new RegExp(`^.*${query}`);
  return Model.find({ name: regex })
    .select('-_id -__v');
};
