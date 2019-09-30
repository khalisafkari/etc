import React from 'react'
import {YellowBox} from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks';
import { MangaApi } from './serve';
import Navigation from './src/navigation';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './src/store';
import Westmanga from './src/utils/Westmanga';


export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <ApolloProvider client={MangaApi}>
            <Westmanga>
              <Navigation/>
            </Westmanga>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    )
  }
}