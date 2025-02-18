import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { ACTIVE_GREEN, WHITE } from "../../Constant/ColorConstant";
import { saveAs } from "file-saver";
import { styles } from "./AjChartExportButtonStyles";

export default function AjChartExportButton(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    setOptions(props.options);
  }, []);

  const handleMenuItemClick = (exportIn) => {
    setOpen(false);
    if (exportIn === "png") {
      const downloadPNG = (chartId, fileName) => {
        // first argument is chartId and second argument is filename to save
        const canvas = document.getElementById(chartId);
        fillCanvasBackgroundWithColor(canvas, "white");
        canvas.toBlob(function (blob) {
          saveAs(blob, fileName + ".png");
        });
      };

      const fillCanvasBackgroundWithColor = (canvas, color) => {
        const context = canvas.getContext("2d");
        context.save();
        context.globalCompositeOperation = "destination-over";
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
      };
      if (props.id == "salesAndRevenue") {
        downloadPNG("sales", "SalesChart");
        downloadPNG("revenue", "RevenueChart");
      } else {
        downloadPNG(props.id, props.id);
      }
    } else if (exportIn === "csv") {
      const rows = props.data;

      const downloadCSV = (data, fileName) => {
        //first arg is the data and 2nd argument is the file name
        let csvContent =
          "data:text/csv;charset=utf-8," +
          data.map((e) => e.join(",")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName + ".csv");
        link.click();
      };
      if (rows.length > 2) {
        // for sales and revenue charts
        const data1 = rows.slice(0, 2);
        const data2 = rows.slice(2, 4);
        if (data1.length) {
          downloadCSV(data1, "Sales");
        }
        if (data2.length) {
          downloadCSV(data2, "Revenue");
        }
      } else {
        // for other charts
        downloadCSV(rows, props.id);
      }
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        sx={{
          background: WHITE,
        }}
        ref={anchorRef}
        aria-label="button group"
      >
        <Button
          sx={{
            color: ACTIVE_GREEN,
            borderColor: ACTIVE_GREEN,
            lineHeight: "1.5",
          }}
          variant="outlined"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select export option"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {props.heading || "Export"} <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={styles.popperStyle}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      onClick={() => handleMenuItemClick(option.exportIn)}
                    >
                      {option.icon ? option.icon : ""}

                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
