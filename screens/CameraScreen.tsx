import React, { PureComponent } from 'react';
import { Permissions, ImagePicker } from "expo"
import { View, Platform, Alert } from "react-native"
import { NavigationScreenProp } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { ActionSheet } from 'native-base';

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

  askPermission = async (perm: Permissions.CAMERA | Permissions.CAMERA_ROLL): Promise<boolean> => {
    if (Platform.OS === "ios") {
      try {
        const { status } = await Permissions.askAsync(perm);
        return status === "granted"
      } catch (err) {
        console.warn(err)
        return false
      }
    } else {
      return true
    }
  }

  pickImageFromCamera = async () => {
    try {
      const [cameraPerm, cameraRollPerm] = await Promise.all([
        this.askPermission(Permissions.CAMERA),
        this.askPermission(Permissions.CAMERA_ROLL),
      ])
      const hasPermission = cameraPerm && cameraRollPerm
      if (!hasPermission) {
        Alert.alert("Needs Camera Permission")
        this.goBack()
        return
      }
    } catch (err) {
      console.error(err)
      this.goBack()
      return
    }

    this.setState(
      (s) => ({ ...s, pickerShowup: true }),
      async () => {
        try {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1.0,
          })
          this.handleImageResult(result)
        } catch (err) {
          this.handlePickerErr(err)
        }
      }
    )
  }

  pickImageFromRoll = async () => {
    try {
      const hasPermission = await this.askPermission(Permissions.CAMERA_ROLL)
      if (!hasPermission) {
        Alert.alert("Need Camera Roll Permission")
        this.goBack()
        return
      }
    } catch (err) {
      console.error(err)
      this.goBack()
      return
    }

    this.setState(
      (s) => ({ ...s, pickerShowup: true }),
      async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1.0,
          })
          this.handleImageResult(result)
        } catch (err) {
          this.handlePickerErr(err)
        }
      }
    )
  }

  handlePickerErr = (err: Error) => {
    console.error(err)
    this.setState(
      (s) => ({ ...s, pickerShowup: false }),
      () => {
        this.goBack()
      }
    )
  }

  handleImageResult = (imageResult: { cancelled: boolean, uri?: string, width?: number, height?: number }) => {
    this.setState(
      (s) => ({ ...s, pickerShowup: false }),
      () => {
        if (imageResult.cancelled) {
          this.goBack()
        } else {
          this.props.navigation.navigate("CreateMemo", {
            ...imageResult,
          })
        }
      }
    )
  }

  pickImage = async () => {
    const actions: { [message: string]: () => any } = {
      "Take a Photo": this.pickImageFromCamera,
      "Select from Camera Roll": this.pickImageFromRoll,
      "Cancel": this.goBack,
    }

    const options = Object.keys(actions)

    const onSelect = (i: number) => {
      const key = options[i]
      if (!key) return
      actions[key]()
    }

    ActionSheet.show({ options, cancelButtonIndex: options.length - 1 }, onSelect)
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
