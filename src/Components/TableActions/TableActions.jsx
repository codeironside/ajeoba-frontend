import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Typography } from "@mui/material";
import { styles } from "./TableActionsStyles";
import { BLACK, LIGHT_GREY } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";
import AjDialog from "../AjDialog/AjDialog";
import AjConfirmModal from "../AjConfirmModal/AjConfirmModal";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 4,
    marginTop: theme.spacing(1),
    minWidth: 120,
    backgroundColor: LIGHT_GREY,
  },
}));

export default function TableActions({
  id,
  isActive,
  options,
  isReadOnly,
  disabled,
  isConfirmModalRequired,
  modalConfirmationMessage,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(isActive);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const open = Boolean(anchorEl);
  const handleConfirm = (selectedOption) => {
    setStatus(selectedOption.name);
    selectedOption.actionClickHandler(id);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (selectedOption) => {
    setAnchorEl(null);
    if (isConfirmModalRequired) {
      setOpenDialog(true);
      setSelectedStatus(selectedOption);
    } else {
      handleConfirm(selectedOption);
    }
  };

  useEffect(() => {
    setStatus(isActive);
  }, [isActive, id]);

  let filteredOptions = [];
  if (status === "Pending") {
    filteredOptions = options.filter((option) => option.name !== "Revoke");
  } else if (status === "Granted") {
    filteredOptions = options.filter((option) => option.name === "Revoke");
  } else {
    filteredOptions = options;
  }

  return (
    <div>
      <Button
        disabled={status === "Archived" || disabled? true : isReadOnly}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        disableTouchRipple={status === "Completed" || status === "Approved" ? true : false}
        onClick={handleClick}
        endIcon={
          status !== "Completed" &&
          status !== "Approved" &&
          status !== "Rejected" &&
          status !== "Denied" &&
          status !== "Revoked" && <ArrowDropDownIcon />
        }
        sx={{
          ...styles.inActiveStyle,
          ...((status === "Active" ||
            status === "Completed" ||
            status === "Resolved" ||
            status === "Ad Placed" ||
            status === "Granted" ||
            status === "Waived" ||
            status === "Approved") &&
            styles.activeStyle),
          ...((status === "In-transit" || status === "Under Review") &&
            styles.inTransitStyle),
          ...(status === "Completed" && { cursor: "default" }),
          ...((status === "Denied" || status === "Revoked" || status === "Rejected") &&
            styles.revokedDeniedStyle),
          ...(isReadOnly && commonStyles.disableActiveInActiveBtn),
        }}
      >
        <Typography sx={styles.statusText}>{status}</Typography>
      </Button>
      {status !== "Completed" && status !== "Revoked" && status !== "Denied" && (
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {filteredOptions?.map(
            (option, optionIndex) =>
              option.name !== status && (
                <MenuItem
                  key={optionIndex}
                  onClick={() => handleChange(option)}
                  disableRipple
                >
                  <Typography sx={{ color: BLACK }}>{option.name}</Typography>
                </MenuItem>
              )
          )}
        </StyledMenu>
      )}

      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText={
            modalConfirmationMessage
              ? modalConfirmationMessage
              : "Are you sure you want to change the status of the plan?"
          }
          closeModal={setOpenDialog}
          onConfirm={() => handleConfirm(selectedStatus)}
        />
      </AjDialog>
    </div>
  );
}
