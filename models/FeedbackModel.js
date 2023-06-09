import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    nameUser: {
      type: String,
      required: true,
    },
    idVendor: {
      type: String,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    image: [],
  },
  { timestamps: true }
);
schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
export default mongoose.model("services", schema);
