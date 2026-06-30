const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false //this one is important because it will not return the password when we query the user
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    passwordChangedAt: Date,

});

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return ;

    this.password = await bcrypt.hash(this.password,12);
    



});

userSchema.methods.correctPassword= async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};


module.exports = mongoose.model('User', userSchema);