import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import InputField from "@/components/form/input-field";
import RadioButton from "@/components/form/radio-button";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import DatePickerCustom from "@/components/form/date-picker";
import studentApi from "@/api-client/student-api";
import { toast } from "react-toastify";
import moment from "moment";
import classesApi from "@/api-client/classes-api";
import LoadingCustom from "@/components/loading/loading";
import { BeatLoader } from "react-spinners";
import Head from "next/head";
import { format, parseISO, parse } from "date-fns";

export default function EditStudent() {
  const router = useRouter();
  const [listClasses, setListClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [student, setStudent] = useState(null);
  const studentId = router.query.id;

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

  useEffect(() => {
    try {
      setIsLoading(true);
      if (studentId && !isNaN(studentId)) {
        async function getStudent() {
          const result = await studentApi.detailStudent(parseInt(studentId));
          setStudent(result.data);
          setIsLoading(false);
        }
        getStudent();
      } else {
        console.log("Invalid studentId");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [studentId, router]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này là bắt buộc."),
    parent_name: Yup.string().required("Trường này là bắt buộc."),
    phone: Yup.string().required("Trường này là bắt buộc."),
    birthday: Yup.string().required("Trường này là bắt buộc."),
    address: Yup.string(),
  });
  const initialValues = {
    name: student?.name || "",
    parent_name: student?.parent_name || "",
    phone: student?.phone || "",
    gender: student?.gender || 1,
    birthday: student?.birthday || "",
    address: student?.address || "",
    date_checkin: student?.date_checkin || "",
    note: student?.note || "",
    status: student?.status,
  };

  function formatDate(date) {
    if (date) {
      const dateParts = date.split("-");
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[0], 10);

      const dateObject = new Date(year, month, day);
      return dateObject;
    } else {
      return null;
    }
  }
  const handleSubmit = async (values) => {
    try {
      setIsSaving(true);

      console.log('birthday:::',values.birthday);
      const result = await studentApi.updateStudent(values, studentId);
      toast.success("Success");
    } catch (error) {
      toast.error("Fail to update student.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit Student</title>
      </Head>
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
                enableReinitialize
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
                            <div className="card-tool"></div>
                          </div>
                          <div className="card-body">
                            <div className="form-group mb-3">
                              <InputField
                                name="name"
                                required
                                type="text"
                                label="Họ và tên"
                                value={student?.name || ""}
                              />
                            </div>
                            <div className="form-group mb-3">
                              <Select
                                label="Lớp"
                                name="class_id"
                                options={listClasses}
                                required
                                defaultValue={student?.class_id || ""}
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
                                value={student?.gender || 1}
                              />
                            </div>
                            <div className="form-group mb-3">
                              <DatePickerCustom
                                label="Ngày sinh"
                                name="birthday"
                                required
                                value={student?.birthday || ""}
                              />
                            </div>

                            <div className="form-group mb-3">
                              <DatePickerCustom
                                label="Ngày nhập học"
                                name="date_checkin"
                                value={student?.date_checkin || ""}
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
                                value={student?.parent_name || ""}
                              />
                            </div>
                            <div className="form-group mb-3">
                              <InputField
                                label="Số điện thoại"
                                type="text"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={student?.phone || ""}
                                required
                              />
                            </div>

                            <div className="form-group mb-3">
                              <InputField
                                label="Địa chỉ"
                                name="address"
                                value={student?.address || ""}
                                type="text"
                                placeholder="Nhập địa chỉ"
                              />
                            </div>
                            <div className="form-group">
                              <Textarea
                                label="Ghi chú"
                                name="note"
                                value={student?.note || ""}
                              />
                            </div>
                            <div className="form-group">
                              <Select
                                label="Trạng thái"
                                name="status"
                                options={[
                                  { id: 1, name: "Đang học" },
                                  { id: 2, name: "Nghỉ học" },
                                ]}
                                defaultValue={student?.status}
                              />
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
                                Lưu
                                <BeatLoader color="#3498db" size={6} />
                              </>
                            ) : (
                              <>
                                <i className="fa fa-save"></i> Lưu
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

EditStudent.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
