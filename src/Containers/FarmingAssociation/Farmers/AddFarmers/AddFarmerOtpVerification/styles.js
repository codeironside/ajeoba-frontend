export const thisStyles = {
    groupButtons: {
        width: "100%",
        gap: "1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //   marginTop: "-0.625rem",
        "@media (max-width: 600px)": {
            flexDirection: "column",
            gap: ".15rem",
        },
    },
    groupBoxes: {
        width: "100%",
        gap: "1rem",
        display: "flex",
        marginTop: "2rem",
        alignItems: "center",
        border: "0.063rem solid #F2F2F2",
        boxSizing: "border-box",
        boxShadow: "0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
        borderRadius: "0.5rem",
        padding: "1rem",
        "@media (max-width: 600px)": {
            gap: "0",
        },
    },
    box1: {
        width: "56px",
        height: "56px",
        contain: "content",
    },
    box2: {
        flex: "1",
        width: "100%",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
    },
    nextBtnStyle: {
        marginBlock: "2.625rem",
        "@media (max-width: 600px)": {
            marginBlock: "1rem",
        },
      },
}