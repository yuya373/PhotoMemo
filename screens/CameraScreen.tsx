import React, { PureComponent } from 'react';
import { Camera, Permissions } from "expo"
import { View, SafeAreaView } from "react-native"
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon } from "native-base"
import Colors from "./../constants/Colors"

interface State {
  hasCameraPermission: null | boolean
  type: string
}

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class CameraScreen extends PureComponent<Props, State> {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }

  goBack = () => {
    if (!this.props.navigation.goBack()) {
      this.props.navigation.navigate("Main")
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const {
      hasCameraPermission,
      type,
    } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <View />
    } else {
      return (
        <View style={{ flex: 1 }} >
          <Camera
            style={{ flex: 1 }}
            type={type}
          >
            <SafeAreaView>
              <Button
                transparent={true}
                onPress={this.goBack}
              >
                <Icon
                  style={{
                    color: Colors.noticeText,
                    fontSize: 27 * 1.2,
                  }}
                  name="close-circle-outline"
                />
              </Button>
            </SafeAreaView>
          </Camera>
        </View>
      )
    }
  }
}
