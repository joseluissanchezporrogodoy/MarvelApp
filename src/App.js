/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow/
 */

import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from 'marvel_app/src/webservices/webservices'

/*********************** COMPONENTS ****************************************/
import CharactersList from 'marvel_app/src/sections/characters/CharactersList';
import CharacterDetail from 'marvel_app/src/sections/characters/CharacterDetail';
/*************************************************************/

/*********************** REDUX ****************************************/
import {createStore, applyMiddleware, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './redux/reducers'// Nuestros reducers
const reducer = combineReducers(reducers) // Combinamos nuestros reducers
const store = createStore(// Creamos el store con:
    reducer,// Nuestros reducers
    applyMiddleware(thunk)// Nuestro middleware
)
/*************************************************************/


export default class App extends Component{
  componentWillMount(){
    webservices.configureAxios()
    StatusBar.setBarStyle('light-content') // Solo para ios
}

render() {

  return (
      <Provider store = {store}>
      <Router>
          <Scene key="root">
             <Scene
                  key={ 'CharactersList'}
                  component ={ CharactersList}
                  navigationBarStyle={styles.navBar}
                  navBarButtonColor = {'white'}
             />
              <Scene
                  key={'CharacterDetail'}
                  component={CharacterDetail}
                  navigationBarStyle={styles.navBar}
                  navBarButtonColor={'red'}
              />
          </Scene>
      </Router>
      </Provider>
  );
}
}

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: 'green',
    },
});
