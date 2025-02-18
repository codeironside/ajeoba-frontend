import * as Yup from "yup";

export const editInventorySchema = Yup.object().shape({
  inputQuantity: Yup.string()
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

  inputSellingPrice: Yup.string()
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
});
