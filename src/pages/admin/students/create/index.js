import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "@/components/form/input-field";
import RadioButton from "@/components/form/radio-button";
import DatePicker from "@/components/form/date-picker";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import DatePickerCustom from "@/components/form/date-picker";

export default function CreateStudent() {
  const [birthday, setBirthday] = useState(null);
  const [dateCheckin, setDateCheckin] = useState(null);

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Trường này là bắt buộc."),
    parent_name: Yup.string().required("Trường này là bắt buộc."),
    phone: Yup.string().required("Trường này là bắt buộc."),
    birthday: Yup.date().required("Trường này là bắt buộc."),
    classes: Yup.string().required("Trường này là bắt buộc."),
    address: Yup.string(),
  });
  const initialValues = {
    full_name: "",
    parent_name: "",
    phone: "",
    gender: 1,
    birthday: "",
    address: "",
    date_checkin: "",
  };

  const listClasses = [
    {
      id: 1,
      name: "Lớp 1A",
    },
    {
      id: 2,
      name: "Lớp 1B",
    },
    {
      id: 3,
      name: "Lớp 1C",
    },
    {
      id: 4,
      name: "Lớp 1D",
    },
  ];

  const handleSubmit = async (values) => {
    // values.birthday = birthday;
    // values.date_checkin = dateCheckin;
    console.log({ values });
  };

  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Student</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item">Students</li>
                <li className="breadcrumb-item active">create</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="card">
                      <div className="card-header-sticky card-header d-flex justify-content-between align-items-center">
                        <h3 className="card-title mb-0">Thông tin học sinh</h3>
                        <div className="card-tool">
                          {/* <button className="btn btn-sm btn-success" type="submit">
                      <i className="fa fa-save"></i> Save
                    </button> */}
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="form-group mb-3">
                          <InputField
                            name="full_name"
                            required
                            type="text"
                            label="Họ và tên"
                          />
                        </div>
                        <div className="form-group mb-3">                          
                          <Select
                            label="Lớp"
                            name="classes"
                            options={listClasses}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <RadioButton
                            name="gender"
                            options={[
                              { value: 1, title: "Nam" },
                              { value: 2, title: "Nữ" },
                            ]}
                            label="Giới tính"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <DatePickerCustom label="Ngày sinh" name="birthday" />
                        </div>

                        <div className="form-group mb-3">
                          <DatePickerCustom
                            label="Ngày nhập học"
                            name="date_checkin"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="card">
                      <div className="card-header-sticky card-header d-flex justify-content-between align-items-center">
                        <h3 className="card-title mb-0">Thông tin phụ huynh</h3>
                        <div className="card-tool"></div>
                      </div>
                      <div className="card-body">
                        <div className="form-group mb-3">
                          <InputField
                            label="Họ và tên"
                            name="parent_name"
                            type="text"
                            placeholder="Nhập họ tên phụ huynh"
                            required
                          />
                        </div>
                        <div className="form-group mb-3">
                          <InputField
                            label="Số điện thoại"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            name="phone"
                            required
                          />
                        </div>

                        <div className="form-group mb-3">
                          <InputField
                            label="Địa chỉ"
                            name="address"
                            type="text"
                            placeholder="Nhập địa chỉ"
                          />
                        </div>
                        <div className="form-group">
                          <Textarea label="Ghi chú" name="note" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-sm btn-success">
                        <i className="fa fa-save"></i> Save
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

CreateStudent.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
