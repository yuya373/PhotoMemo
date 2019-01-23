import { RootState } from "../reducers";
import { connect } from "react-redux";
import { EditMemoScreen } from "../screens/EditMemoScreen";
import { isValid } from "../reducers/memoFormReducer";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { saveMemoForm } from "../actions/memoFormAction";

function mapStateToProps(state: RootState) {
  return {
    isValid: isValid(state.memoForm),
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> },
) {
  return {
    goBack: () => navigation.goBack(),
    save: async () => {
      await dispatch(saveMemoForm())
      navigation.goBack()
    }
  }
}

export const EditMemoScreenContainer =
  connect(mapStateToProps, mapDispatchToProps)(EditMemoScreen)
