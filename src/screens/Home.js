import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import qs from 'qs';
import axios from 'axios';
import {  
  Card, 
  CardItem, 
  Text, 
  Button, 
  Icon, 
  Left, 
  Body, 
  Right 
} from 'native-base';
import Modal from 'react-native-modal';

import { Container } from '../components/Container';
import { InputWithButton } from '../components/TextInput';
import { searchVideoSuccess } from '../actions/youtube';
import { Separator } from '../components/List';

const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_QUERY_PARAMS = {
  key: 'AIzaSyA3nGzXiIJWtVTQsndzWgBekeJcF4waY6Q',
  part: 'snippet',
  q: 'Eminem',
  type: 'video',
  maxResults: 20
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      isModalVisible: false
    };
  }

  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  handleSearch = async () => {
    const query = qs.stringify({ ...API_QUERY_PARAMS, q: this.state.searchString });
    const url = `${API_ROOT_URL}${query}`;
    
    const { data } = await axios.get(url);
    this.props.dispatch(searchVideoSuccess(data.items));
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
          style={{ flex: 1, width: '90%' }}
          data={this.props.videoList}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onLongPress={this.toggleModal}>
              <Card style={{ flex: 1 }}>
                <CardItem style={{ flex: 1 }}>
                  <Body>
                    <Text>{item.snippet.title}</Text>
                    <Text note>{item.snippet.channelTitle}</Text>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <Image 
                    source={{ uri: item.snippet.thumbnails.default.url }} 
                    style={{ height: 200, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>12 Likes</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active name="chatbubbles" />
                      <Text>4 Comments</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Text>11h ago</Text>
                  </Right>
                </CardItem>
              </Card>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={(item) => item.id.videoId.toString()}
          ItemSeparatorComponent={Separator}
        />
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal>
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
