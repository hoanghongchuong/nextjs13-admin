import Head from "next/head";
import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import classesApi from "@/api-client/classes-api";
import { FaCheck } from "react-icons/fa";
import LoadingCustom from "@/components/loading/loading";
import { reportApi } from "@/api-client/report-api";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Select from "@/components/form/select";
import DatePickerCustom from "@/components/form/date-picker";
import moment from "moment";

const validationSchema = Yup.object().shape({
  class_id: Yup.number().required("Trường này là bắt buộc."),
  start_date: Yup.string()
    .transform((value, originalValue) => {
      if (moment(originalValue, "dd-MM-yyyy", true).isValid()) {
        return moment(originalValue, "dd-MM-yyyy").format("dd-MM-yyyy");
      }
      return originalValue;
    })
    .required("Trường này là bắt buộc."),
  end_date: Yup.string().transform((value, originalValue) => {
    if (moment(originalValue, "dd-MM-yyyy", true).isValid()) {
      return moment(originalValue, "dd-MM-yyyy").format("dd-MM-yyyy");
    }
    return originalValue;
  }).required("Trường này là bắt buộc."),
});

export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [listClasses, setListClasses] = useState([]);
  const [filters, setFilters] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);
  const [classSelected, setClassSelected] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const router = useRouter();

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
      async function getReport() {
        const result = await reportApi.getReport(filters);
        console.log(result.data.schedules);
        setSchedules(result.data.schedules);
        setStudents(result.data.students);
        setIsLoading(false);
      }

      getReport();
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  }, [filters]);

  function handleSelectStartDate(date) {
    setStartDate(date);
  }

  function handleSelectEndDate(date) {
    setEndDate(date);
  }

  const initialValues = {
    class_id: "",
    start_date: "",
    end_date: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const query = {
      class_id: values.class_id,
      start_date: values.start_date,
      end_date: values.end_date,
    };
    setFilters(query);
  };

  // function handleSearch() {
  //   const query = {
  //     class_id: classSelected,
  //     start_date: formatDate(startDate),
  //     end_date: formatDate(endDate),
  //   };
  //   router.push({
  //     pathname: router.pathname,
  //     query: query,
  //   });
  //   setFilters(query);
  // }

  function handleSelectClasses(e) {
    setClassSelected(e.target.value);
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function checkAttendance(arrayDate, targetDate) {
    const foundItem = arrayDate.find(
      (item) => item.schedule_date === targetDate && item.att_status === 1
    );
    if (foundItem) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <Head>
        <title>Báo cáo</title>
        <meta property="og:title" content=">Học tập rèn luyện" key="title" />
      </Head>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1></h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin">Home</Link>
                </li>
                <li className="breadcrumb-item active">Báo cáo</li>
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
            {({values}) => (
              <Form>
              <div className="row mb-3">
                <div className="col-3">
                <Select
                    name="class_id"
                    options={listClasses}
                    placeholderText="Chọn Lớp"
                    // required
                  />
                  {/* <Form.Select
                    aria-label="Default select example"
                    size="sm"
                    onChange={handleSelectClasses}
                  >
                    <option>Chọn lớp</option>
                    {listClasses.map(function (item) {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Select> */}
                </div>
                <div className="col-3 pl-0">
                <DatePickerCustom
                  name="start_date"
                  placeholderText="Chọn ngày bắt đầu"
                />
                  {/* <ReactDatePicker
                    id="date"
                    onChange={handleSelectStartDate}
                    className="form-control form-control-sm"
                    selected={startDate}
                    dateFormat="dd-MM-yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Chọn ngày bắt đầu"
                  /> */}
                </div>
                <div className="col-3 pl-0">
                <DatePickerCustom
                  name="end_date"
                  placeholderText="Chọn ngày kết thúc"
                />
                  {/* <ReactDatePicker
                    id="date"
                    onChange={handleSelectEndDate}
                    className="form-control form-control-sm"
                    selected={endDate}
                    dateFormat="dd-MM-yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Chọn ngày kết thúc"
                  /> */}
                </div>
                <div className="col-2 pl-0">
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </Form>
            )}
          </Formik>

          <div className="card mb-2">
            <div className="card-header d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">
                <b>Danh sách học sinh</b>
              </p>
              <div className=""></div>
            </div>
            <div className="card-body table-container p-0">
              {isLoading ? (
                <LoadingCustom />
              ) : (
                <>
                  <Table hover responsive striped bordered className="mb-0">
                    <thead>
                      <tr>
                        <th
                          className="fixed-columns fixed-column-stt"
                          style={{ width: "1%" }}
                        >
                          STT
                        </th>
                        <th
                          className="fixed-columns fixed-column-name"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Họ tên
                        </th>
                        {schedules &&
                          schedules.map((date) => {
                            console.log({ date });
                            return (
                              <th
                                key={date.id}
                                className="text-center scrolling-columns"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {date.schedule_date}
                                {/* {date.getDate()} <br />{" "}
                                {date.toLocaleDateString("vi-VN", {
                                  weekday: "short",
                                })} */}
                              </th>
                            );
                          })}
                        <th>Tổng(VND)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students &&
                        students.map((student, index) => (
                          <tr key={student.id}>
                            <td className="fixed-columns fixed-column-stt">
                              {index + 1}
                            </td>
                            <td
                              style={{ whiteSpace: "nowrap" }}
                              className="fixed-columns fixed-column-name"
                            >
                              {student.student_name}
                            </td>
                            {schedules &&
                              schedules.map((date) => {
                                return (
                                  <td key={date.id} className="text-center">
                                    {checkAttendance(
                                      student.schedule,
                                      date.schedule_date
                                    ) ? (
                                      <FaCheck color="green" />
                                    ) : (
                                      ""
                                    )}
                                    {/* {student.schedule.includes(
                                      (date.schedule_date)
                                    ) ? (
                                      <FaCheck color="green" />
                                    ) : (
                                      ""
                                    )} */}
                                  </td>
                                );
                              })}
                            <td>
                              {student.total_money.toLocaleString("en-US")}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ReportPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
