import { RESET_TABLE_PAGE_NUMBER } from "../utils/Constants";

const reducer = (resetPageNumber = false, action) => {
  switch (action.type) {
    case RESET_TABLE_PAGE_NUMBER:
      return !resetPageNumber;
    default:
      return resetPageNumber;
  }
}

export default reducer;