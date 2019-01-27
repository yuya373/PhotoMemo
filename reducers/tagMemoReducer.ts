import { Actions } from "../actions";
import { SavedState } from "./../actions/initialState"
import { generateId } from "../util";
import { Memo } from "../models/Memo";
import { Types } from "./../types";

interface TagMemo {
  id: string,
  tag: string,
  memoId: string,
}
export interface TagMemoState {
  byId: {
    [id: string]: TagMemo,
  },
  ids: Array<string>,
}

export const initialTagMemoState = {
  byId: {},
  ids: [],
}

function loadInitialState(
  state: TagMemoState,
  { error, payload }: {
    error: boolean,
    payload: SavedState | undefined | Error
  },
): TagMemoState {
  // TODO: handle error
  if (error || payload instanceof Error || payload == null)
    return state


  const byId: { [id: string]: TagMemo } = {}
  const ids: Array<string> = []
  payload.memos.forEach((memo) => {
    memo.tags.forEach((tag) => {
      const id = generateId()
      byId[id] = {
        id,
        tag,
        memoId: memo.id,
      }
      ids.push(id)
    })
  })

  return {
    byId,
    ids
  }
}

function createTagMemo(
  state: TagMemoState,
  payload: { newMemo: Memo },
): TagMemoState {
  const newMemo = payload.newMemo
  const newIds: Array<string> = []

  newMemo.tags.forEach((tag) => {
    const id = generateId()

    newIds.push(id)
    state.byId[id] = ({
      id,
      tag,
      memoId: newMemo.id,
    })
  })
  state.ids = newIds.concat(state.ids)

  return state
}

function updateTagMemo(
  state: TagMemoState,
  { memoId, tags }: {
    memoId: string,
    tags: Array<string>,
  }
): TagMemoState {
  const ids: Array<string> = []

  state.ids.forEach((id) => {
    const tagMemo = state.byId[id]
    if (tagMemo.memoId === memoId) {
      delete state.byId[id]
    } else {
      ids.push(id)
    }
  })

  const newIds = tags.map((tag) => {
    const id = generateId()
    state.byId[id] = {
      id,
      tag,
      memoId
    }
    return id
  })

  state.ids = newIds.concat(ids)
  return state
}

function deleteTagMemoByMemoId(
  state: TagMemoState,
  memoId: string,
): TagMemoState {
  const ids: Array<string> = []

  state.ids.forEach((id) => {
    const tagMemo = state.byId[id]
    if (tagMemo) {
      if (tagMemo.memoId !== memoId) {
        ids.push(tagMemo.id)
      } else {
        delete state.byId[id]
      }
    }
  })

  state.ids = ids

  return state
}

export function tagMemoReducer(
  state: TagMemoState,
  action: Actions,
): TagMemoState {
  switch (action.type) {
    case Types.LOAD_INITIAL_STATE_END:
      return loadInitialState(state, action)
    case Types.CREATE_MEMO:
      return createTagMemo(state, action.payload)
    case Types.MEMO_FORM_UPDATE_TAG_MEMO:
      return updateTagMemo(state, action.payload)
    case Types.DELETE_MEMO:
      return deleteTagMemoByMemoId(state, action.payload.id)
    default:
      return state
  }
}
