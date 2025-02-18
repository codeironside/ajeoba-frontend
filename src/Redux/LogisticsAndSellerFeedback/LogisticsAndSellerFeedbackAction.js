import { showToast } from "../../Services/toast";
import call from "../../API";
import { getOrderDetailsActionById } from "../CorporateBuyer/Trading/tradingActions";
import { ROLES } from "../../Constant/RoleConstant";
import { getInputOrderDetailsById } from "../FarmingAssociation/Input/inputActions";

export const getFeedbackDetails = (
  formData,
  closeModal,
  setFeedback,
  id,
  userData
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/feedback",
      payload: formData,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Thanks for the feedback", "success");
          setFeedback(true);
          closeModal(false);
          if (userData.role_id === ROLES.FARMING_ASSOCIATION)
            dispatch(getInputOrderDetailsById(+id));
          else dispatch(getOrderDetailsActionById(+id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
