import React, {Component} from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';

import ArticleList from './pages/ArticleList';
import ArticleDetails from './pages/ArticleDetails';


export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Stack key="root" hideNavBar={true}>
          <Scene
            key="ArticleList"
            component={ArticleList}
            title="ArticleList"
          />
          <Scene
            key="ArticleDetails"
            component={ArticleDetails}
            title="ArticleDetails"
          />
         
        </Stack>
      </Router>
    );
  }
}
