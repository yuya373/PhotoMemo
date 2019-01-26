import { Action } from "redux";
import { RootState } from "../reducers";
import { ThunkResult } from ".";
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

interface ImageMeta {
  uri: string,
  width: number | undefined,
  height: number | undefined,
}

const getMetaById = (state: RootState, id: string): ImageMeta => {
  const memo = state.memos.byId[id]
  return {
    uri: memo.uri,
    width: memo.width,
    height: memo.height,
  }
}

const getMetaByForm = (state: RootState): ImageMeta => {
  return state.memoForm
}

function getSizeEnd(
  error: boolean,
  payload: {
    uri: string,
    width: number,
    height: number,
  } | Error
): ImageScreenGetSizeEndAction {
  return {
    type: Types.IMAGE_SCREEN_GET_SIZE_END,
    error,
    payload,
  }
}

const getImageSize = (uri: string): Promise<{ width: number, height: number }> => new Promise((resolve, reject) => {
  Image.getSize(
    uri,
    (width: number, height: number) => resolve({ width, height }),
    (err) => reject(err)
  )
})

export function getImageMeta(memoId?: string): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch({ type: Types.IMAGE_SCREEN_GET_SIZE_START })
    const state = getState()
    const {
      uri,
      width,
      height,
    } = memoId ? getMetaById(state, memoId) : getMetaByForm(state)

    if (width && height) {
      dispatch(getSizeEnd(false, {
        uri,
        width,
        height,
      }))
      return
    } else {
      try {
        const { width, height } = await getImageSize(uri)
        dispatch(getSizeEnd(false, {
          uri,
          width,
          height,
        }))
        const memo = memoId && getState().memos.byId[memoId]
        if (memo) {
          dispatch(updateMemo({
            ...memo,
            width,
            height,
          }))
        }
      } catch (err) {
        dispatch(getSizeEnd(true, err))
      }
    }
  }
}

export type ImageScreenActions = ImageScreenGetSizeStartAction | ImageScreenGetSizeEndAction
