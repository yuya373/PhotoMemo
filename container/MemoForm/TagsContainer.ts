import { RootState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { memoFormChangeTag } from "../../actions/memoFormAction";
import { TagLevel } from "../../reducers/tagsReducer";
import { connect } from "react-redux";
import { Tags } from "../../components/MemoForm/Tags";

function mapStateToProps(state: RootState) {
  return {
    selected: state.memoForm.tags,
    tags: state.tags[2],
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> }
) {
  return {
    goBack: () => navigation.goBack(),
    onPressItem: (tag: string) =>
      dispatch(memoFormChangeTag(tag)),
    onPressAddItem: (level: TagLevel) =>
      navigation.navigate("CreateTag", { level })
  }
}

export const TagsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Tags)
