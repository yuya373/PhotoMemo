import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../reducers";
import { Actions } from ".";
import { Image } from "react-native";
import { updateMemo } from "./memosAction";
import { Types } from "./../types"

interface ImageScreenGetSizeStartAction extends Action {
  type: Types.IMAGE_SCREEN_GET_SIZE_START,
}

interface ImageScreenGetSizeEndAction extends Action {
  type: Types.IMAGE_SCREEN_GET_SIZE_END,
  payload: Error | { uri: string, width: number, height: number },
  error: boolean,
}

export function getImageMeta(memoId: string): ThunkAction<Promise<void>, RootState, undefined, Actions> {
  return async (dispatch, getState) => {
    dispatch({ type: Types.IMAGE_SCREEN_GET_SIZE_START })
    const state = getState()
    const memo = state.memos.byId[memoId]
    if (memo.width && memo.height) {
      dispatch({
        type: Types.IMAGE_SCREEN_GET_SIZE_END,
        error: false,
        payload: {
          uri: memo.uri,
          width: memo.width,
          height: memo.height,
        }
      })
      return
    }
    return new Promise((resolve) => {
      Image.getSize(
        memo.uri,
        (width: number, height: number) => {
          dispatch({
            type: Types.IMAGE_SCREEN_GET_SIZE_END,
            error: false,
            payload: {
              uri: memo.uri,
              width,
              height,
            }
          })
          dispatch(updateMemo({
            ...memo,
            width,
            height,
          }))
          resolve()
        },
        (error) => {
          dispatch({
            type: Types.IMAGE_SCREEN_GET_SIZE_END,
            error: true,
            payload: error,
          })
          resolve()
        }
      )

    })
  }
}

export type ImageScreenActions = ImageScreenGetSizeStartAction | ImageScreenGetSizeEndAction
