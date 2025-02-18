import * as Yup from "yup";

export const SelectRefereeSchema = Yup.object().shape({
  refereeOne: Yup.object().test("refereeOne", "Referee is required", (val) =>
    !val ? false : true
  ),
  refereeTwo: Yup.object().test("refereeTwo", "Referee is required", (val) =>
    !val ? false : true
  ),
});