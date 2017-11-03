const express = require('express');
const expressGraphQL = require('express-graphql');
const schemaUsers = require('./schema/schema');

const app = express();

// Middleware intercepts request as it comes through Express server
app.use('/graphql', expressGraphQL({
	schema: schemaUsers,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Listening');
});