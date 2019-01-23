import { Tag } from "../models/Tag";
import { SavedState } from "./../actions/initialState"
import { Actions } from "../actions";
import { Types } from "../types"

export type TagLevel = "0" | "1" | "2"

export interface TagsState {
  "0": Array<Tag>,
  "1": Array<Tag>,
  "2": Array<Tag>,
}

export const initialTagsState = {
  "0": [],
  "1": [],
  "2": [],
}

function createTag(
  state: TagsState,
  { label, level }: { label: string, level: TagLevel },
): TagsState {
  if (state[level].find((e) => e.label === label)) {
    return state
  }

  return {
    ...state,
    [level]: state[level].concat([{ label, level }]),
  }
}

function loadInitialState(
  state: TagsState,
  { payload, error }: {
    payload: SavedState | undefined | Error,
    error: boolean,
  },
): TagsState {
  if (error || payload instanceof Error || payload == null) {
    return state
  }

  return payload.tags
}

export function tagsReducer(
  state: TagsState,
  action: Actions,
): TagsState {
  switch (action.type) {
    case Types.LOAD_INITIAL_STATE_END:
      return loadInitialState(state, action)
    case Types.CREATE_TAG:
      return createTag(state, action.payload)
    default:
      return state
  }
}
