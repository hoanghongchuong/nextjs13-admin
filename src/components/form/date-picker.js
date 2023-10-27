import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import TextError from "./text-error";
import moment from "moment";

export default function DatePickerCustom(props) {
  const { label, name, required, ...rest } = props;
  const { touched, errors, setFieldValue } = useFormikContext();
  const inputClassName = `form-control ${
    touched[name] && errors[name] ? "is-invalid" : ""
  }`;

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    setFieldValue(name, formattedDate);
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="fw-500 me-3">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      )}
      
      <Field name={name}>
        {({ form, field }) => {
          const { value } = field;
          return (
            <DatePicker
              showIcon
              id={name}
              {...field}
              {...rest}
              selected={value ? moment(value, 'DD-MM-YYYY').toDate() : null}
              onChange={handleDateChange}
              className={inputClassName}
              dateFormat="DD-MM-YYYY"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              value={value}
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
