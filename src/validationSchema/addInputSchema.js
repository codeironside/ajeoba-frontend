import * as Yup from "yup";

export const AddInputSchema = Yup.object().shape({
  option: Yup.string(),
  inputName: Yup.string()
    .required("Input name is required")
    .min(2, "This should be 2 to 50 characters long")
    .max(50, "This should be 2 to 50 characters long"),
  inputQuantity: Yup.string().when("option", {
    is: "2",
    then: Yup.string()
      .required("Quantity is required")
      .test("min", "Quantity should be minimum 1 unit", function (min_qty) {
        if (!!min_qty) {
          const schema = Yup.string().test(function (min_value) {
            return min_value >= 1;
          });
          return schema.isValidSync(min_qty);
        }
        return true;
      })
      .test(
        "max",
        "Quantity should be maximum 1000000 unit",
        function (max_qty) {
          if (!!max_qty) {
            const schema = Yup.string().test(function (max_value) {
              return max_value < 1000000;
            });
            return schema.isValidSync(max_qty);
          }
          return true;
        }
      ),
    otherwise: Yup.string().notRequired(),
  }),

  inputCommission: Yup.string().when("option", {
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
