import React, { PureComponent } from 'react';
import { Camera, Permissions } from "expo"
import { View, SafeAreaView, StyleSheet } from "react-native"
import { NavigationScreenProp } from 'react-navigation';
import { Button, Icon, Container } from "native-base"
import Colors from "./../constants/Colors"

interface State {
  hasCameraPermission: null | boolean
  pictureTaking: boolean
  type: string
}

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class CameraScreen extends PureComponent<Props, State> {
  camera: null | Camera = null
  state = {
    hasCameraPermission: null,
    pictureTaking: false,
    type: Camera.Constants.Type.back,
  }

  goBack = () => {
    if (!this.props.navigation.goBack()) {
      this.props.navigation.navigate("Main")
    }
  }

  takePicture = () => {
    if (!this.state.pictureTaking) {
      this.setState(
        (s) => ({ ...s, pictureTaking: true }),
        () => {
          if (this.camera == null) {
            this.setState({ pictureTaking: false })
            return
          }

          this.camera.takePictureAsync({
            quality: 1.0,
            exif: true,
          }).then(({ uri }) => {
            this.setState({ pictureTaking: false })
            console.log("uri", uri)
          }).catch((err) => {
            this.setState({ pictureTaking: false })
            console.error(err)
          })
        }
      )
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
        <View style={styles.container} >
          <Camera
            ref={(ref) => this.camera = ref}
            autoFocus="on"
            ratio="1:1"
            style={{ flex: 1 }}
            type={type}
          >
            <SafeAreaView style={styles.uiContainer} >
              <Container style={styles.topContainer}>
                <Container style={styles.closeButtonContainer}>
                  <Button
                    style={styles.closeButton}
                    large={true}
                    transparent={true}
                    onPress={this.goBack}
                  >
                    <Icon
                      style={styles.closeIcon}
                      name="close-circle-outline"
                    />
                  </Button>
                </Container>
              </Container>
              <Container style={styles.bottomContainer} >
                <Container style={styles.shootButtonContainer}>
                  <Button
                    large={true}
                    transparent={true}
                    style={styles.shootButton}
                    onPress={this.takePicture}
                  >
                    <Icon
                      style={styles.shootIcon}
                      name="radio-button-on"
                    />
                  </Button>
                </Container>
              </Container>
            </SafeAreaView>
          </Camera>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uiContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  bottomContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  closeButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  closeButton: {
  },
  closeIcon: {
    color: Colors.noticeText,
    fontSize: 27 * 1.5,
  },
  shootButtonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  shootButton: {
    marginBottom: 16,
    height: 27 * 4,
  },
  shootIcon: {
    color: Colors.noticeText,
    fontSize: 27 * 3,
  },
})
