import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import CapitalizedText from '../components/CapitalizedText';
import styles from '../styles/ArticleListStyles';
import Navbar from '../components/Navbar';

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      articleList: [],
      search: '',
    };
    this.arrayholder = [];
  }
 
  componentDidMount() {
    return fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.wired.com%2Ffeed%2Fcategory%2Fbusiness%2Flatest%2Frss&api_key=64tr8loimqyl4sp4d8mucntcpuil5zxgynusbgf3&order_dir=desc&count=5')
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          isLoading: false,
          articleList: response.items,
        });
        this.arrayholder = response.items;
      })
      .catch((err) => console.log(err));
    
  }

  _SearchFilterFunction = (text) => {
    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      articleList: newData,
    });
  };

  _listSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.indicator}>
          <Text style={styles.loadingText}>Loading Articles</Text>
          <ActivityIndicator />
        </View>
      );
    } else {
    
      return (
        <SafeAreaView style={{flex: 1}}>
          <Navbar title="WiredApp" />
          <View style={styles.searchArea}>
            <SearchBar
              round
              inputStyle={{fontSize: 18}}
              inputContainerStyle={{height: 50, backgroundColor: '#fff'}}
              containerStyle={{height: 70, backgroundColor: '#fff'}}
              placeholder="Search Article..."
              onChangeText={(text) => this._SearchFilterFunction(text)}
            />
          </View>

          <View style={styles.container}>
            <FlatList
              data={this.state.articleList}
              renderItem={({item}) => (
                <ListItem
                  chevronColor="black"
                  chevron
                  title={
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.articleTitle}>
                        {item.title}
                      </Text>
                    </View>
                  }
                  leftAvatar={{
                    rounded: false,
                    size: 'large',
                    source: {
                      uri:item.thumbnail
                    },
                  }}
                  
                  containerStyle={{
                    backgroundColor:
                      '#E0E0E0'
                  }}
                  avatarStyle={{backgroundColor: '#fff'}}
                  subtitle={
                    <CapitalizedText style={styles.articleDescription}>
                      {item.description}
                    </CapitalizedText>                    
                  }
                  onPress={() => {
                    this.props.navigation.navigate('ArticleDetails', {
                      url: item.link,
                    });
                  }}
                />
              )}
              ItemSeparatorComponent={this._listSeparator}
              keyExtractor={(item) => item.name}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
}
