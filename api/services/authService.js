const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const User = require("../models/User");
const {SECRET} = require('../constants')


exports.register = async (email, _password) => {
    const existingUser = await User.findOne({email});

    if (existingUser) {
        throw new Error('User exists');
    }

    const password = await bcrypt.hash(_password, 10);
    await User.create({email, password});

    return this.login(email, _password);
}

exports.login = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
    }

    const accessToken = await jwt.sign(payload, SECRET);

    return {
        ...payload, accessToken
    }
}