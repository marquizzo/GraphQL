/*
	React apollo documentation:
	https://www.apollographql.com/docs/react/
*/

import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';	// Seems to change state of app via URL hashes
import ApolloClient from 'apollo-client';	// Server-side interacts with GQL
import {ApolloProvider} from 'react-apollo';// Client-side interacts with React

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// Assumes that app is accessible via '/graphql' in server.js
const client = new ApolloClient({
	// dataIDFromObject makes sure Apollo tracks cached objects by their ID
	// it then re-renders components if it notices object is updated.
	dataIdFromObject: o => o.id
});

const Root = () => {
	return (
		<ApolloProvider client={client}>
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={SongList} />
					<Route path="songs/new" component={SongCreate} />
					<Route path="songs/:songID" component={SongDetail} />
				</Route>
			</Router>
		</ApolloProvider>
	);
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
