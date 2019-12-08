const Seqeulize = require('Sequelize');
const db = require('../config/database');

const Gig = db.define('gig',{
    name: {
        type: Seqeulize.STRING
    },
    nameNext: {
        type: Seqeulize.STRING
    },
    studio: {
        type: Seqeulize.STRING
    },
    type: {
        type: Seqeulize.STRING
    },
    data: {
        type: Seqeulize.STRING
    },
    descr: {
        type: Seqeulize.STRING
    },
    pict: {
        type: Seqeulize.STRING
    },

})
module.exports = Gig;