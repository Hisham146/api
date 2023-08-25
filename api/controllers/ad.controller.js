import Ad from "../models/ad.model.js";
import createError from "../utils/createError.js";




export const getAd = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) next(createError(404, "Ad not found!"));
    res.status(200).send(ad);
  } catch (err) {
    next(err);
  }
};

export const getAds = async (req, res, next) => {
  const q = req.query;
  const searchQuery = q.search
    ? q.search.split(' ').map(word => `(?=.*${word})`).join('')
    : null;

  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(searchQuery && { title: { $regex: searchQuery, $options: "i" } }), // Use the modified searchQuery
    ...(q.vehiclemake && { vehiclemake: q.vehiclemake }),
    ...(q.vehiclemodel && { vehiclemodel: q.vehiclemodel }),
    ...(q.location && { location: q.location }),
  };

  try {
    const ads = await Ad.find(filters).sort({ [q.sort]: -1, createdAt: -1 });
    res.status(200).send(ads);
  } catch (err) {
    next(err);
  }
};

