import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputField from "@/components/form/input-field";
import RadioButton from "@/components/form/radio-button";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import DatePickerCustom from "@/components/form/date-picker";
import studentApi from "@/api-client/student-api";
import { toast } from "react-toastify";
import moment from "moment";
import { useRouter } from "next/router";
import classesApi from "@/api-client/classes-api";
import LoadingCustom from "@/components/loading/loading";
import { BeatLoader } from "react-spinners";

export default function CreateStudent() {
  const router = useRouter();
  const [listClasses, setListClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      async function getListClasses() {
        const result = await classesApi.getAllClasses();
        setListClasses(result.data);
        setIsLoading(false);
      }
      getListClasses();
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này là bắt buộc."),
    parent_name: Yup.string().required("Trường này là bắt buộc."),
    phone: Yup.string().required("Trường này là bắt buộc."),
    birthday: Yup.string()
      .transform((value, originalValue) => {
        if (moment(originalValue, "DD-MM-YYYY", true).isValid()) {
          return moment(originalValue, "DD-MM-YYYY").format("YYYY-MM-DD");
        }
        return originalValue;
      })
      .required("Trường này là bắt buộc."),
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


  const handleSubmit = async (values) => {
    try {
      setIsSaving(true);
      const result = await studentApi.createStudent(values);
      router.push("/admin/students");
      toast.success("Thêm mới thành công.");
    } catch (error) {
      toast.error("Fail to add new student.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingCustom />
      ) : (
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
                    <li className="breadcrumb-item">Học sinh</li>
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
                            <h3 className="card-title mb-0">
                              Thông tin học sinh
                            </h3>
                            <div className="card-tool">
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="form-group mb-3">
                              <InputField
                                name="name"
                                required
                                type="text"
                                label="Họ và tên"
                              />
                            </div>
                            <div className="form-group mb-3">
                              <Select
                                label="Lớp"
                                name="class_id"
                                options={listClasses}
                                required
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
                              <DatePickerCustom
                                label="Ngày sinh"
                                name="birthday"
                                required
                              />
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
                            <h3 className="card-title mb-0">
                              Thông tin phụ huynh
                            </h3>
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
                          <button
                            type="submit"
                            className="btn btn-sm btn-success"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                Saving
                                <BeatLoader color="#3498db" size={6} />
                              </>
                            ) : (
                              <>
                                <i className="fa fa-save"></i> Save
                              </>
                            )}
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
      )}
    </>
  );
}

CreateStudent.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
