import { Field, ErrorMessage, useFormikContext } from "formik";
import React from "react";
import TextError from "./text-error";

export default function Select(props) {
  const { label, name, required, options, ...rest } = props;
  const { touched, errors } = useFormikContext();
  const inputClassName = `form-select ${touched[name] && errors[name] ? "is-invalid" : ""}`;
  return (
    <>
      <label className="fw-500" htmlFor={name}>{label} {required && <span className="text-danger">*</span>}</label>
      <Field as="select" id={name} name={name} className={inputClassName} {...rest}>
        <option value=''>Chọn</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </>
  );
}
