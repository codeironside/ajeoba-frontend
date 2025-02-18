import * as Yup from "yup";

export const createAdsSchema = Yup.object().shape({
  productNameId: Yup.string().required("Product name is required"),
  productType: Yup.string().required("Type of product is required"),
  certificationType: Yup.array()
    .required("Type of certification is required")
    .min(1, "At least 1 certificate is required"),
  price: Yup.string()
    .required("Price is required")
    .test("min", "Price should be minimum 0.01", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (min_val) {
          return min_val >= 0.01;
        });
        return schema.isValidSync(price);
      }
      return true;
    })
    .test("max", "Price should be maximum 100000000 unit", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (max_val) {
          return max_val < 100000001;
        });
        return schema.isValidSync(price);
      }
      return true;
    }),

  quantity: Yup.string()
    .required("Quantity is required")
    .test("min", "Quantity should be minimum 1 unit", function (quantity) {
      if (!!quantity) {
        const schema = Yup.string().test(function (min_val) {
          return min_val >= 1;
        });
        return schema.isValidSync(quantity);
      }
      return true;
    })
    .test(
      "max",
      "Quantity should be maximum 1000000 unit",
      function (quantity) {
        if (!!quantity) {
          const schema = Yup.string().test(function (max_val) {
            return max_val <= 1000000;
          });
          return schema.isValidSync(quantity);
        }
        return true;
      }
    ),

  sendAd: Yup.string().required("Send Ad is required"),
  requestedFrom: Yup.string().when("sendAd", {
    is: "2",
    then: Yup.string().required("Requested from is required"),
  }),
});
