import Head from "next/head";
import Link from "next/link";
import AdminLayout from "@/components/layout/admin";
import { Form, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import classesApi from "@/api-client/classes-api";
import ReactDatePicker from "react-datepicker";

export default function AttendancePage() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [listClasses, setListClasses] = useState([]);
  const [classSelected, setClassSelected] = useState(null);
  const [startDate, setStartDate] = useState(null);

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

  function handleSearch() {
    console.log({ startDate, classSelected });
  }

  function handleAttendanceChange() {}

  function handleSelectClasses(e) {
    setClassSelected(e.target.value);
  }

  function handleDateChange(date) {
    setStartDate(date);
  }

  return (
    <>
      <Head>
        <title>Học tập rèn luyện</title>
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
                <li className="breadcrumb-item active">Học tập rèn luyện</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-2">
              <Form.Select
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
              </Form.Select>
            </div>
            <div className="col-3  pl-0">
              <input
                name="sku"
                id="sku"
                type="text"
                className="form-control form-control-sm"
                value={keyword}
                placeholder="Tên học sinh"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="col-2 pl-0">
              <ReactDatePicker
                id="date"
                onChange={handleDateChange}
                className="form-control form-control-sm"
                selected={startDate}
                dateFormat="dd-MM-yyyy h:mm aa"
                showTimeSelect
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Chọn ngày, giờ học"
              />
            </div>
            <div className="col-2 pl-0">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="card mb-2">
            <div className="card-header d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">
                <b>Danh sách học sinh</b>
              </p>
              <div className=""></div>
            </div>
            <div className="card-body p-0">
              {isLoading ? (
                <Skeleton count={20} style={{ display: "block" }} />
              ) : (
                <>
                  <Table hover responsive className="mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "1%" }}>STT</th>
                        <th style={{ width: "10%" }}>Họ tên</th>
                        <th style={{ width: "10%" }}>Ngày sinh</th>
                        <th style={{ width: "10%" }}>Có mặt</th>
                        <th style={{ width: "10%" }}>Nghỉ có phép</th>
                        <th style={{ width: "10%" }}>Nghỉ không phép</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.birthday}</td>
                          <td>
                            <input
                              type="radio"
                              checked={student.status === 1}
                              onChange={() => handleAttendanceChange(index, 1)}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={student.status === 2}
                              onChange={() => handleAttendanceChange(index, 2)}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={student.status === 3}
                              onChange={() => handleAttendanceChange(index, 3)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-sm btn-success"
                  onClick={() => handleSubmitAttendance()}
                >
                  <i className="fa fa-save"></i> Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AttendancePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
