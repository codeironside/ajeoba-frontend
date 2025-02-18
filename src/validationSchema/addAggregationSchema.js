import * as Yup from "yup";
import * as moment from "moment";

export const addAggregationSchema = Yup.object().shape({
  option: Yup.string(),
  aggregationProductValue: Yup.string().required(
    "Product to be aggregated is required"
  ),

  aggregationProductType: Yup.string().required("Type of product is required"),

  aggregationFarmerValue: Yup.string().when("option", {
    is: "1",
    then: Yup.string().required("Farmer is required"),
  }),

  aggregationQuantity: Yup.string()
    .required("Quantity is required")
    .test("min", "Quantity should be minimum 0.01 unit", function (quantity) {
      if (!!quantity) {
        const schema = Yup.string().test(function (min_val) {
          return min_val >= 0.01;
        });
        return schema.isValidSync(quantity);
      }
      return true;
    })
    .test("max", "Quantity should be maximum 100 unit", function (quantity) {
      if (!!quantity) {
        const schema = Yup.string().test(function (max_val) {
          return max_val < 101;
        });
        return schema.isValidSync(quantity);
      }
      return true;
    }),

  aggregationCostPrice: Yup.string()
    .required("Cost price is required")
    .test("min", "Cost price should be minimum 0.01", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (min_val) {
          return min_val >= 0.01;
        });
        return schema.isValidSync(price);
      }
      return true;
    })
    .test(
      "max",
      "Cost price should be maximum 100000000 unit",
      function (price) {
        if (!!price) {
          const schema = Yup.string().test(function (max_val) {
            return max_val < 100000001;
          });
          return schema.isValidSync(price);
        }
        return true;
      }
    ),

  aggregationTransportReimbursement: Yup.string()
    .notRequired()
    .test(
      "min",
      "Transport reimbursement should be minimum 0.01",
      function (transport) {
        if (!!transport) {
          const schema = Yup.string().test(function (min_val) {
            return min_val >= 0.01;
          });
          return schema.isValidSync(transport);
        }
        return true;
      }
    )
    .test(
      "max",
      "Transport reimbursement should be maximum 100000000 unit",
      function (transport) {
        if (!!transport) {
          const schema = Yup.string().test(function (max_val) {
            return max_val < 100000001;
          });
          return schema.isValidSync(transport);
        }
        return true;
      }
    ),

  aggregationWareHouse: Yup.string().required("Warehouse is required"),

  aggregationQuality: Yup.string().required("Quality is required"),

  aggregationCountry: Yup.string().required("Country is required"),

  aggregationState: Yup.string().required("State is required").nullable(),


  aggregationSelectedDate: Yup.string()
    .nullable()
    .required("Date is required")
    .test("invalidDate", "Date is invalid", function (date) {
      return (
        moment(date).isValid() &&
        moment(date).isAfter("1900-12-31", "year") &&
        moment(date).isBefore(moment())
      );
    }),
  aggregationTime: Yup.string().nullable().required("Time is required"),
});
