import { BLACK, DARK_GREY } from "../../../../Constant/ColorConstant";

export const styles = {
    mainSuperAdmin:{
        padding:"24px",
    },
    superAdminContainer:{
        borderRadius: "0.5rem",
        height: "calc(100vh - 11.9rem)",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginTop: "-7.3rem",
        position: "relative",
    },
    superAdminContent:{
        width:"60%",
        marginTop:"7.125rem"
    },
    superAdminSubContent:{
        display:"flex",
        marginTop:"1rem",
        justifyContent:"space-evenly",
    },
    responsive:{
        "@media (max-width: 980px)": {
            marginBottom:"1rem"
        }
    },
    labelColor:{
        color:DARK_GREY,
    },
    labelContentColor:{
        color:BLACK,
    }

}