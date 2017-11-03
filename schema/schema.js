// Schema file tells graphQL how our data is related
const graphql = require('graphql');
const axios = require('axios');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		id: {type: GraphQLString},
		name: {type: GraphQLString},
		description: {type: GraphQLString},
		users: {
			type: new GraphQLList(UserType),	// This tells GQL to expect an array of <UserType>s
			resolve(parentValue){
				return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(res => res.data);
			}
		}
	})
});

// This object instructs GraphQL about what a user object looks like
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {type: GraphQLString},
		firstName: {type: GraphQLString},
		age: {type: GraphQLInt},
		company: {
			type: CompanyType,
			resolve(parentValue, args){
				return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data);
			}
		}
	}),
});

// Root Query is an entry point into the data
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {id: {type: GraphQLString}},

			// Resolve fn is where we go into DB and find the hard data we're looking for
			resolve(parentValue, args){
				return axios.get(`http://localhost:3000/users/${args.id}`)
					// Axios nests results in .data so we must dig it out
					.then(resp => resp.data);
			}
		},
		company: {
			type: CompanyType,
			args: {id: {type: GraphQLString}},
			resolve(parentValue, args){
				return axios.get(`http://localhost:3000/companies/${args.id}`)
					.then(resp => resp.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});

/************* SAMPLE QUERY FOR GraphiQL *************

query findCompany{
  company1: company(id: "1"){
    ...companyDetails
  },
  
  company2: company(id: "2"){
    ...companyDetails
  }
}

fragment companyDetails on Company{
  id,
  name,
  description,  
  users{
    firstName,
    id,
    age,
  }
}
*/