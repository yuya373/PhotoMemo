import React from "react"
import { NavigationScreenProp } from "react-navigation";
import { Image, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Container, Content, Button, Icon } from "native-base"
import { Subscribe } from "unstated"
import Store from "./../store"
import { Memo } from "../models/Memo";

interface Props {
  navigation: NavigationScreenProp<any, any>,
  store: Store,
}
interface State {
  memo: Memo,
}

class ImageScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const { navigation, store } = props
    const id = navigation.getParam("id", null)
    if (!id) {
      navigation.goBack()
      console.error(`id not found`)
      return
    }
    const memo = store.findMemo(id)
    if (!memo) {
      navigation.goBack()
      console.error(`Memo not found: ${id}`)
      return
    }

    this.state = {
      memo,
    }
  }

  componentDidMount() {
    const {
      uri,
      width,
      height,
    } = this.state.memo

    if (width == null || height == null) {
      Image.getSize(
        uri,
        async (width, height) => {
          const memo = {
            ...this.state.memo,
            width,
            height,
          }
          await this.props.store.updateMemo(memo)
          this.setState({ memo })
        },
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
    } = this.state.memo
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

export default ({ navigation }: { navigation: NavigationScreenProp<any, any> }) => (
  <Subscribe to={[Store]}>
    {
      (store: Store) => (
        <ImageScreen
          navigation={navigation}
          store={store}
        />
      )
    }
  </Subscribe>
)
