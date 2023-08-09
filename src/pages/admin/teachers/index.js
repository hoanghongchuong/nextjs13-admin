import React, { useState } from "react";
import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import PaginationCustom from "@/components/pagination/pagination";
import Skeleton from "react-loading-skeleton";
import { Table } from "react-bootstrap";
import { useRouter } from "next/router";
import { useStudentList } from "@/hooks/use-student-list";
import studentApi from "@/api-client/student-api";
import Head from "next/head";

function TeacherList() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ keyword: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);

  const { data, isLoading, mutate } = useStudentList({ params: filters });

  const teachers = data.data?.data || [];
  const totalRecords = data.data?.total;
  const from = data.data?.from;
  const to = data.data?.to;
  const totalPages = Math.ceil(totalRecords / data.data?.per_page);

  function handleInputChange(value) {
    setKeyword(value);
    const query = { keyword: value };
    if (!value) {
      delete query.keyword;
    }

    router.push({
      pathname: router.pathname,
      query: query,
    });
    setFilters({
      keyword: value,
    });
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    // Cập nhật URL với param `currentPage`
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    });
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
  }

  async function deleteStudent(id) {
    try {
      setIsDelete(true);
      await studentApi.deleteStudent(id);
      router.push("/admin/teachers");
      await mutate();
      toast.success("Delete success");
      setIsDelete(false);
    } catch (error) {
      setIsDelete(false);
      toast.error("Fail to add delete teacher.");
    }
  }

  return (
    <div>
      <Head>
        <title>Danh sách giáo viên</title>
        <meta property="og:title" content="Danh sách giáo viên" key="Danh sách giáo viên" />
      </Head>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Teacher</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin">Home</Link>
                </li>
                <li className="breadcrumb-item active">Teacher</li>
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
                placeholder="Name, phone"
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>            
            <div className="col-4">
              <button type="button" className="btn btn-sm btn-primary">
                Search
              </button>
            </div>
          </div>
          
          <div className="card mb-2">
            <div className="card-header d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">
                Showing {from} to {to} of {totalRecords} records
              </p>
              <div className="">
                <Link
                  href="/admin/tearchers/create"
                  className="btn btn-sm btn-success"
                >
                  {" "}
                  Thêm mới
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              {isLoading || isDelete ? (
                <Skeleton count={11} style={{ display: "block" }} />
              ) : (
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "1%" }}>#</th>
                      <th style={{ width: "10%" }}>Họ tên</th>
                      <th style={{ width: "10%" }}>Ngày sinh</th>
                      <th style={{ width: "10%" }}>Giới tính</th>
                      <th style={{ width: "10%" }}>Số điện thoại</th>
                      <th style={{ width: "3%" }} className="text-center">
                        Status
                      </th>
                      <th style={{ width: "7%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((item) => (
                      <tr key={item.id}>
                        <td>ST_{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.birthday}</td>
                        <td>{item.gender == 1 ? "Nam" : "Nữ"}</td>
                        <td>{item.phone}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-right d-flex flex-nowrap justify-content-end">
                          <Link
                            className="btn btn-info btn-sm me-2 d-flex flex-nowrap align-items-center"
                            href={"/admin/teachers/edit/" + item.id}
                          >
                            <i className="fas fa-pencil-alt me-1"></i>
                            Edit
                          </Link>

                          <Link
                            className="btn btn-danger btn-sm d-flex flex-nowrap align-items-center"
                            href="#"
                          >
                            <i className="fas fa-trash me-1"></i>
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
          <PaginationCustom
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default TeacherList;

TeacherList.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
