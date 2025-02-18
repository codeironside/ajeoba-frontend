import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import AjTypography from "../../../Components/AjTypography";
import AjCustomTable from "../../../Components/AjCustomTable/AjCustomTable";
import {
  getBlogPostsListAction,
  deleteBlogAction,
  updateToBeEditedValueFromSessionStorge,
} from "../../../Redux/SuperAdmin/BlogManagement/blogActions";
import {
  SKIP,
  LIMIT,
} from "../../../Constant/AppConstant";
import { MANAGE_SUPPORT } from "../../../Routes/Routes";
import { styles } from "../BlogManagement/blogManagerListingStyle";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { showToast } from "../../../Services/toast";

const BlogManagerListing = (props) => {
  const { searchClick, searchText } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogData = useSelector((state) => state.blog?.blogList);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Title", ellipsisClass: true, width: "15%" },
    { field: "Author", width: "18%" },
    { field: "Created at", ellipsisClass: true, width: "18%" },
    { field: "Reading Time", width: "18%" },
    { field: "", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  let actionsArray = [
    {
      name: "Edit",
      type: "anchor",
      actionClickHandler: (id) => {
        const obj = blogData?.blogs?.find(
          (data) => data.id === id
        );
        editHandler(obj);
      },
    },
    {
        name: "Delete",
        type: "anchor",
        actionClickHandler: (id) => {
          deleteHandler(id)
        },
      },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        filterText: searchText,
        skip: SKIP,
      };
    }
    dispatch(getBlogPostsListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    dispatch(getBlogPostsListAction());
  }, []);

  useEffect(() => {
    const dataSet = blogData?.blogs?.map((item) => {
      const itemData = {
        "Title": item.title,
        "Author": item.author,
        id: item.id,
        "Created at": item.created_at,
        "Reading Time": `${moment(item.created_at).format("DD/MM/YYYY")}
         ${moment(item.created_at).format("LT")}`,
      };
      return itemData;
    });
    setData(dataSet);
  }, [blogData]);

  const editHandler = (obj) => {
    const forEditBlogData = JSON.stringify(obj);
    sessionStorage.setItem(
      "forEditBlogData",
      encrypt(forEditBlogData, PASSWORD_ENCRYPTION_SECRET)
    );
    dispatch(updateToBeEditedValueFromSessionStorge());
    navigate(`edit/${obj.id}`);
  };

  const deleteHandler = (id) => {
    dispatch(deleteBlogAction(id));
  }

  const getHtmlFromRaw = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent;
  };

  return (
    <>
      {blogData?.blogs?.length === 0 ? (
        <Box sx={{ ...commonStyles.noContentBox, ...styles.masterNocontent }}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          actions={actionsArray}
          rowData={data}
          query={query}
          pagination={true}
          setQuery={setQuery}
          totalCount={blogData?.totalCount}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
    </>
  );
};

export default BlogManagerListing;
