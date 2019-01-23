import { Action } from "redux";
import { ThunkResult } from ".";
import { TagsFilterScreen } from "../reducers/tagsFilterReducer";
import { Types } from "./../types"

interface FilterTagChangeAction extends Action {
  type: Types.FILTER_TAG_CHANGE,
  payload: {
    tag: string,
    screen: TagsFilterScreen,
  }
}

export function filterTagChange(
  { screen, tag }: {
    screen: TagsFilterScreen,
    tag: string
  },
): ThunkResult<Promise<void>> {
  return async (dispatch) => {
    dispatch({
      type: Types.FILTER_TAG_CHANGE,
      payload: {
        tag,
        screen,
      }
    })
  }
}

interface FilterByTagAction extends Action {
  type: Types.FILTER_BY_TAG,
  payload: {
    memoIds: Array<string>,
    screen: TagsFilterScreen,
  }
}

export function filterByTag({ screen }: { screen: TagsFilterScreen }): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const memoIds: Array<string> = []
    const state = getState()

    const tag = state.tagsFilter[screen].tag
    if (tag.length > 0) {
      state.tagMemo.ids.forEach((e) => {
        const tagMemo = state.tagMemo.byId[e]

        if (tagMemo.tag.indexOf(tag) >= 0) {
          const memoId = tagMemo.memoId

          if (screen === "browse") {
            if (state.memosFilter.memoIdsBySubCategory.includes(memoId)) {
              memoIds.push(memoId)
            }
          } else {
            memoIds.push(memoId)
          }
        }
      })
    }

    dispatch({
      type: Types.FILTER_BY_TAG,
      payload: {
        screen,
        memoIds,
      }
    })
  }
}

interface FilterTagChangeStartAction extends Action {
  type: Types.FILTER_TAG_CHANGE_START,
  payload: {
    screen: TagsFilterScreen,
  }
}

export function filterTagChangeStart({ screen }: { screen: TagsFilterScreen }): FilterTagChangeStartAction {
  return {
    type: Types.FILTER_TAG_CHANGE_START,
    payload: {
      screen,
    }
  }
}

export type TagsFilterActions = FilterTagChangeAction | FilterByTagAction | FilterTagChangeStartAction
