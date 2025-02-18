import * as Yup from "yup";

export const buyProductModalSchema = (maxQuantity, unit) =>
  Yup.object().shape({
    quantity: Yup.string()
      .test('len', 'Must be exactly 5 characters', qt => qt.length <= 5)
      .required("Quantity is required")
      .test(
        "max",
        `Quantity should be 0.1 to ${maxQuantity} ${unit}`,
        (qt) => parseFloat(qt) <= maxQuantity
      )
      .test(
        "min",
        `Quantity should be 0.1 to ${maxQuantity} ${unit}`,
        (qt) => parseFloat(qt) >= 0.1
      ),
  });
