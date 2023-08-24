import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import AdminLayout from "@/components/layout/admin";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { scheduleApi } from "@/api-client/schedule-api";

export default function ScheduleDetailPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [schedule, setSchedule] = useState(null);

  const scheduleId = router.query.id;


  useEffect(() => {
    if(scheduleId) {

      fetchSchedule()
    }

  },[scheduleId])

  async function fetchSchedule() {
      try {
        setIsLoading(true)
        const response = await scheduleApi.getDetailSchedule(scheduleId);
        setSchedule(response.data);
        setStudents(response.data?.class_room?.students);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
  }

  function handleSearch() {}

  function handleAttendanceChange(studentIndex, status) {
    console.log(studentIndex, status);
    setStudents((prevStudents) => {
      const updateStudent = [...prevStudents];
      updateStudent[studentIndex].status = status;
      return updateStudent;
    })
  }

  function handleSubmitAttendance() {
    const attendanceDataToSend = students.map((student) => ({
      student_id: student.id,
      attendance_status: student.status,
      schedule_id: schedule.id
    }));
    console.log('value submit::', attendanceDataToSend);
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
            <div className="col-3">
              <input
                name="name"
                type="text"
                className="form-control form-control-sm"
                value={keyword}
                placeholder="Tên học sinh"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-4 pl-0">
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
                <b>Danh sách học sinh lớp {schedule?.class_room?.name}</b>
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
                        <th style={{ width: "10%" }}>Nghỉ Không phép</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students && students.map((item, index) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.birthday}</td>
                          <td>
                            <input
                              type="radio"
                              checked={item.status == 1}
                              onChange={() => handleAttendanceChange(index, 1)}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={item.status == 2}
                              onChange={() => handleAttendanceChange(index, 2)}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={item.status == 3}
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
              <div className="form-group">
                <button type="submit" className="btn btn-sm btn-success" onClick={() => {handleSubmitAttendance()}}>
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

ScheduleDetailPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
