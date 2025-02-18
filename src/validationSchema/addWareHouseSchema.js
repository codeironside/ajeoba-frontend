import * as Yup from "yup";

export const addWareHouseSchema = Yup.object().shape({
  addWareHouseName: Yup.string()
    .required("WareHouse name is required")
    .min(2, "This should be 2 to 100 characters long")
    .max(100, "This should be 2 to 100 characters long"),

  addWareHouseStorageCapacity: Yup.string()
    .required("Storage capacity is required")
    .test(
      "min",
      "Storage capacity should be minimum 1 unit",
      function (wareHouseStorageCapacity) {
        return wareHouseStorageCapacity > 0;
      }
    )
    .test(
      "max",
      "Storage capacity should be maximum 10000000 units",
      function (wareHouseStorageCapacity) {
        return wareHouseStorageCapacity < 10000001;
      }
    ),
  addWareHouseFacilities: Yup.array()
    .required("Type of product is required")
    .min(1, "At least 1 product is required"),
});
