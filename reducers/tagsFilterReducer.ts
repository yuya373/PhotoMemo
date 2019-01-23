import { Actions } from "../actions";
import { Types } from "./../types";

export type TagsFilterScreen = "home" | "browse"
export type TagsFilterState = {
  [screen in TagsFilterScreen]: {
    tag: string,
    memoIds: Array<string>,
    isEditing: boolean,
  }
}

export const initialTagsFilterState: TagsFilterState = {
  home: {
    tag: "",
    memoIds: [],
    isEditing: false,
  },
  browse: {
    tag: "",
    memoIds: [],
    isEditing: false,
  },
}

function filterByTag(
  state: TagsFilterState,
  { memoIds, screen }: {
    memoIds: Array<string>,
    screen: TagsFilterScreen,
  },
): TagsFilterState {

  state[screen].memoIds = memoIds
  state[screen].isEditing = false

  return state
}

function filterTagChange(
  state: TagsFilterState,
  { tag, screen }: { tag: string, screen: TagsFilterScreen },
): TagsFilterState {
  state[screen].tag = tag
  state[screen].isEditing = true
  return state
}

function filterTagChangeStart(
  state: TagsFilterState,
  { screen }: { screen: TagsFilterScreen },
): TagsFilterState {
  state[screen].isEditing = true
  return state
}

export function tagsFilterReducer(
  state: TagsFilterState,
  action: Actions,
): TagsFilterState {
  switch (action.type) {
    case Types.FILTER_TAG_CHANGE_START:
      return filterTagChangeStart(state, action.payload)
    case Types.FILTER_TAG_CHANGE:
      return filterTagChange(state, action.payload)
    case Types.FILTER_BY_TAG:
      return filterByTag(state, action.payload)
    default:
      return state
  }
}
