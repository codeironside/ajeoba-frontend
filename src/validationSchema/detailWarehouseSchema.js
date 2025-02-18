import * as Yup from "yup";

export const detailWareHouseSchema = Yup.object().shape({
  detailWareHouseName: Yup.string()
    .required("WareHouse name is required")
    .min(2, "This should be 2 to 100 characters long")
    .max(100, "This should be 2 to 100 characters long"),

  detailWareHouseStorageCapacity: Yup.string()
    .required("Storage capacity is required")
    .test(
      "min",
      "Storage capacity should have minimum of 1 unit",
      function (wareHouseStorageCapacity) {
        return wareHouseStorageCapacity > 0;
      }
    )
    .test(
      "max",
      "Storage capacity can have maximum of 10000000 unit",
      function (wareHouseStorageCapacity) {
        return wareHouseStorageCapacity < 10000001;
      }
    ),
  detailWareHouseFacilities: Yup.array()
    .required("Type of product is required")
    .min(1, "At least 1 product is required"),
});
