import * as Yup from "yup";

export const createAdsMarketplaceSchema = Yup.object().shape({
  createAdsMarketplaceProductNameId: Yup.number().required(
    "Product name is required"
  ),
  createAdsMarketplaceProductType: Yup.string().required(
    "Product type is required"
  ),
  createAdsMarketplaceBatch: Yup.string().required("Batch is required"),
  createAdsMarketplacePrice: Yup.string()
    .required("Price is required")
    .test("min", "Price should be minimum 0.01", function (price) {
      if (!!price) {
        const schema = Yup.string().test(function (min_val) {
          return parseFloat(min_val) >= 0.01;
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
});
