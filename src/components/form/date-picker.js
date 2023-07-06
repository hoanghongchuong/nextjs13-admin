import { ErrorMessage, Field, useFormikContext } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import TextError from "./text-error";
import moment from "moment";

export default function DatePickerCustom(props) {
  const { label, name, ...rest } = props;
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
      <label htmlFor={name} className="fw-500 me-3">
        {label}
      </label>
      <Field name={name}>
        {({ form, field }) => {
          const { value } = field;
          console.log("ccc", value);
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
            />
          );
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}
