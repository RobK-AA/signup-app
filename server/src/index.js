const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const fs = require('fs');
const path = require('path');
const { getUserId } = require('./utils');

const resolvers = {
    Query,
    Mutation
}

const prisma = new PrismaClient({
    errorFormat: 'minimal'
});

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
    context: ({ req }) => {
        return {
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        }
    },
    cors: corsOptions
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );
