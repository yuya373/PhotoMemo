import { Container } from 'unstated';
import { Image } from "./../models/Image"
import { Tag, Tags, addTag } from "./../models/Tag"
import { AsyncStorage } from "react-native"

export interface State {
  images: Array<Image>,
  tags: Tags,
}
export default class Store extends Container<State> {
  constructor(initialState: any = {}) {
    super()
    this.state = {
      images: initialState.images || [],
      tags: initialState.tags || {
        "0": [],
        "1": [],
        "2": [],
      },
    }
  }

  storeState = (): Promise<void> => {
    return AsyncStorage.setItem("state", JSON.stringify(this.state))
  }

  createTag = async (tag: Tag): Promise<void> => {
    await this.setState(
      (s) => ({
        ...s,
        tags: addTag(s.tags, tag)
      })
    )
    return this.storeState()
  }

  addImage = (image: Image) => {
    this.setState((s) => ({
      ...s,
      images: s.images.concat([image]),
    }))
  }

}
