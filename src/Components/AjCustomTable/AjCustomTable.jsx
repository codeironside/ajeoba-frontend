import React, { useEffect } from "react";
import { styles as customTableStyles } from "../../Components/AjCustomTable/AjCustomTableStyles";
import { LOGISTICS } from "../../Routes/Routes";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  Button,
  Checkbox,
} from "@mui/material";
import TableActions from "../TableActions/TableActions";
import { styles } from "./AjCustomTableStyles";
import { LIGHT_GREEN, WHITE } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";
import CustomPagination from "../CustomPagination/CustomPagination";

const AjCustomTable = (props) => {
  const navigate = useNavigate();
  const {
    columnDefs,
    rowData,
    pagination,
    setQuery,
    query,
    totalCount,
    actions,
    options,
    tableWrapperStyles,
    isConfirmModalRequired = false,
    modalConfirmationMessage,
    ellipsisMaxWidth,
    getColor,
    handleCheckboxChange,
    isWaived,
  } = props;

  useEffect(() => {}, [rowData]);

  const fieldDataWithTypography = (head, field, customColor) => {
    let color;
    let textAlign;
    if (field === "FAILED") {
      color = "red";
      textAlign = "center";
    } else if (field === "PENDING") {
      color = "#FFB100";
      textAlign = "center";
    } else if (field === "SUCCESS") {
      color = "#006d33";
      textAlign = "center";
    } else if (field === "PASSED") {
      color = "#006d33";
      textAlign = "center";
    }
    return (
      <Typography
        sx={{
          ...commonStyles.tableText,
          ...(customColor && { color: WHITE }),
          ...styles.columnStyle,
          ...(head["style"] === "normal" && styles.normalText),
          ...(head["specificColor"] && { color: () => getColor(field) }),
          color,
          textAlign,
        }}
      >
        {field}
      </Typography>
    );
  };

  return (
    <TableContainer sx={styles.tableContainer} component={Paper}>
      <Box
        sx={{
          ...(pagination
            ? tableWrapperStyles || styles.tableWrapper
            : tableWrapperStyles || styles.customTableWrapper),
        }}
      >
        <Table
          aria-label="custom pagination table"
          width="max-content"
          stickyHeader
        >
          <TableHead>
            <TableRow key={1}>
              {columnDefs.map((item, index) => (
                <TableCell
                  align="left"
                  sx={{ backgroundColor: LIGHT_GREEN }}
                  key={index}
                >
                  <Typography sx={commonStyles.tableText}>
                    {item.field}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData?.map((row, index) => {
              return (
                <TableRow key={index}>
                  {columnDefs?.map((head, columnDefsIndex) =>
                    head.checkbox ? (
                      <TableCell key={columnDefsIndex} align="left">
                        <Checkbox
                          checked={row.Select}
                          onChange={() => handleCheckboxChange(row.id)}
                        />
                      </TableCell>
                    ) : (
                      !head["cellRenderer"] &&
                      (head.renderColumn ? (
                        <TableCell
                          key={columnDefsIndex}
                          component="th"
                          scope="row"
                          align="left"
                          width={head["width"]}
                          //fix for fitContent for mui component TableCell
                          sx={{
                            ...(head["ellipsisClass"] === true &&
                              styles.maxWidth),
                          }}
                        >
                          {head.renderColumn(row)}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={columnDefsIndex}
                          component="th"
                          scope="row"
                          align="left"
                          width={head["width"]}
                          sx={{
                            ...(head["ellipsisClass"] === true &&
                              (ellipsisMaxWidth || styles.maxWidth)),
                          }}
                        >
                          {head["ellipsisClass"] === true ? (
                            <Tooltip
                              title={fieldDataWithTypography(
                                head,
                                rowData[index][head.field],
                                true
                              )}
                            >
                              {fieldDataWithTypography(
                                head,
                                rowData[index][head.field]
                              )}
                            </Tooltip>
                          ) : (
                            fieldDataWithTypography(
                              head,
                              rowData[index][head.field]
                            )
                          )}
                        </TableCell>
                      ))
                    )
                  )}

                  {row.hasOwnProperty("status") && (
                    <TableCell align="left">
                      <TableActions
                        id={row.id}
                        isActive={row.status}
                        isWaived
                        options={options}
                        isConfirmModalRequired={isConfirmModalRequired}
                        modalConfirmationMessage={modalConfirmationMessage}
                      />
                    </TableCell>
                  )}
                  {row.hasOwnProperty("sp") &&
                    (row["Logistics Decision"] === "Allow Buyer" &&
                    row["userId"] !== 6 &&
                    !row.hasOwnProperty("input") ? (
                      <TableCell align="left">
                        <TableActions
                          id={row.id}
                          isActive={row.logistics_manage_request_status}
                          options={options}
                          disabled={
                            row.logistics_manage_request_status ===
                              "APPROVED" ||
                            (row.logistics_manage_request_status ===
                              "REJECTED" &&
                              true)
                          }
                          isConfirmModalRequired={isConfirmModalRequired}
                          modalConfirmationMessage={modalConfirmationMessage}
                        />
                      </TableCell>
                    ) : row["Manage Logistics"] === "Approved" &&
                      row["Logistics Decision"] === "Allow Buyer" ? (
                      <TableCell align="left">
                        <Button
                          sx={{
                            ...customTableStyles.btnStyle,
                            ...(row.logisticsAdPlaced &&
                              customTableStyles.disabledButton),
                          }}
                          disabled={row.logisticsAdPlaced}
                          onClick={() =>
                            navigate(`${LOGISTICS}/create-ad/${row.id}`)
                          }
                        >
                          <Typography
                            sx={{
                              width: "7rem",
                              ...customTableStyles.colorText,
                            }}
                          >
                            Create logistics Ad
                          </Typography>
                        </Button>
                      </TableCell>
                    ) : row["Logistics Decision"] === "Allow Seller" &&
                      row["userId"] !== 6 &&
                      !row.hasOwnProperty("input") ? (
                      <TableCell align="left">
                        <Button
                          sx={{
                            ...customTableStyles.btnStyle,
                            ...(row.logisticsAdPlaced &&
                              customTableStyles.disabledButton),
                          }}
                          disabled={row.logisticsAdPlaced}
                          onClick={() =>
                            navigate(`${LOGISTICS}/create-ad/${row.id}`)
                          }
                        >
                          <Typography
                            sx={{
                              width: "7rem",
                              ...customTableStyles.colorText,
                            }}
                          >
                            Create logistics Ad
                          </Typography>
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          sx={{
                            ...customTableStyles.btnStyle,
                            ...(row.logisticsAdPlaced &&
                              customTableStyles.disabledButton),
                          }}
                          disabled={row.logisticsAdPlaced}
                          onClick={() =>
                            navigate(`${LOGISTICS}/create-ad/${row.id}`)
                          }
                        >
                          <Typography
                            sx={{
                              width: "7rem",
                              ...customTableStyles.colorText,
                            }}
                          >
                            Create logistics Ad
                          </Typography>
                        </Button>
                      </TableCell>
                    ))}
                  {actions?.map((action, actionIndex) => (
                    <TableCell key={actionIndex} align="left">
                      <Button
                        disabled={
                          action.disableDelete ||
                          (action.type === "Log In" &&
                            row.status === "Inactive") ||
                          false
                        }
                        sx={{
                          ...((action.type === "btn" ||
                            action.type === "Log In") &&
                            styles.btnStyle),
                          ...(action.type === "anchor" &&
                            commonStyles.anchorButtonStyle),
                          ...(action.type === "error" && styles.deleteBtnStyle),
                          ...(action.type === "Log In" &&
                            row.status === "Inactive" &&
                            styles.disabledButton),
                        }}
                        onClick={() => {
                          action.actionClickHandler(row.id, row);
                        }}
                      >
                        <Typography
                          sx={{
                            ...((action.type === "btn" ||
                              action.type === "Log In") &&
                              styles.colorText),
                          }}
                        >
                          {action.name}
                        </Typography>
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {pagination && (
        <CustomPagination
          setQuery={setQuery}
          totalCount={totalCount}
          query={query}
        />
      )}
    </TableContainer>
  );
};

export default AjCustomTable;
