import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./text-error";

export default function RadioButton(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label className="fw-500">{label}</label>
      <Field name={name}>
        {({ field }) => {
          
          return options.map((option) => {
      

            return (
              <div className="form-check" key={option.value}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={(field.value) == (option.value)}
                  className="form-check-input"
                />
                <label htmlFor={option.value}>{option.title}</label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
