const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leadersSchema = new Schema({
    name: {
        type: String,

        unique: true
    },
    image: {
        type: String,

    },
    designation: {
        type: String,

    },
    abbr: {
        type: String,

    },
    description: {
        type: String,

    }
}, {
    timestamps: true
});


const Leaders = mongoose.model('Leader', leadersSchema);

module.exports = Leaders;