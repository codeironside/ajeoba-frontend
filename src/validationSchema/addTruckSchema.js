import { ONLY_CHAR_REGEX } from "../Constant/AppConstant";
import * as Yup from "yup";

export const addTruckSchema = Yup.object().shape({
  truckModel: Yup.string()
    .required("Truck model is required")
    .min(2, "Truck model should have min 2 chars")
    .max(20, "Truck model should have max 20 chars"),

  typeOfTruck: Yup.string().required("Type Of Truck is required"),

  colorOfTruck: Yup.string()
    .required("Color of Truck is required")
    .matches(ONLY_CHAR_REGEX, {
      message: "Colour of truck should have 2 to 20 chars",
    }),

  registeredNumberPlate: Yup.string()
    .required("Registered No. Plate is required")
    .min(2, "Registered No. Plate should have min 2 chars")
    .max(20, "Registered No. Plate should have max 20 chars"),

  roadWorthinessCertificate: Yup.string(),

  vehicleInsuranceCertificate: Yup.string(),
});
