import Venue from "../models/venue.model.js";
import Host from "../models/host.model.js";
import mongoose from "mongoose";

const controller = {
  create: async (req, res) => {
    const venue = new Venue({
      name: req.body.name,
      description: req.body.description,
      datetime: req.body.datetime,
      address: req.body.address,
      postalCode: req.body.postalCode,
      isPublic: req.body.isPublic,
      showWhoIsComing: req.body.showWhoIsComing,
      hosts: req.body.hosts,
    });

    const createdVenue = await venue.save();
    return res.status(201).send(createdVenue._id);
  },
  edit: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).send("Invalid venue id provided");

      const venue = await Venue.findById(id);

      if (!venue) return res.status(404).send("Venue not found");

      const update = {};
      for (let key in req.body) {
        if (req.body[key] && req.body[key] !== venue[key])
          update[key] = req.body[key];
      }

      await Venue.updateOne({ _id: id }, update);

      res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  },
  delete: async (req, res) => {
    const venue = await Venue.findOneAndDelete({ _id: req.params.id });

    if (!venue) return res.status(404).send("Venue not found");

    for (const hostId of venue.hosts) {
      const host = await Host.findOne({ _id: hostId });
      const updatedVenues = host.venues.filter((v) => {
        return v.toString() !== venue._id.toString();
      });
      await Host.updateOne({ _id: hostId }, { venues: updatedVenues });
    }

    res.sendStatus(200);
  },
  venueById: async (req, res) => {
    const venue = await Venue.findOne({ _id: req.params.id }).populate("hosts");
    if (!venue) return res.status(404).send("Venue not found");
    res.status(200).send(venue);
  },
};

export default controller;
/* 63e5963e5971a34a76dd971c
63e59d625971a34a76dd9720
63e59d905971a34a76dd9721 */
