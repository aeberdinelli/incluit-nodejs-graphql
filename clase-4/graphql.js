const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { importSchema } = require('graphql-import');

const app = express();

let DB = [];

const resolvers = {
    ListProducts: () => {
        return DB.map((item, id) => ({ ...item, id: id + 1 }));
    },
    GetProduct: (params) => {
        return {
            ...DB[params.id],
            id: params.id
        }
    },
    UpdateProduct: (params) => {
        DB[params.id] = params.body;

        return params.body;
    },
    CreateProduct: (params) => {
        DB.push(params);

        return {
            ...params, 
            id: DB.length
        };
    },
};

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(importSchema('./example.graphql')),
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(4000, () => console.log('GraphQL API running at port 4000'));