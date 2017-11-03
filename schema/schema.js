// Schema file tells graphQL how our data is related
const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema
} = graphql;

// This object instructs GraphQL about what a user object looks like
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: {type: GraphQLString},
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt}
	},
});

// Root Query is an entry point into the data
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {type: GraphQLString}
			},

			// Resolve fn is where we go into DB and find the actual data we're looking for
			resolve(parentValue, args){
				return axios.get(`http://localhost:3000/users/${args.id}`)
					// Axios nests results in .data so we must dig it out
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});