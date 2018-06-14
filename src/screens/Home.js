import React, { Component } from 'react';
import { FlatList, Image, TouchableWithoutFeedback, Linking, TouchableOpacity } from 'react-native';
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
  Right,
  ActionSheet,
  Root
} from 'native-base';

import { Container } from '../components/Container';
import { InputWithButton } from '../components/TextInput';
import { searchVideoSuccess } from '../actions/youtube';
import { YOUTUBE_API_KEY } from '../config/config';

const BUTTONS = ['Convert and download', 'Cancel'];
const CANCEL_INDEX = 1;

const CONVERT_API_ROOT_URL = 'https://youtube7.download/mini.php?id=';
const INDIVIDUAL_API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/videos?'
const INDIVIDUAL_API_QUERY_PARAMS = {
  key: YOUTUBE_API_KEY,
  part: 'statistics',
  id: ''
}
const API_ROOT_URL = 'https://www.googleapis.com/youtube/v3/search?';
const API_QUERY_PARAMS = {
  key: YOUTUBE_API_KEY,
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

  downloadVideo = item => {
    let vid = item.id.videoId;
    const url = `${CONVERT_API_ROOT_URL}${vid}`

    Linking.openURL(url);
  }

  toggleModal = item =>
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: 'Actions'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.downloadVideo(item);
        }
      },
    );

  handleSearch = async () => {
    const query = qs.stringify({ ...API_QUERY_PARAMS, q: this.state.searchString });
    const url = `${API_ROOT_URL}${query}`;

    const { data } = await axios.get(url);

    await Promise.all(data.items.map(async vid => {
      let id = vid.id.videoId;
      const individualQuery = qs.stringify({ ...INDIVIDUAL_API_QUERY_PARAMS, id  });
      //API_QUERY_PARAMS
      const individualURL = `${INDIVIDUAL_API_ROOT_URL}${individualQuery}`;

      const { data } = await axios.get(individualURL);
      vid.statistics = data.items[0].statistics
    }))

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
            <Root>
              <TouchableWithoutFeedback onLongPress={() => this.toggleModal(item)}>
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
                        <Icon type="EvilIcons" active name="like" />
                        <Text>{item.statistics.likeCount || 0}</Text>
                      </Button>
                    </Left>
                    <Body>
                      <Button transparent>
                        <Icon type="EvilIcons" active name="comment" />
                        <Text>{item.statistics.commentCount || 0}</Text>
                      </Button>
                    </Body>
                    <Right>
                      <TouchableOpacity
                        style={{ alignItems: 'center', backgroundColor: '#DDDDDD', padding: 5}}
                        onPress={() =>this.downloadVideo(item)}
                      >
                        <Text> Download </Text>
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                </Card>
              </TouchableWithoutFeedback>
            </Root>
          )}
          keyExtractor={(item) => item.id.videoId.toString()}
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
