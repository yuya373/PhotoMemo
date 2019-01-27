import { Actions } from "../actions";
import { Types } from "./../types";

export const initialMemosFilterState = {
  category: "",
  subCategory: "",
  memoIdsByCategory: [],
  memoIdsBySubCategory: [],
}

export interface MemosFilterState {
  category: string,
  subCategory: string,
  memoIdsByCategory: Array<string>,
  memoIdsBySubCategory: Array<string>,
}

function filterCategoryChange(
  state: MemosFilterState,
  { category, memoIds }: { category: string, memoIds: Array<string> },
): MemosFilterState {
  state.category = category
  state.memoIdsByCategory = memoIds
  return state
}

function filterSubCategoryChange(
  state: MemosFilterState,
  { subCategory, memoIds }: { subCategory: string, memoIds: Array<string> },
): MemosFilterState {
  state.subCategory = subCategory
  state.memoIdsBySubCategory = memoIds
  return state
}

function deleteMemo(state: MemosFilterState, id: string) {
  state.memoIdsByCategory =
    state.memoIdsByCategory.filter((e) => e !== id)
  state.memoIdsBySubCategory =
    state.memoIdsBySubCategory.filter((e) => e !== id)
  return state
}

export function memosFilterReducer(
  state: MemosFilterState,
  action: Actions,
): MemosFilterState {
  switch (action.type) {
    case Types.FILTER_SUB_CATEGORY_CHANGE:
      return filterSubCategoryChange(state, action.payload)
    case Types.FILTER_CATEGORY_CHANGE:
      return filterCategoryChange(state, action.payload)
    case Types.DELETE_MEMO:
      return deleteMemo(state, action.payload.id)
    default:
      return state
  }
}
