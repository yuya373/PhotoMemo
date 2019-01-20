import React, { PureComponent } from 'react';
import { Permissions, ImagePicker } from "expo"
import { View, Platform } from "react-native"
import { NavigationScreenProp } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';

interface State {
  hasCameraPermission: null | boolean
  pickerShowup: boolean,
}

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class CameraScreen extends PureComponent<Props, State> {
  state = {
    hasCameraPermission: null,
    pickerShowup: false,
  }

  goBack = () => {
    if (!this.props.navigation.goBack()) {
      this.props.navigation.navigate("Main")
    }
  }

  hasPermission = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      return status === "granted"
    } else {
      return true
    }
  }

  pickImage = async () => {
    this.setState(
      (s) => ({ ...s, pickerShowup: true }),
      async () => {
        try {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1.0,
          })

          this.setState(
            (s) => ({ ...s, pickerShowup: false }),
            () => {
              if (result.cancelled) {
                this.goBack()
              } else {
                this.props.navigation.navigate("CreateMemo", {
                  ...result,
                })
              }
            }
          )
        } catch (err) {
          console.error(err)
          this.setState(
            (s) => ({ ...s, pickerShowup: false }),
            () => {
              this.goBack()
            }
          )
        }
      }
    )
  }

  async componentDidMount() {
    try {
      const hasCameraPermission = await this.hasPermission()
      this.setState({ hasCameraPermission });
    } catch (err) {
      console.error(err)
      this.goBack()
    }
  }

  render() {
    return (
      <View>
        <NavigationEvents
          onDidFocus={this.pickImage}
        />
      </View>
    )
  }
}
