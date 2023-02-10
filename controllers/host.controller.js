import Host from "../models/host.model.js";

const controller = {
  hostById: async (req, res) => {
    const host = await Host.findOne({
      user: "63e296566e0fcb0d849b6d1d",
    }).populate("venues");
    console.log(host);
  },
};

export default controller;
