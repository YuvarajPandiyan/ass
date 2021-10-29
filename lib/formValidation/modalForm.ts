import * as Yup from "yup";
import type { Asserts } from "yup";

const phoneRegExp =
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;

const linkedInRehExp =
  /((https?:\/\/)?((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm;

type InitialValuesType = {
  name: string;
  email: string;
  phone: string;
  linkedIn: string;
};
export const initialValues: InitialValuesType = {
  name: "",
  email: "",
  phone: "",
  linkedIn: "",
};

export const validationSchemes = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: Yup.string().email("Must be valid email").required("Required"),
  phone: Yup.string()
    .length(10, "Must be at least 10 characters")
    .matches(phoneRegExp, "Must be valid phone number")
    .required("Required"),
  linkedIn: Yup.string()
    .matches(linkedInRehExp, "Must be indian linked in profile")
    .required("Required"),
});
