import AdminLayout from "@/components/layout/admin";
import PaginationCustom from "@/components/pagination/pagination";
import { useStudentList } from "@/hooks/use-student-list";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

function StudentList(props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ keyword: "" });

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useStudentList({ params: filters });

  const students = data.data?.data || [];
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
      // ...prevFilters,
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

  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Students</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active">Students</li>
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
                placeholder="Name, phone, parent"
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
            <div className="col-2">
              <Form.Select aria-label="Default select example" size="sm">
                <option>Status</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-sm btn-primary">
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
                  href="/admin/students/create"
                  className="btn btn-sm btn-success"
                >
                  {" "}
                  Thêm mới
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              {isLoading ? (
                <Skeleton count={11} style={{ display: "block" }} />
              ) : (
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "1%" }}>#</th>
                      <th style={{ width: "10%" }}>Name</th>
                      <th style={{ width: "10%" }}>Age</th>
                      <th style={{ width: "10%" }}>Gender</th>
                      <th style={{ width: "10%" }}>Parent</th>
                      <th style={{ width: "10%" }}>Phone Number</th>
                      <th style={{ width: "3%" }} className="text-center">
                        Status
                      </th>
                      <th style={{ width: "7%" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.birthday}</td>
                        <td>{item.gender}</td>
                        <td>{item.parent_name}</td>
                        <td>{item.phone}</td>
                        <td className="text-center">{item.status}</td>
                        <td className="text-right d-flex flex-nowrap justify-content-end">
                          <Link
                            className="btn btn-info btn-sm me-2 d-flex flex-nowrap align-items-center"
                            href="#"
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

export default StudentList;

StudentList.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
