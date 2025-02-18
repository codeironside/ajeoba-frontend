import * as Yup from "yup";

export const updateActiveAdMarketPlaceDetailSchema = Yup.object().shape({
  updateAdsMarketplacePrice: Yup.string()
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
    .test("max", "Price should be maximum 100000000", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (max_val) {
          return max_val < 100000001;
        });
        return schema.isValidSync(price);
      }
      return true;
    }),
});
