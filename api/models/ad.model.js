import mongoose from "mongoose";
const { Schema } = mongoose;

const AdSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ownername: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
    
    location: {
      type: String,
      required: true,
    },

    vehiclemake: {
      type: String,
      required: true,
    },
  
    vehiclemodel: {
      type: String,
      required: true,
    },

    vehiclevarient: {
      type: String,
      required: true,
    },
    transmission:{
      type: String,
      required: true,
    },
    mileage:{
      type: Number,
      required: true,
    },
    fueltype:{
      type: String,
      required: true,
    },
    registeryear:{
      type: String,
      required: true,
    },
    registercity:{
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    contact:{
      type:String,
      required: true,
    }

  },
  {
    timestamps: true,
  }
);
  AdSchema.index({ title: 'text' }); 
export default mongoose.model("Ad", AdSchema);
