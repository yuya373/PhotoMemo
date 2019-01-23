import React from "react"
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Container, Content, Button, Icon } from "native-base"

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  uri: string,
  width: number,
  height: number,
  isLoading: boolean,
}

export class ImageScreen extends React.Component<Props, {}> {
  render() {
    const {
      isLoading,
      uri,
      width,
      height,
      navigation,
    } = this.props

    // TODO: display loading
    if (isLoading) return null

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
