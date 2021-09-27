import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditText, EditTextarea } from "react-edit-text";

const appointments = {
  failed: "These credentials do not match our bdrecords.",
  throttle: "Too many login attempts. Please try again in :seconds seconds.",
  passwords: {
    change_password: "Change password",
    change_existing_pass: "Change your existing password",
    inpt_old_pass: ":enter Current password",
    inpt_new_pass: ":itm password",
    submit: "Submit",
    inpt_old_pass_re: "Reenter your new password",
    welcome: "Welcome to a patient-driven health data platform",
    welcome_info: "Built on AI and Blockchain Technology.",
    pass_reset: "Reset Your Password Account",
    details_req: "Enter your details to Reset Password.",
    email_req: "Email Address",
    pass_req: "Reset Password",
    confirm_pass: "Confirm password",
    consent: "By clicking login, you agree to our ",
    terms: "Terms",
    condition: "Conditions!",
    account_query: "You have an account?",
    login_signboard: "Login here",
    account_ask: "Dont have an account?",
    reg_sign: "Register here",
    full_name: "Full Name",
  },
  company: "Company",
  f_verification: "Two Factor Verification",
  ver_alert: "You have received an email which contains a verification code",
  code_resend: "Resend code",
  token: "Token",
  verify: "Verify",
  code_req: "Enter verification code",
  reg_private_doc: "Register as a Private Doctor",
  details_ask: "Enter your details to complete the request",
  id_info: "Identification Info",
  first_name: " First Name",
  other_names: "Other Names",
  work_reg_no: "Work Registration Number",
  id_no: "National ID/passport number",
  email: "Email.",
  tel_no: "Telephone No.",
  specialization: "Specialization",
  choose: "Choose...",
  gender: "Gender",
  male: "Male",
  famale: "Female",
  other: "Other",
  register: "Register",
  reg_concent: "By clicking Register, you agree to our",
  pick_org: "Pick organization dashboard to visit",
  pick_proceed: "Pick to proceed",
  proceed: "Proceed",
  password: "Password",
  remember_me: "Remember me next time",
  welcome: "Welcome",
  org_det_req: "Enter the necessary details to register the organization.",
  required_fields: "Shows required fields",
  org_details: "Organization Details",
  org_names: "Organization Name",
  org_type: "Organization Type",
  choose_org_type: "Choose organisation type",
  ngo: "NGO",
  hospital: "Hospital",
  central_gvt: "Central Government",
  county_gvt: "County Government",
  clinic: "Clinic",
  dispensary: "Dispensary",
  association: "Association",
  insurance: "Insurance",
  select_country: "Select your country",
  type_select_country:
    "(start typing to select your country, if not available in the list enter the correct name)",
  county_select: "Select your county",
  type_select_county:
    "(start typing to select your county, if not available in the list enter the correct name)",
  org_phone: "Organization Telephone No.",
  org_email: "Organization Email Address",
  city: "City",
  location: "Location",
  postal_address: "Postal Address",
  street_address: "Street Address",
  org_street_location: "Enter organization Street Location",
  package: "Package",
  package_select: "Select package",
  admin_det: "Administrator Details",
  admin_fname: "Admin First Name",
  admin_other_names: "Admin Other Names",
  type_county: "Start typing to select a county",
  admin_gender: "Admin Gender",
  gender_select: "Select gender",
  admin_phone: "Admin Telephone No.",
  admin_mail: "Admin Email.",
  admin_mail_address: "Admin email address",
  secure_account: "Secure Your Account",
  ambulance: "Ambulance",
  menu: "Menu",
  ambulance_list: "Ambulance List",
  ambulance_calls: "Ambulance Calls",
  add_ambulance: "add ambulance",
  vehicle_no: "Vehicle no",
  vehicle_model: "Vehicle model",
  year_made: "Year made",
  drive_name: "Driver name",
  driver_lisence: "Driver license",
  driver_contact: "Driver contact",
  vehicle_type: "Vehicle type",
  note: "Note",
  patient_arcode: "Patient ARCode",
  vehicle_info: "Vehicle info",
  driver_info: "Driver info",
  address: "Address",
  date: "Date",
  amount: "Amount",
  owned: "Owned",
  hired: "Hired",
  close: "Close",
  submit: "Submit",
  add_currency: "Add Currency",
  patient: "Patient",
  select: "Select",
};
export default function useAddItems() {
  Object.entries(appointments).forEach((item) => {
    if (typeof item[1] === "object") {
      Object.entries(item[1]).forEach((item2) => {
        console.log(item[0] + "." + item2[0] + " => " + item2[1]);
      });
    } else {
      console.log(item[0] + " => " + item[1]);
    }
  });
  const [values, setvalues] = useState({
    onEdit: "",
    fetched: [],
    key: "",
    value: "",
    init: "",
  });

  const [value, setValue] = useState(0); // integer state

  const getter = () => {
    axios({
      method: "get",
      withCredentials: true,
      data: { key: values.key, onEdit: values.onEdit },
      url: "https://langtransapi.herokuapp.com/record",
    }).then((resp) => {
      setvalues({ ...values, fetched: resp.data, onEdit: "" }); //
      console.log(values);
    });
  };

  const useUpdate = (e) => {
    setValue((value) => value + 1); // update the state to force render
    // send for record http://localhost:9000/
    if (values.key !== "") {
      axios({
        method: "post",
        withCredentials: true,
        data: { key: values.key, onEdit: values.onEdit },
        url: "https://langtransapi.herokuapp.com/record",
      }).then((resp) => {
        setvalues({ ...values, fetched: resp.data, onEdit: "" }); //
        getter(); // update the state to force render
      });
    }
    getter();
    setvalues({ ...values, onEdit: "" });
  };
  const onChange = (e) => {
    var str = e.target.value;
    var key_ = str.split(" ").join("_").toLowerCase();
    var m_key = key_.replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, "");
    setvalues({ ...values, key: m_key, onEdit: e.target.value });
    setValue((value) => value + 1); // update the state to force render
  };

  return (
    <div>
      <table style={{ minWidth: "50vw", maxWidth: "50vw" }}>
        <tbody>
          <tr>
            <th>English</th>
            <th>Key</th>
            <th>French</th>
          </tr>
          <tr>
            <td>
              <textarea
                onBlur={useUpdate}
                placeholder="Paste Text"
                value={values.onEdit}
                onChange={onChange}
                style={{ borderWidth: "0px", border: "none" }}
              ></textarea>
            </td>
            <td>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    "{{__('alltrans." + values.key + "')}}"
                  )
                }
              >
                Copy
              </button>
            </td>
            {values.key !== "" ? (
              <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
                {"{{__('alltrans."}
                {values.key}
                {"')}}"}
              </td>
            ) : (
              <td></td>
            )}
          </tr>

          {values.fetched.map((item) => (
            <tr key={item._id}>
              <td>{item.English}</td>
              <td style={{ maxWidth: "200px", overflowWrap: "break-word" }}>
                {"{{__('alltrans."}
                {item.key}
                {"')}}"}
              </td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
