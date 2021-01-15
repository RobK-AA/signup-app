const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function signUp(parent, args, context, info) {
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail =  emailExpression.test(String(args.email).toLowerCase());
    if (args.password.length < 6 ) throw new Error("password should be minimum 6 characters");
    if (!isValidEmail) throw new Error("email not in proper format");
    const password = await bcrypt.hash(args.password, 10);
    const newUser = await context.prisma.user.create({
        data: {
            username: args.username,
            name: args.name,
            email: args.email,
            password: password,
            picture: args.picture
        },
    })
    
    const token = jwt.sign({ userId: newUser.id }, APP_SECRET);
    return {
        token,
        newUser
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({
        where: { email: args.email }
    });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(
        args.password,
        user.password
    );
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    };
}

module.exports = {
  signUp,
  login
};