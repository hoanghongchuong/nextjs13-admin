import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import TextError from "./text-error";

export default function Textarea(props) {
  const { label, name, ...rest } = props;
  const { touched, errors } = useFormikContext();
  const inputClassName = `form-control ${touched[name] && errors[name] ? "is-invalid" : ""}`;
  return (
    <div>
      <label className="fw-500" htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} className={inputClassName} />
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
