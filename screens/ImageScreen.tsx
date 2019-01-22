import React from "react"
import { NavigationScreenProp } from "react-navigation";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Container, Content, Button, Icon } from "native-base"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}
interface State {
  uri: string,
  width: number | undefined,
  height: number | undefined,
}

export default class ImageScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { navigation } = props
    const uri = navigation.getParam("uri", null)
    if (!uri) {
      navigation.goBack()
      return
    }

    const width = navigation.getParam("width", undefined)
    const height = navigation.getParam("height", undefined)
    this.state = {
      uri,
      width,
      height
    }
  }

  componentDidMount() {
    const {
      uri,
      width,
      height,
    } = this.state

    if (width == null || height == null) {
      Image.getSize(
        uri,
        (width, height) => this.setState({ width, height }),
        (error) => {
          console.error(error)
          this.props.navigation.goBack()
        }
      )
    }
  }

  render() {
    const { navigation } = this.props
    const {
      uri,
      width,
      height,
    } = this.state
    const w = Dimensions.get('window')
    const ww = w.width;
    const wh = w.height;

    const scaleX =
      width ? ((width > ww) ? ww / width : width / ww) : 1
    const scaleY =
      height ? ((height > wh) ? wh / height : height / wh) : 1
    const minZoom = Math.min(scaleX, scaleY)
    const maxZoom = 1 / minZoom

    return (
      <Container>
        <Content style={styles.closeIconContainer}>
          <Button
            transparent
            large
            dark
            onPress={() => navigation.goBack()}
          >
            <Icon name="close-circle-outline" />
          </Button>
        </Content>
        <ScrollView
          horizontal={true}
          centerContent={true}
          maximumZoomScale={maxZoom}
        >
          <ScrollView
            centerContent={true}
            maximumZoomScale={maxZoom}
          >
            <Image
              style={{
                width: width ? width * minZoom : width,
                height: height ? height * minZoom : height,
              }}
              source={{ uri }}
            />
          </ScrollView>
        </ScrollView>
      </Container >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconContainer: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 1,
  }
})
