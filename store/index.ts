// import { Container } from 'unstated';
// import { Memo, create as createMemo, NewMemo } from "./../models/Memo"
// import { Tag, Tags, addTag, Label } from "./../models/Tag"
// import { AsyncStorage } from "react-native"
// import STORE_KEY from "./key"

// export interface State {
//   memos: Array<Memo>,
//   tags: Tags,
// }
// export default class Store extends Container<State> {
//   constructor(initialState: any = {}) {
//     super()
//     this.state = {
//       memos: initialState.memos || [],
//       tags: initialState.tags || {
//         "0": [],
//         "1": [],
//         "2": [],
//       },
//     }
//   }

//   storeState = (): Promise<void> => {
//     return AsyncStorage.setItem(STORE_KEY, JSON.stringify(this.state))
//   }

//   createTag = async (tag: Tag): Promise<void> => {
//     await this.setState(
//       (s) => ({
//         ...s,
//         tags: addTag(s.tags, tag)
//       })
//     )
//     return this.storeState()
//   }

//   createMemo = async (memo: NewMemo): Promise<void> => {
//     await this.setState((s) => ({
//       ...s,
//       memos: [createMemo(memo)].concat(s.memos),
//     }))
//     return this.storeState()
//   }

//   updateMemo = async (memo: Memo): Promise<void> => {
//     await this.setState((s) => {
//       const memos = s.memos.map((e) => {
//         if (e.id === memo.id) return memo
//         return e
//       })
//       return { ...s, memos }
//     })
//     return this.storeState()
//   }


// }
