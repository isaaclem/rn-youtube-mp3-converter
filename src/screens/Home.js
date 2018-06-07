import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { InputWithButton } from '../components/TextInput';
import { searchVideoSuccess } from '../actions/youtube';
import { ListItem, Separator } from '../components/List';

const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_QUERY_PARAMS = {
  key: 'xxxx',
  part: 'snippet',
  q: 'rihanna',
  maxResults: 5
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
    };
  }

  handleSearch = () => {
    this.props.dispatch(searchVideoSuccess(['a', 'b', 'c']));
  }

  render() {
    return (
      <Container>
        <InputWithButton 
          onPress={this.handleSearch}
          placeholder='Search'
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={searchString => this.setState({ searchString })}
        />
        <FlatList
          data={this.props.videoList}
          renderItem={({ item }) => (
            <ListItem 
              text={item.item} 
              selected={item === 'wa'}
              onPress={(item) => { console.log(item)}}
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={Separator}
        />
      </Container>
      
    );
  }
}

const mapStateToProps = state => {
  const videoList = state.videos.videoList;

  return {
    videoList
  };
};

export default connect(mapStateToProps)(Home);
