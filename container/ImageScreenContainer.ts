import { RootState } from "../reducers";
import { connect } from "react-redux";
import { ImageScreen } from "../screens/ImageScreen";
import { updateMemo } from "../actions/memosAction";

function mapStateToProps(state: RootState) {
  return {
    ...state.imageScreen
  }
}


export const ImageScreenContainer =
  connect(mapStateToProps, { updateMemo })(ImageScreen)
