import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import Navigator from './config/routes';

const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search?'
const API_QUERY_PARAMS = {
  key: 'AIzaSyA3nGzXiIJWtVTQsndzWgBekeJcF4waY6Q',
  part: 'snippet',
  q: 'rihanna',
  maxResults: 5
};

export default class App extends React.Component {
  render() {
    const store = createStore(reducers);

    return (
      <Provider store={store}>
        <Navigator onNavigationStateChange={null} />
      </Provider>
    );
  }
}
