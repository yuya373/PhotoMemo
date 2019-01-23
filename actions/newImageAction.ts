import { ActionSheet } from 'native-base';
import { takePhoto, pickImage } from "../util/camera";
import { ThunkResult } from '.';
import { Action } from 'redux';
import { Types } from "./../types"

interface StoreNewImageAction extends Action {
  type: Types.STORE_NEW_IMAGE,
  payload: {
    uri: string,
    width: number,
    height: number,
  }
}

const actions: {
  [message: string]: () => "camera" | "roll" | undefined
} = {
  "Take a Photo": () => "camera",
  "Select from Camera Roll": () => "roll",
  "Cancel": () => undefined,
}

const selectCamera = (handler: (i: number) => Promise<boolean>): Promise<boolean> => {
  return new Promise((resolve) => {
    const options = Object.keys(actions)

    ActionSheet.show(
      {
        options,
        cancelButtonIndex: options.length - 1
      },
      (i) => {
        resolve(handler(i))
      },
    )
  })
}

export function storeNewImage(): ThunkResult<Promise<boolean>> {
  return async (dispatch) => {
    return selectCamera(async (i: number) => {
      const options = Object.keys(actions)
      const key = options[i]
      const source = actions[key]()
      if (source == null) return false

      const result = await (source === "camera" ? takePhoto : pickImage)()
      const {
        cancelled,
        error,
        payload,
      } = result
      if (cancelled) {
        return false
      }
      // TODO handle error
      if (payload == null || error || payload instanceof Error) {
        return false
      }

      dispatch({
        type: Types.STORE_NEW_IMAGE,
        payload: payload,
      })
      return true
    })
  }
}

export type NewImageActions = StoreNewImageAction
