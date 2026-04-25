import { Schema, model } from "mongoose";
import { Movie } from "../types/movie.type";

const movieSchema = new Schema<Movie>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    casts: { type: [String], required: true },
    trailerUrl: { type: String, required: true },
    language: { type: String, required: true, default: "English" },
    director: { type: String, required: true },
    releaseDate: { type: String, required: true },
    releaseStatus: {
      type: String,
      default: "UNRELEASED",
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const MovieModel = model<Movie>("Movie", movieSchema);