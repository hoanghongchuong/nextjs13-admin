import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import TextError from "./text-error";

export default function InputField(props) {
  const { label, name, required, ...rest } = props;
  const { touched, errors, handleChange, values } = useFormikContext();
  const inputClassName = `form-control ${
    touched[name] && errors[name] ? "is-invalid" : ""
  }`;


  function handleInputChange(e) {}

  return (
    <div className="">
      <label htmlFor={name} className="fw-500">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <Field
        id={name}
        name={name}
        {...rest}
        className={inputClassName}
        value={values[name]}
        onChange={handleChange}
      ></Field>

      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}
