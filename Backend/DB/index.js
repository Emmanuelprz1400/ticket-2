const sequelize = require('./connection')
const User = require('./dbUser')
const Friends = require('./dbFriends')
const Commits = require('./dbCommits')
const knowledge = require('./dbKnowledge')
const Skills = require('./dbSkills')
const Education = require('./dbEducation')
const Languajes = require('./dbLanguajes')
const Networks = require('./dbNetworks')
const Hobbies = require('./dbHobbies')


module.exports = {
    User,
    Friends,
    Commits,
    knowledge,
    Skills,
    Education,
    Languajes,
    Networks,
    Hobbies
}
