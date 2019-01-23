import { RootState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { connect } from "react-redux";
import MemoForm from "../../components/MemoForm";

function mapStateToProps(state: RootState) {
  return {
    uri: state.memoForm.uri,
    tags: state.memoForm.tags,
    category: state.memoForm.category,
    subCategory: state.memoForm.subCategory,
  }
}

function mapDispatchToProps(
  _dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> }
) {
  return {
    onPressCategory: () => navigation.navigate("CategoryPicker"),
    onPressSubCategory: () =>
      navigation.navigate("SubCategoryPicker"),
    onPressTags: () => navigation.navigate("TagsPicker"),
  }
}

export const MemoFormContainer =
  connect(mapStateToProps, mapDispatchToProps)(MemoForm)
