// formikUtils.js

import { useFormik } from "formik";
import * as Yup from "yup";

// Initial values for the form
export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  designation: "",
  dateOfJoining: null,
  presentAddress: "",
  permanentAddress: "",
  aboutYourself: "",
  experience: "",
  company: "",
  enjoyment: "",
  sneakpeek: "",
  //bottom-1
  memberName: "",
  relationship: "",
  dateOfBirth: null,
  emergencyContactNumber: "",
  emailAddress: "",
  //bottom-2
  epfoUan: "",
  pfNo: "",
  adharCard: "",
  panCard: "",
  employeesName: "",
  dateOfBirthAs:"",
  gender: "",
  maritalStatus: "",
  fatherName: "",
  accountNumber: "",
  branch: "",
  ifsc: "",
  //bottom-3
  prefix: "",
  firstNamehr:"",
  lastNamehr:"",
  middleName: "",
  bloodGroup: "",
  nationality: "",
  officialEmail:"",
  employeeId: "",
};

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  designation: Yup.string()
    .matches(/^[^\d]+$/, "Designation should not contain numbers")
    .required("Designation is required"),
  dateOfJoining: Yup.date().required("Date of Joining is required"),
  presentAddress: Yup.string().required("Present Address is required"),
  permanentAddress: Yup.string().required("Permanent Address is required"),
  aboutYourself: Yup.string().required("About yourself is required"),
  experience: Yup.string().required("Experience is required"),
  company: Yup.string()
    .matches(/^[^\d]+$/, "Company should not contain numbers")
    .required("Previous Company is required"),
  enjoyment: Yup.string().required("Enjoyment is required"),
  sneakpeek: Yup.string().required("Sneak peek is required"),
  // bottom form-1
  memberName: Yup.string()
    .matches(/^[^\d]+$/, "Member Name should not contain numbers")
    .required("Member Name is required"),
  relationship: Yup.string()
    .matches(/^[^\d]+$/, "Relationship Name should not contain numbers")
    .required("Relationship Name is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  emergencyContactNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid phone number")
    .required("Phone Number is required"),
  emailAddress: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  // bottomForm-2
  epfoUan: Yup.string()
    .matches(/^\d{12}$/, "Invalid EPFO UAN(It contains 12 digits)")
    .required("EPFO UAN is required"),
  pfNo: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid PF No")
    .required("PF NO is required"),
  adharCard: Yup.string()
    .matches(/^\d{13}$/, "Invalid AdharCard Number(It contains 13 digit)")
    .required("AdharCard Number is required"),
  panCard: Yup.string()
     .matches(/^\+?[a-zA-Z0-9]+$/, 'Invalid PanCard Number' )
    .required("PanCard Number is required"),
  employeesName: Yup.string()
    .matches(/^[^\d]+$/, "employee Name should not contain numbers")
    .required("employee Name is required"),

  dateOfBirthAs: Yup.string().required("Date of Birth"),  
  gender: Yup.string()
  .matches(/^[^\d]+$/, "Gender should not contain numbers")
  .required("Gender is Required"),
  maritalStatus: Yup.string()
  .matches(/^[^\d]+$/, "Marital status should not contain numbers")
  .required("Marital Status is Required"),
  fatherName: Yup.string()
    .matches(/^[^\d]+$/, "Father Name should not contain numbers")
    .required("Father Name is required"),
  accountNumber: Yup.string()
    .matches(/^\+?[0-9]+$/, "Invalid Account Number")
    .required("Account Number is required"),
  branch: Yup.string()
    .matches(/^[^\d]+$/, "Branch should not contain numbers")
    .required("Branch Name is required"),
  ifsc: Yup.string()
  .matches(/^\+?[a-zA-Z0-9]+$/, 'Invalid IFSC Code' )
  .required("IFSC code is required"),
  //bottomForm-3
  prefix: Yup.string()
  .matches(/^[^\d]+$/, "Prefix should not contain numbers")
  .required("Prefix is required"),
  firstNamehr: Yup.string()
    .matches(/^[^\d]+$/, "First Name should not contain numbers")
    .required("Middle Name is required"),
  lastNamehr: Yup.string()
    .matches(/^[^\d]+$/, "Last Name should not contain numbers")
    .required("Middle Name is required"),  
  middleName: Yup.string()
    .matches(/^[^\d]+$/, "Middle Name should not contain numbers")
    .required("Middle Name is required"),
  bloodGroup: Yup.string().required("Blood Group is Required"),
  nationality: Yup.string()
    .matches(/^[^\d]+$/, "Nationality should not contain numbers")
    .required("Nationality is required"),
  officialEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),  
  employeeId: Yup.string().required("Employee Id is Required"),
});

export const handleFieldChange = (formik, e) => {
  const { name, value } = e.target;
  formik.handleChange(e); // Use Formik's handleChange for field-level changes
  formik.setFieldTouched(name, true, false); // Mark field as touched without validating

  // Additional custom validation logic
  switch (name) {
    case "firstName":
    case "lastName":
    case "memberName":
    case "relationship":
    case "employeesName":
    case "fatherName":
    case "branch":
    case "firstNamehr":
    case "lastNamehr":    
    case "middleName":
    case "nationality":
    case "maritalStatus":
    case "gender":
      // Check if the value contains a number
      if (/\d/.test(value)) {
        formik.setFieldError(name, `${name} should not contain numbers`);
      } else {
        formik.setFieldError(name, ""); // Clear the error if the value is valid
      }
      break;

    case "email":
    case "emailAddress":
    case "officialEmail":  
      // Your custom email validation logic
      // For example, checking if it contains '@'
      if (!value.includes("@")) {
        formik.setFieldError(name, "Invalid email format");
      } else {
        formik.setFieldError(name, "");
      }
      break;

    case "phoneNumber":
    case "emergencyContactNumber":
      // Your custom phone number validation logic
      // For example, checking if it contains only digits
      if (!/^\d+$/.test(value)) {
        formik.setFieldError(name, "Invalid phone number");
      } else {
        formik.setFieldError(name, "");
      }
      break;

    case "epfoUan":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\d{12}$/.test(value)) {
        formik.setFieldError(name, "Invalid EpfoUan");
      } else {
        formik.setFieldError(name, "");
      }

    case "pfNo":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\+?[0-9]+$/.test(value)) {
        formik.setFieldError(name, "Invalid PF Number");
      } else {
        formik.setFieldError(name, "");
      }

    case "adharCard":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\d{13}$/.test(value)) {
        formik.setFieldError(
          name,
          "Invalid Number(Adhar contains 13 digit number)"
        );
      } else {
        formik.setFieldError(name, "");
      }

      case "panCard":
      // epfoUan validation logic(it contains 12 digit number)
      if (!/^\+?[a-zA-Z0-9]+$/.test(value)) {
        formik.setFieldError(
          name,
          "Invalid Number(Invalid PAN number)"
        );
      } else {
        formik.setFieldError(name, "");
      }  

    case "designation":
    case "dateOfJoining":
    case "dateOfBirth":
    case "presentAddress":
    case "permanentAddress":
    case "aboutYourself":
    case "experience":
    case "company":
    case "enjoyment":
    case "sneakpeek":
    case "ifsc":  
    case "bloodGroup":
    case "employeeId":        
      // Example: Check if the value is not empty
      if (value.trim() === "") {
        formik.setFieldError(name, `${name} is required`);
      } else {
        formik.setFieldError(name, "");
      }
      break;

    default:
      break;
  }
};