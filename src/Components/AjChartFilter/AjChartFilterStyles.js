import {
    ACTIVE_GREEN,
    WHITE,
    GREEN_OPAQ_15,
    BLACK,
} from "../../Constant/ColorConstant";
export const styles = {
    filterContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: GREEN_OPAQ_15,
        minHeight: "5.1rem",
        borderRadius: "8px 8px 0px 0px",
        flexWrap: "wrap",
        padding: "0px 10px"
    },
    filterHeading: {
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: "2rem",
        width: "6rem"
    },
    leftFilterContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },
    rightFilterContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center"
    },

    tabContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: "white",
        borderRadius: "4px",
        color: "black",
        border: "1px solid white",
    },
    tab: {
        padding: "5px 10px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "0.875rem"
    },
    activeTab: {
        background: ACTIVE_GREEN,
        color: WHITE,
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "0.875rem"
    },
    monthOrYearFilter: {
        display: "flex",
        alignItems: "center",
    },
    arrow: {
        fontSize: "2rem",
        cursor: "pointer",
    },
    monthOrYearText: {
        fontWeight: "400",
        fontSize: "1rem",
        textAlign: "center",
        color: BLACK,
        padding: "0rem 1rem",
    },
}