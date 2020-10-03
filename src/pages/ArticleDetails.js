import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import Colors from '../styles/Colors';

export default class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }
  static navigationOptions = {
    title: 'WiredApp',
    headerStyle: {
      backgroundColor: Colors.navbarBackgroundColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 24,
      textAlign: 'center',
      alignSelf: 'center',
      width: '80%',
    },
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const articleDetails = navigation.getParam('url');
    this.setState({url: articleDetails});
  }
  render() {
    return <WebView source={{uri: this.props.url}} />;
  }
}
