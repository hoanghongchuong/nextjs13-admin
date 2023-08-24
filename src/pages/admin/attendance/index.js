import Head from "next/head";
import Link from "next/link";
import AdminLayout from "@/components/layout/admin";
import { Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";


export default function AttendancePage() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  function handleSearch() {}

  function handleAttendanceChange() {

  }

  function handleSubmitAttendance() {}

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
                name="sku"
                id="sku"
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
                {/* <b>Danh sách học sinh lớp 4A</b> */}
              </p>
              <div className=""></div>
            </div>
            <div className="card-body p-0">
              {isLoading ? (
                <Skeleton count={11} style={{ display: "block" }} />
              ) : (
                <>
                  <Table hover responsive className="mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: "1%" }}>STT</th>
                            <th style={{ width: "10%" }}>Họ tên</th>
                            <th style={{ width: "10%" }}>Ngày sinh</th>
                            <th style={{ width: "10%" }}>Có mặt</th>
                            <th style={{ width: "10%" }}>
                              Nghỉ có phép
                            </th>
                            <th style={{ width: "10%" }}>
                              Nghỉ Không phép
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>dsfdsf</td>
                            <td>20/10/2004</td>
                            <td>
                                <input type="radio" />
                            </td>
                            <td>
                            <input type="radio" />
                            </td>
                            <td>
                            <input type="radio" />
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>nguyen a</td>
                            <td>20/10/2004</td>
                            <td>
                                <input type="radio" onChange={() => handleAttendanceChange()} />
                            </td>
                            <td>
                            <input type="radio" onChange={() => handleAttendanceChange()} />
                            </td>
                            <td>
                            <input type="radio" onChange={() => handleAttendanceChange()} />
                            </td>
                          </tr>
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

AttendancePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
