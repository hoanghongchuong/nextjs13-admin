import AdminLayout from "@/components/layout/admin";
import PaginationCustom from "@/components/pagination/pagination";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import InputField from "@/components/form/input-field";
import RadioButton from "@/components/form/radio-button";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";

export default function ClassessList() {
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [filters, setFilters] = useState({ keyword: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const isLoading = true;
  const classes = [];
  const totalRecords = 10;
  const from = 1;
  const to = 10;
  const totalPages = Math.ceil(totalRecords / 10);
  const modalTitle = modalData ? "Cập nhật lớp học" : "Thêm mới lớp học";

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Trường này là bắt buộc."),
    sku: Yup.string().required("Trường này là bắt buộc."),
    start_time: Yup.string(),
    end_time: Yup.string(),
    tuition_fee: Yup.string(),
    description: Yup.string(),
  });

  const initialValues = {
    name: "",
    sku: "",
    start_time: "",
    end_time: "",
    tuition_fee: "",
    description: "",
    status: 1,
  };
  //   function handlePageChange(page) {
  //     setCurrentPage(page);
  //     // Cập nhật URL với param `currentPage`
  //     router.push({
  //       pathname: router.pathname,
  //       query: { ...router.query, page: page },
  //     });
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       page: page,
  //     }));
  //   }

  function handleHiddenModal() {
    setShowModal(false);
    setModalData(null);
  }
  const handleSubmit = async (values) => {
    console.log({values});

  };

  return (
    <>
      <Head>
        <title>Danh sách lớp</title>
        <meta property="og:title" content="Danh sách lớp" key="Danh sách lớp" />
      </Head>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Danh sách lớp</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="/admin">Home</Link>
                </li>
                <li className="breadcrumb-item active">Danh sách lớp</li>
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
                placeholder="Tên lớp"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-sm btn-primary">
                Tìm kiếm
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
                  href="#"
                  className="btn btn-sm btn-success"
                  onClick={() => setShowModal(true)}
                >
                  {" "}
                  Thêm mới
                </Link>
              </div>
            </div>
            <div className="card-body p-0">
              <Table hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>#</th>
                    <th style={{ width: "10%" }}>Tên</th>
                    <th style={{ width: "10%" }}>Ngày bắt đầu</th>
                    <th style={{ width: "10%" }}>Ngày kết thúc</th>
                    <th style={{ width: "10%" }}>Học phí/ buổi</th>
                    <th style={{ width: "3%" }} className="text-center">
                      Status
                    </th>
                    <th style={{ width: "7%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((item) => (
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
                          Sửa
                        </Link>

                        <Link
                          className="btn btn-danger btn-sm d-flex flex-nowrap align-items-center"
                          href="#"
                        >
                          <i className="fas fa-trash me-1"></i>
                          Xóa
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          {/* <PaginationCustom
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          /> */}
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleHiddenModal}
        animation={true}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({values}) => (
              <div className="row">
                <Form>
                <div className="col-md-12 col-12">
                  <div className="card">
                    <div className="card-header-sticky card-header d-flex justify-content-between align-items-center">
                      <h3 className="card-title mb-0">Thông tin lớp</h3>
                      <div className="card-tool"></div>
                    </div>
                    <div className="card-body">
                      <div className="form-group mb-3">
                        <InputField
                          name="name"
                          required
                          type="text"
                          label="Tên lớp học"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <InputField
                          name="sku"
                          required
                          type="text"
                          label="Mã lớp học"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <InputField
                          name="start_time"
                          type="time"
                          label="Giờ vào lớp"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <InputField
                          name="end_time"
                          type="time"
                          label="Giờ tan lớp"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <InputField
                          name="tuition_fee"
                          type="text"
                          label="Học phí"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <Textarea
                          name="description"
                          type="text"
                          label="Mô tả"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <Select
                          label="Trạng thái"
                          name="status"
                          options={[
                            { id: 1, name: "Hoạt động" },
                            { id: 2, name: "Ngừng hoạt động" },
                          ]}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 float-end">
                    <Button variant="secondary" onClick={handleHiddenModal} className="me-2">
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit">Save</Button>
                  </div>
                </div>
                </Form>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

ClassessList.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
