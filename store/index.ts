import { Container } from 'unstated';
import { Memo } from "./../models/Memo"
import { Tag, Tags, addTag } from "./../models/Tag"
import { AsyncStorage } from "react-native"
import STORE_KEY from "./key"

export interface State {
  memos: Array<Memo>,
  tags: Tags,
}
export default class Store extends Container<State> {
  constructor(initialState: any = {}) {
    super()
    this.state = {
      memos: initialState.memos || [],
      tags: initialState.tags || {
        "0": [],
        "1": [],
        "2": [],
      },
    }
  }

  storeState = (): Promise<void> => {
    return AsyncStorage.setItem(STORE_KEY, JSON.stringify(this.state))
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

  addMemo = async (memo: Memo): Promise<void> => {
    await this.setState((s) => ({
      ...s,
      memos: [memo].concat(s.memos),
    }))
    return this.storeState()
  }

}
