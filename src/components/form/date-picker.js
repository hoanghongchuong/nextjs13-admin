import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import DatePicker from 'react-datepicker';
import TextError from "./text-error";

export default function DatePickerCustom(props) {
  const { label, name, ...rest } = props;
  const { touched, errors } = useFormikContext();
  const inputClassName = `form-control ${
    touched[name] && errors[name] ? "is-invalid" : ""
  }`;
  return (
    <div>
      <label htmlFor={name} className="fw-500 me-3">
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              showIcon
              id="name"
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
              className={inputClassName}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
