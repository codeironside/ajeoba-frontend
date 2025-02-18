import React from "react";
import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import { LIMIT } from "../../Constant/AppConstant";
import { useStyles } from "../AjCustomTable/AjCustomTableStyles";
import { commonStyles } from "../../Style/CommonStyle";

const CustomPagination = (props) => {
  const { setQuery, totalCount, query, customStyle, customLimit } = props;
  let limit = customLimit || LIMIT;
  const classes = useStyles();
  const nextIcon = (isNext) => (
    <Typography>{isNext ? "Next" : "Previous"}</Typography>
  );
  const handlePagination = (e) => {
    switch (e.target.textContent) {
      case "Next":
        setQuery((prev) => ({
          ...prev,
          skip: prev.skip + limit,
        }));
        break;
      case "Previous":
        setQuery((prev) => ({
          ...prev,
          skip: prev.skip - limit,
        }));
        break;
      default:
        setQuery((prev) => ({
          ...prev,
          limit: limit,
          skip: (Number(e.target.textContent) - 1) * limit,
        }));
        break;
    }
  };
  return (
    <Box sx={{ ...commonStyles.paginationBox, ...customStyle, }}>
      <Pagination
        className={classes.pagination}
        count={parseInt(Math.ceil(totalCount / query.limit)) || 0}
        variant="outlined"
        shape="rounded"
        page={query.skip / limit + 1}
        onChange={handlePagination}
        renderItem={(item) => (
          <PaginationItem
            components={{
              previous: () => nextIcon(false),
              next: () => nextIcon(true),
            }}
            {...item}
          />
        )}
      />
    </Box>
  );
};

export default CustomPagination;
