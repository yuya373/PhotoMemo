import { Action } from "redux";
import { ThunkResult } from ".";
import { Types } from "./../types"

interface FilterCategoryChangeAction extends Action {
  type: Types.FILTER_CATEGORY_CHANGE,
  payload: {
    category: string,
    memoIds: Array<string>,
  }
}

export function filterCategoryChange(category: string): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState()
    const memoIds: Array<string> = []
    state.memos.ids.forEach((id) => {
      const memo = state.memos.byId[id]
      if (memo.category === category) {
        memoIds.push(id)
      }
    })

    dispatch({
      type: Types.FILTER_CATEGORY_CHANGE,
      payload: {
        category,
        memoIds,
      }
    })
  }
}

interface FilterSubCategoryChangeAction extends Action {
  type: Types.FILTER_SUB_CATEGORY_CHANGE,
  payload: {
    subCategory: string,
    memoIds: Array<string>,
  }
}

export function filterSubCategoryChange(subCategory: string): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState()
    const memoIds: Array<string> = []
    state.memosFilter.memoIdsByCategory.forEach((id) => {
      const memo = state.memos.byId[id]
      if (memo.subCategory === subCategory) {
        memoIds.push(id)
      }
    })

    dispatch({
      type: Types.FILTER_SUB_CATEGORY_CHANGE,
      payload: {
        subCategory,
        memoIds,
      }
    })
  }
}

export type FilterMemosActions = FilterCategoryChangeAction | FilterSubCategoryChangeAction
