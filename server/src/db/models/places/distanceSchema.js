import mongoose from 'mongoose';
// Define a Mongoose schema
const distanceSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    distance: Object,
});

// Create a Mongoose model
export const DistanceModel = mongoose.model('places', distanceSchema);
