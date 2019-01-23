import { Permissions, ImagePicker } from "expo"
import { Platform } from "react-native"

const askPermission = async (perm: Permissions.CAMERA | Permissions.CAMERA_ROLL): Promise<boolean> => {
  if (Platform.OS === "ios") {
    try {
      const { status } = await Permissions.askAsync(perm);
      return status === "granted"
    } catch (err) {
      console.warn(err)
      return false
    }
  } else {
    return true
  }
}

interface ImageResult {
  cancelled: boolean,
  error: boolean,
  payload?: {
    uri: string,
    width: number,
    height: number
  } | Error
}

const handleError = (error: Error): ImageResult => ({
  cancelled: false,
  error: true,
  payload: error,
})

const handleResult = ({
  cancelled, uri, width, height
}: {
  cancelled: boolean,
  uri?: string,
  width?: number,
  height?: number
}): ImageResult => ({
  error: false,
  cancelled,
  payload: cancelled ? undefined : {
    uri: uri!,
    width: width!,
    height: height!
  }
})

export const pickImage = async (): Promise<ImageResult> => {
  try {
    const hasPermission = await askPermission(Permissions.CAMERA_ROLL)
    if (!hasPermission) {
      return { cancelled: true, error: false }
    }
  } catch (err) {
    return handleError(err)
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1.0,
    })
    return handleResult(result)
  } catch (err) {
    return handleError(err)
  }
}

export const takePhoto = async (): Promise<ImageResult> => {
  try {
    const [cameraPerm, cameraRollPerm] = await Promise.all([
      askPermission(Permissions.CAMERA),
      askPermission(Permissions.CAMERA_ROLL),
    ])

    const hasPermission = cameraPerm && cameraRollPerm
    if (!hasPermission) {
      return { cancelled: true, error: false }
    }
  } catch (err) {
    return handleError(err)
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1.0,
    })
    return handleResult(result)
  } catch (err) {
    return handleError(err)
  }
}
