import { connect } from "react-redux";
import { createTag } from "../actions/tagsAction";
import { CreateTagScreen } from "../screens/CreateTagScreen";

function mapStateToProps() {
  return {
  }
}

export const CreateTagScreenContainer =
  connect(mapStateToProps, { createTag })(CreateTagScreen)
