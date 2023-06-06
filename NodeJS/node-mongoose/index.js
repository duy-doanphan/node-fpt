const mongoose = require('mongoose');
const Nations = require('./models/nations');

const url = 'mongodb://localhost:27017/football';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected correctly to server');

        return Nations.deleteMany({});
    })
    .then(() => {
        const newNation = new Nations({
            name: 'Qatar',
        });

        return newNation.save();
    })
    .then((nation) => {
        console.log(nation);

        return Nations.find({}).exec();
    })
    .then((nations) => {
        console.log(nations);

        return Nations.deleteMany({});
    })
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });