import { Container } from 'unstated';
import { Memo, create as createMemo, NewMemo } from "./../models/Memo"
import { Tag, Tags, addTag, Label } from "./../models/Tag"
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

  createMemo = async (memo: NewMemo): Promise<void> => {
    await this.setState((s) => ({
      ...s,
      memos: [createMemo(memo)].concat(s.memos),
    }))
    return this.storeState()
  }

  updateMemo = async (memo: Memo): Promise<void> => {
    await this.setState((s) => {
      const memos = s.memos.map((e) => {
        if (e.id === memo.id) return memo
        return e
      })
      return { ...s, memos }
    })
    return this.storeState()
  }

  findMemo = (id: string | null | undefined): Memo | undefined => {
    return this.state.memos.find((e) => e.id === id)
  }

  findCategory = (label: string): Tag | undefined => {
    return this.state.tags["0"].find((e) => e.label === label)
  }

  findSubCategory = (label: string): Tag | undefined => {
    return this.state.tags["1"].find((e) => e.label === label)
  }

  findTags = (labels: Array<string>): Array<Tag> => {
    const tags: Array<Tag> = []

    labels.forEach((label) => {
      const tag = this.state.tags["2"].
        find((e) => e.label === label)

      if (tag) {
        tags.push(tag)
      }
    })

    return tags
  }

  collectCategory = (): Array<{ category: Tag, subCategories: Set<Label> }> => {
    const items: { [category: string]: { category: Tag, subCategories: Set<Label> } } = {}
    const _cat: { [label: string]: Tag } = this.state.tags["0"].reduce((
      a: { [label: string]: Tag },
      e: Tag
    ) => {
      a[e.label] = e
      return a
    }, {})

    this.state.memos.forEach((e) => {
      const cat = _cat[e.category]
      if (cat) {
        if (!items[cat.label]) {
          items[cat.label] = {
            category: cat,
            subCategories: new Set([]),
          }
        }

        items[cat.label].subCategories.add(e.subCategory)
      }
    })

    return Object.values(items)
  }
}
