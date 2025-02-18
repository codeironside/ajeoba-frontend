import * as Yup from "yup";
import * as moment from "moment";

export const logisticCreateAdSchema = Yup.object().shape({
  logisticAdDistance: Yup.string().required("Distance is required"),

  logisticPrice: Yup.string()
    .required("Price is required")
    .test("min", "Price should be minimum 1", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (min_val) {
          return parseFloat(min_val) >= 1;
        });
        return schema.isValidSync(price);
      }
      return true;
    })
    .test("max", "Price should be maximum 100000000", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (max_val) {
          return parseFloat(max_val) < 100000001;
        });
        return schema.isValidSync(price);
      }
      return true;
    }),

  logisticPostAd: Yup.string().required("Post Ad is required"),
  logisticPostAdCompany: Yup.string().when("logisticPostAd", {
    is: "2",
    then: Yup.string().required("Logistic company is required"),
  }),
});
export const logisticAdQuotationSchema = Yup.object().shape({
  logisticPrice: Yup.string().required("Price is required"),
  estimatedDeliveryDate: Yup.string()
    .required("Est. delivery date is required")
    .test("validDate", "Est. delivery date is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isSameOrAfter(moment(), "day") &&
        moment(date).isSameOrBefore(moment().add(1, "year"), "day")
      );
    }),
});
