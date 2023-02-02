import { useEffect, useState } from "react";
import { getDataFromServer } from "../utils/apiUtils";
import { ROW_PER_PAGE_DEFAULT_VALUE } from "../utils/Constants";

export default function useInitialRender(url) {
  const [tableData, setTableData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  async function getTableData(pageParam, rowPerPageParam, params = {}) {
    let queryString = {
      page: pageParam || 1,
      rowPerPage: rowPerPageParam || ROW_PER_PAGE_DEFAULT_VALUE,
      ...params
    }
    let response = await getDataFromServer(url, queryString);
    setTableData(response.response || []);
    setTotalCount(response.totalCount)
  }

  useEffect(() => {
    getTableData()
  }, [])

  return { tableData, totalCount, getTableData }
}