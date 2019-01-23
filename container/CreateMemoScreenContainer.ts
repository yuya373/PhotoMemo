import { connect } from "react-redux";
import { CreateMemoScreen } from "../screens/CreateMemoScreen";
import { RootState } from "../reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { isValid } from "../reducers/memoFormReducer";
import { createMemoForm } from "../actions/memoFormAction";

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
      await dispatch(createMemoForm())
      navigation.navigate("Home")
    }
  }
}

export const CreateMemoScreenContainer =
  connect(mapStateToProps, mapDispatchToProps)(CreateMemoScreen)
