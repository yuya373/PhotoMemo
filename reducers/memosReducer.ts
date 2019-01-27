import { Memo } from "../models/Memo";
import { Types } from "./../types";
import { SavedState } from "./../actions/initialState"
import { Actions } from "../actions";

export interface MemosState {
  byId: {
    [memoId: string]: Memo,
  },
  ids: Array<string>,
}

function updateMemo(state: MemosState, memo: Memo): MemosState {
  state.byId[memo.id] = memo
  return state
}

function createMemo(state: MemosState, newMemo: Memo): MemosState {
  state.byId[newMemo.id] = {
    ...newMemo,
  }
  state.ids = [newMemo.id].concat(state.ids)
  return state
}

function deleteMemo(state: MemosState, id: string): MemosState {
  state.ids = state.ids.filter((e) => e !== id)
  delete state.byId[id]
  return state
}

export const initialMemosState = {
  byId: {},
  ids: [],
}

function loadInitialState(
  state: MemosState,
  { payload, error }: {
    payload: SavedState | undefined | Error,
    error: boolean
  }
): MemosState {
  if (error || payload instanceof Error || payload == null) {
    return state
  }
  const ids: Array<string> = []
  const byId: { [memoId: string]: Memo } = {}
  payload.memos.forEach((e) => {
    ids.push(e.id)
    byId[e.id] = e
  })

  return {
    byId,
    ids,
  }
}

export function memosReducer(
  state: MemosState,
  action: Actions,
) {
  switch (action.type) {
    case Types.LOAD_INITIAL_STATE_END:
      return loadInitialState(state, action)
    case Types.UPDATE_MEMO:
      return updateMemo(state, action.payload.memo)
    case Types.CREATE_MEMO:
      return createMemo(state, action.payload.newMemo)
    case Types.DELETE_MEMO:
      return deleteMemo(state, action.payload.id)
    default:
      return state
  }
}
