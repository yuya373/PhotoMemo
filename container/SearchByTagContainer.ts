import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reducers";
import { Actions } from "../actions";
import { connect } from "react-redux";
import Search from "../components/Search";
import { TagsFilterScreen } from "../reducers/tagsFilterReducer";
import { filterTagChange, filterByTag, filterTagChangeStart } from "../actions/tagsFilterAction";

function mapStateToProps(state: RootState, { screen }: { screen: TagsFilterScreen }) {
  return {
    inputValue: state.tagsFilter[screen].tag,
    placeholder: "Search by tag",
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { screen }: { screen: TagsFilterScreen },
) {
  return {
    onClear: () => {
      dispatch(filterTagChange({ tag: "", screen }))
      dispatch(filterByTag({ screen }))
    },
    onChangeText: (text: string) => dispatch(filterTagChange({
      tag: text,
      screen,
    })),
    onFocus: () => dispatch(filterTagChangeStart({ screen })),
    onBlur: () => dispatch(filterByTag({ screen })),
    onSubmit: () => dispatch(filterByTag({ screen })),
  }
}

export const SearchByTagContainer =
  connect(mapStateToProps, mapDispatchToProps)(Search)
