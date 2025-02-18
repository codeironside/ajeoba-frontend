import * as Yup from "yup";

export const AddProductSchema = Yup.object().shape({
  option: Yup.string(),
  productName: Yup.string()
    .required("Product name is required")
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to 50 characters long"),

  quantity: Yup.string().when("option", {
    is: "2",
    then: Yup.string()
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
              return max_val < 1000000;
            });
            return schema.isValidSync(quantity);
          }
          return true;
        }
      ),
    otherwise: Yup.string().notRequired(),
  }),

  Commission: Yup.string().when("option", {
    is: "2",
    then: Yup.string()
      .required("Commission is required")
      .test("min", "Commission should be minimum 0.01%", function (Commission) {
        if (!!Commission) {
          const schema = Yup.string().test(function (min_val) {
            return min_val >= 0.01;
          });
          return schema.isValidSync(Commission);
        }
        return true;
      })
      .test("max", "Commission should be maximum 100%", function (Commission) {
        if (!!Commission) {
          const schema = Yup.string().test(function (max_val) {
            return max_val <= 100;
          });
          return schema.isValidSync(Commission);
        }
        return true;
      }),
    otherwise: Yup.string().notRequired(),
  }),
});
