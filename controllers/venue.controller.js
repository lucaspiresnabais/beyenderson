import Venue from "../models/venue.model.js";

const controller = {
  create: async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const datetime = req.body.datetime;
    const address = req.body.address;
    const postalCode = req.body.postalCode;
    const isPublic = req.body.isPublic;
    const showWhoIsComing = req.body.showWhoIsComing;
    const hosts = req.body.hosts;

    const venue = new Venue({
      name,
      description,
      datetime,
      address,
      postalCode,
      isPublic,
      showWhoIsComing,
      hosts,
    });

    await venue.save();
    return res.sendStatus(201);
  },
  edit: async (req, res) => {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const datetime = req.body.datetime;
      const address = req.body.address;
      const postalCode = req.body.postalCode;
      const isPublic = req.body.isPublic;
      const showWhoIsComing = req.body.showWhoIsComing;
      const hosts = req.body.hosts;

      const venue = new Venue({
        name,
        description,
        datetime,
        address,
        postalCode,
        isPublic,
        showWhoIsComing,
        hosts,
      });
      const filter = { name: req.body.name };
      const update = {
        description: req.body.description,
        isPublic: req.body.isPublic,
      };
      await Venue.findOneAndUpdate(filter, update);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  },
};

export default controller;
