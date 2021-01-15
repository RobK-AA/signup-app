const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');

const resolvers = {
    Query: {
        info: () => `This is the API of signup-login`,
        users: async (parent, args, context, info) => {
            return context.prisma.user.findMany();
        },
    },
    Mutation
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );
