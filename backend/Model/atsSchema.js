import mongoose from "mongoose";

const atsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeName: {
      type: String,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    analysis: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ATS = mongoose.model("ATS", atsSchema);

export default ATS;