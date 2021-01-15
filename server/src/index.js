const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');

const resolvers = {
    Query,
    Mutation
}

const prisma = new PrismaClient()

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    },
    cors: corsOptions
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );
