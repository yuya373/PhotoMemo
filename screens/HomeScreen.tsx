import React from 'react';
import SafeAreaView from './../components/SaveAreaView';
import {
  Container,
  Fab,
  Icon,
} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';

interface State {
  displayCamera: boolean
}

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null,
  };
  displayCamera = () => this.props.navigation.navigate("Camera")

  state = {
    displayCamera: false,
  }

  render() {
    return (
      <SafeAreaView>
        <Container>
          <Fab
            direction="up"
            position="bottomRight"
            onPress={this.displayCamera}
          >
            <Icon name="add" />
          </Fab>
        </Container>
      </SafeAreaView>
    );
  }
}
