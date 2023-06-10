const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,

        unique: true
    },
    image: {
        type: String,

    },
    label: {
        type: String,

        default: ""
    },
    price: {
        type: Currency,

    },
    description: {
        type: String,

    }
}, {
    timestamps: true
});


const Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;