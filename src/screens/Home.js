import React, { Component } from 'react';
//import { Text, View, StatusBar, Platform, ScrollView } from 'react-native';

import { Container } from '../components/Container';
import { InputWithButton } from '../components/TextInput';

const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_QUERY_PARAMS = {
  key: 'AIzaSyA3nGzXiIJWtVTQsndzWgBekeJcF4waY6Q',
  part: 'snippet',
  q: 'rihanna',
  maxResults: 5
};

class Home extends Component {
  render() {
    return (
      <Container>
        <InputWithButton 
          onPress={() => console.log('something')}
          placeholder='Search'
          keyboardType="numeric"
          onChangeText={this.handleTextChange}
          textColor={this.props.primaryColor}
        />
      </Container>
      
    );
  }
}

export default Home;
