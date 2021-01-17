const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

async function signUp(parent, args, context, info) {
    try {
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail =  emailExpression.test(String(args.email).toLowerCase());
        if (args.password.length < 6 ) throw new Error("password should be minimum 6 characters");
        if (!isValidEmail) throw new Error("email not in proper format");
        const password = await bcrypt.hash(args.password, 10);
        let newUser = await context.prisma.user.create({
            data: {
                username: args.username,
                name: args.name,
                email: args.email,
                password: password,
                picture: args.picture,
                isLoggedIn: true,
                token: "placeholder"
            },
        })
        const token = jwt.sign({ userId: newUser.id }, APP_SECRET);
        newUser = await context.prisma.user.update({ 
            where: { id: newUser.id },
            data: { token } })
        const isLoggedIn = newUser.isLoggedIn;
        return {
            token,
            isLoggedIn,
            newUser: {
                id: newUser.id,
                name: newUser.username,
                email: newUser.email,
                username: newUser.username,
                picture: newUser.picture
            }
        }
    } catch (err) {
        throw err;
    }
    
}

async function login(parent, args, context, info) {
    try {
        let user = await context.prisma.user.findUnique({
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
        user = await context.prisma.user.update({ 
            where: { id: user.id },
            data: { token, isLoggedIn: true } })
        const isLoggedIn = user.isLoggedIn;
        return {
            token,
            isLoggedIn,
            user: {
                id: user.id,
                name: user.username,
                email: user.email,
                username: user.username,
                picture: user.picture
            }
        };
    } catch (err) {
        throw err;
    }
    
}

async function logout(parent, args, context, info) {
    try {
        const user = await context.prisma.user.update({
            where: { id: parseInt(args.id) },
            data: { 
                isLoggedIn: false,
                token: "" 
            },
        })
        if (!user) {
            throw new Error('Not signed in');
        }
        return user;
    } catch (err) {
        throw (err);
    }
}
module.exports = {
  signUp,
  login, 
  logout
};