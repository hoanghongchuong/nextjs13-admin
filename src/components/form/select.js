import { Field, ErrorMessage, useFormikContext } from "formik";
import React, { useState } from "react";
import TextError from "./text-error";

export default function Select(props) {
  const { label, name, placeholderText, required, defaultValue, options, ...rest } = props;
  const { touched, errors, setFieldValue, values } = useFormikContext();
console.log({rest});
  const inputClassName = `form-select ${
    touched[name] && errors[name] ? "is-invalid" : ""
  }`;

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setFieldValue(name, selectedValue);
  };

  return (
    <>
      {label && (
        <label className="fw-500" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Field
        as="select"
        id={name}
        name={name}
        className={inputClassName}
        {...rest}
        value={values[name] || defaultValue}
        onChange={handleChange}
      >
        <option value="">{placeholderText}</option>
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
