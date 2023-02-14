import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { libraryActions } from "../store/library/library.slice"

const actions = {
  ...libraryActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}