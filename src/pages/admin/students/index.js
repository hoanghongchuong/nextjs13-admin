import studentApi from "@/api-client/student-api";
import AdminLayout from "@/components/layout/admin";
import PaginationCustom from "@/components/pagination/pagination";
import { useStudentList } from "@/hooks/use-student-list";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

function StudentList(props) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [filters, setFilters] = useState({ keyword: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [statusStudent, setStatusStudent] = useState('');
  const [isDelete, setIsDelete] = useState(false);
  const [studentSelected, setStudentSelected] = useState({});

  const { data, isLoading, mutate } = useStudentList({ params: filters });

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
      keyword: value,
    });
  }
  function handleClickSearch() {
    const query = { keyword: keyword };
    if (!keyword) {
      delete query.keyword;
    }

    if (statusStudent) {
      query.status = statusStudent;
    }
    router.push({
      pathname: router.pathname,
      query: query,
    });
    setFilters({
      keyword: keyword,
      status: statusStudent
    });
  }

  function handleSelectChange(e) {
    setStatusStudent(e.target.value)
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

  function openModalDelete(student) {
    setStudentSelected(student);
    setshowModalDelete(true);
  }

  async function deleteStudent() {
    try {
      setIsDelete(true);
      setshowModalDelete(false)
      await studentApi.deleteStudent(studentSelected.id);
      router.push("/admin/students");
      await mutate();
      toast.success("Delete success");
      setIsDelete(false);
    } catch (error) {
      setIsDelete(false);
      toast.error("Fail to add delete student.");
    }
  }

  return (
    <div>
      <Head>
        <title>Danh sách học sinh</title>
        <meta property="og:title" content=">Danh sách học sinh" key="title" />
      </Head>
      <Modal
        show={showModalDelete}
        onHide={() => setshowModalDelete(false)}
        animation={true}        
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận xóa học sinh {studentSelected.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
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
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-2">
              <Form.Select aria-label="Default select example" size="sm" onChange={handleSelectChange}>
                <option value="">Trạng thái</option>
                <option value="1">Đang học</option>
                <option value="2">Nghỉ học</option>
              </Form.Select>
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-sm btn-primary" onClick={handleClickSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className="card mb-2">
            <div className="card-header d-flex align-items-center justify-content-between">
              <p className="card-title mb-0">
                Showing {from} to {to} of {totalRecords} học sinh
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
              {isLoading || isDelete ? (
                <Skeleton count={11} style={{ display: "block" }} />
              ) : (
                <Table hover responsive className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: "1%" }}>#</th>
                      <th style={{ width: "10%" }}>Họ tên</th>
                      <th style={{ width: "10%" }}>Ngày sinh</th>
                      <th style={{ width: "8%" }}>Lớp</th>
                      <th style={{ width: "10%" }}>Giới tính</th>
                      <th style={{ width: "10%" }}>Phụ huynh</th>
                      <th style={{ width: "10%" }}>Số điện thoại</th>
                      <th style={{ width: "5%" }} className="text-center">
                        Status
                      </th>
                      <th style={{ width: "7%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((item) => (
                      <tr key={item.id}>
                        <td>ST_{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.birthday}</td>
                        <td>{item.classes?.name}</td>
                        <td>{item.gender == 1 ? "Nam" : "Nữ"}</td>
                        <td>{item.parent_name}</td>
                        <td>{item.phone}</td>
                        <td className="text-center">{item.status == 1 ? "Đang học" : "Nghỉ học"}</td>
                        <td>
                          <div className="text-right d-flex flex-nowrap justify-content-end">
                          <Link
                            className="btn btn-info btn-sm me-2 d-flex flex-nowrap align-items-center"
                            href={"/admin/students/edit/" + item.id}
                          >
                            <i className="fas fa-pencil-alt me-1"></i>
                            Sửa
                          </Link>

                          <Link
                            className="btn btn-danger btn-sm d-flex flex-nowrap align-items-center"
                            href="#"
                            onClick={(e) => openModalDelete(item)}
                          >
                            <i className="fas fa-trash me-1"></i>
                            Xóa
                          </Link>
                          </div>
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
