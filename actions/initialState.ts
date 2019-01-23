import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { AsyncStorage } from "react-native";
import { Tags } from "../models/Tag";
import { Memo } from "../models/Memo";
import { Actions, ThunkResult } from ".";
import { Types } from "./../types"

const STORE_KEY = "store_v1"
export interface SavedState {
  memos: Array<Memo>,
  tags: Tags,
}

interface LoadInitialStateStartAction extends Action {
  type: Types.LOAD_INITIAL_STATE_START,
}

function loadInitialStateStart(): LoadInitialStateStartAction {
  return {
    type: Types.LOAD_INITIAL_STATE_START,
  }
}

interface LoadInitialStateEndAction extends Action {
  type: Types.LOAD_INITIAL_STATE_END,
  payload: SavedState | undefined | Error,
  error: boolean,
}

function loadInitialStateEnd(
  payload: SavedState | undefined | Error,
  error: boolean
): LoadInitialStateEndAction {
  return {
    type: Types.LOAD_INITIAL_STATE_END,
    error,
    payload,
  }
}

export function loadInitialState(): ThunkAction<Promise<void>, RootState, undefined, Actions> {
  return async (dispatch) => {
    dispatch(loadInitialStateStart())

    try {
      const maybeState = await AsyncStorage.getItem(STORE_KEY)
      if (maybeState) {
        try {
          const initialState: SavedState = JSON.parse(maybeState)

          dispatch(loadInitialStateEnd(initialState, false))
        } catch (err) {
          dispatch(loadInitialStateEnd(err, true))
        }
      }
    } catch (err) {
      dispatch(loadInitialStateEnd(err, true))
    }
  }
}

export function saveState(): ThunkResult<Promise<void>> {
  return (_dispatch, getState) => {
    const state = getState()
    const memos = state.memos.ids.
      map((id) => state.memos.byId[id])
    const tags = state.tags
    const savedState: SavedState = {
      memos,
      tags,
    }
    return AsyncStorage.setItem(
      STORE_KEY,
      JSON.stringify(savedState),
    )
  }
}


export type InitialStateActions =
  LoadInitialStateStartAction |
  LoadInitialStateEndAction
