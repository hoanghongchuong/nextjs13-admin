import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import AdminLayout from "@/components/layout/admin";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { scheduleApi } from "@/api-client/schedule-api";
import { useDateFormat } from "@/hooks/use-format-date";
import { toast } from "react-toastify";

export default function ScheduleDetailPage() {
  const router = useRouter();
  const formatDate = useDateFormat();
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [schedule, setSchedule] = useState(null);

  const scheduleId = router.query.id;
  useEffect(() => {
    if(scheduleId) {
      fetchSchedule()
    }
  }, [scheduleId]);


  async function fetchSchedule() {
    try {
      setIsLoading(true);
      const response = await scheduleApi.getDetailSchedule(scheduleId);
      console.log(response);
      setSchedule(response.data);
      setStudents(response.data.list_student);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }


  // Hàm xử lý thay đổi trạng thái điểm danh của học sinh
  function handleAttendanceChange(studentIndex, attendanceStatus) {
    setStudents((prevStudents) => {
      const updatedStudents = [...prevStudents];
      updatedStudents[studentIndex].attendance_status = attendanceStatus;
      return updatedStudents;
    });
  }

  async function handleSubmitAttendance() {
    const attendanceDataToSend = students.map((student) => ({
      student_id: student.id,
      status: student.attendance_status,
      schedule_id: schedule.id,
      class_id: schedule?.class_room?.id
    }));
    try {
      setIsLoading(true);
      console.log(attendanceDataToSend);
      await scheduleApi.attendance(attendanceDataToSend);
      setIsLoading(false);
      toast.success("Điểm danh thành công.");
    } catch (error) {
      setIsLoading(false);
      toast.error("Đã xảy ra lỗi khi điểm danh.");
    }
  }

  function handleSearch() {


  }

  return (
    <>
      <Head>
        <title>Học tập rèn luyện</title>
        <meta property="og:title" content="Học tập rèn luyện" key="title" />
      </Head>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chi tiết </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin">Trang chủ</Link>
                </li>
                <li className="breadcrumb-item active">Chi tiết</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="card mb-2">
            <div className="card-header d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">
                <b>Danh sách học sinh lớp {schedule?.class_room?.name}, Ngày: {formatDate(schedule?.schedule_date)}</b>
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
                              checked={student.attendance_status == 1}
                              onChange={() => handleAttendanceChange(index, 1)}
                              key={`radio-1-${student.id}`}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={student.attendance_status == 2}
                              onChange={() => handleAttendanceChange(index, 2)}
                              key={`radio-2-${student.id}`}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              checked={student.attendance_status == 3}
                              onChange={() => handleAttendanceChange(index, 3)}
                              key={`radio-3-${student.id}`}
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
                <button type="submit" className="btn btn-sm btn-success" onClick={() => handleSubmitAttendance()}>
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
