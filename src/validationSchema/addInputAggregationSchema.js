import * as Yup from "yup";
import * as moment from "moment";

export const addInputAggregationSchema = Yup.object().shape({
  option: Yup.string(),
  aggregationInputValue: Yup.string().required(
    "Input to be aggregated is required"
  ),

  inputSubtype: Yup.string()
    .required(`Input subtype is required`)
    .min(2, "This should be 2 to 20 characters long")
    .max(20, "This should be 2 to 20 characters long"),

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

  aggregationSellingPrice: Yup.string()
    .required("Selling price is required")
    .test(
      "min",
      "Selling price should be minimum 0.01",
      function (sellingPrice) {
        if (!!sellingPrice) {
          const schema = Yup.string().test(function (min_val) {
            return min_val >= 0.01;
          });
          return schema.isValidSync(sellingPrice);
        }
        return true;
      }
    )
    .test(
      "max",
      "Selling price should be maximum 100000000 unit",
      function (sellingPrice) {
        if (!!sellingPrice) {
          const schema = Yup.string().test(function (max_val) {
            return max_val < 100000001;
          });
          return schema.isValidSync(sellingPrice);
        }
        return true;
      }
    ),

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

  aggregationWareHouse: Yup.string().required("Warehouse is required"),

  aggregationCountry: Yup.string().required("Country is required"),

  aggregationState: Yup.string().required("State is required").nullable(),
  aggregationDescription: Yup.string().required(
    "Product Description are required"
  ),
  
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
  aggregationSelectedExpiryDate: Yup.string()
    .nullable()
    .required("Expiry date is required")
    .test("invalidDate", "Expiry date is invalid", function (expiryDate) {
      return (
        moment(expiryDate).isValid() &&
        moment(expiryDate).isAfter(moment()) &&
        moment(expiryDate).isBefore(moment().add(2, "years"))
      );
    }),
  aggregationTime: Yup.string().nullable().required("Time is required"),
});
