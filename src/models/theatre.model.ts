import { model, Schema } from 'mongoose';

const theatreSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: Number, required: true },
    address: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

const TheatreModel = model('Theatre', theatreSchema);

export default TheatreModel;
