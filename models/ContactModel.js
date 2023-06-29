import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
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
export default mongoose.model("contacts", schema);
