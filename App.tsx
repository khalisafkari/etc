import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import { MangaApi } from './serve';
import Navigation from './src/navigation';

import {Provider} from 'react-redux'
import store from './src/store';


export default class App extends React.Component{
  render(){
    return(
      <Provider store={store}>
      <ApolloProvider client={MangaApi}>
          <Navigation/>
      </ApolloProvider>
      </Provider>
    )
  }
}