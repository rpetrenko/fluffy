// get rid of this
module.exports = {
    db: process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://localhost:27017/fluffy'
};