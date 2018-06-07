import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import Navigator from './config/routes';

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
