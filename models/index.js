//import all the models
const User = require('./user.model');
const Role = require('./Roles.model');
const ProgramQuestion = require('./programQuestion.model');
const Session = require('./session.model');
const DBTQuestion = require('./DBTQuestion.model');
const BECQuestion = require('./BECQuestion.model');
const transcribe= require('./transcribe.model');

module.exports = {
    User,
    Role,
    ProgramQuestion,
    Session,
    DBTQuestion,
    BECQuestion,
    transcribe
};