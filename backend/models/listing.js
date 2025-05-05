const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value <= this.regularPrice;
            },
            message: 'Discount price cannot be higher than regular price.',
        },
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    images: {
        type: [String],  // Assuming these are URLs or file paths
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,  // Assuming userRef refers to a User document
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
