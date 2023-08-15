import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Modal, Table } from "react-bootstrap";
import { Formik, Form } from "formik";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";
import numeral from "numeral";
import Link from "next/link";
import Head from "next/head";

import AdminLayout from "@/components/layout/admin";
import PaginationCustom from "@/components/pagination/pagination";
import InputField from "@/components/form/input-field";
import RadioButton from "@/components/form/radio-button";
import Textarea from "@/components/form/textarea";
import Select from "@/components/form/select";
import Skeleton from "react-loading-skeleton";

import classesApi from "@/api-client/classes-api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc."),
  start_time: Yup.string(),
  end_time: Yup.string(),
  tuition_fee: Yup.string(),
  description: Yup.string(),
});

const parseTuitionFee = (value) => {
  return numeral(value).value();
};

export default function ClassessList() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [classList, setClassList] = useState([]);
  const [filters, setFilters] = useState({ keyword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [classSelected, setClassSelected] = useState({});
  const [showModalDelete, setshowModalDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState({
    totalRecords: 0,
    totalPages: 0,
    from: 0,
    to: 0,
  });

  const modalTitle = classSelected.id ? "Cập nhật lớp học" : "Thêm mới lớp học";

  const initialValues = {
    name: classSelected?.name ?? "",
    start_time: classSelected?.start_time ?? "",
    end_time: classSelected?.end_time ?? "",
    tuition_fee: classSelected?.tuition_fee
      ? numeral(classSelected?.tuition_fee).format("0,0.00")
      : "",
    description: classSelected?.description ?? "",
    status: classSelected?.status ?? 1,
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await classesApi.getListClass(filters);
      const data = response.data;
      setClassList(data?.data);
      setPaginationInfo({
        totalRecords: data?.total,
        totalPages: Math.ceil(data?.total / data?.per_page),
        from: data?.from,
        to: data?.to,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("error fetching data: ", error);
      setIsLoading(false);
    }
  };
  function handlePageChange(page) {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page },
    });

    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
    }));
    setCurrentPage(page);
  }

  function handleHiddenModal() {
    setShowModal(false);
    setClassSelected({});
  }
  function handleSearch() {
    const query = { keyword: keyword };
    if (!keyword) {
      delete query.keyword;
    }

    router.push({
      pathname: router.pathname,
      query: query,
    });
    setFilters({
      keyword: keyword,
    });
  }

  function showModalEdit(item) {
    setShowModal(true);
    setClassSelected(item);
    console.log("vao day", item);
  }

  const handleSubmit = async (values) => {
    try {
      setIsSaving(true);
      if (classSelected.id) {
        await classesApi.updateClass(classSelected.id, {
          ...values,
          tuition_fee: parseTuitionFee(values.tuition_fee),
        });
      } else {
        await classesApi.createClasses({
          ...values,
          tuition_fee: parseTuitionFee(values.tuition_fee),
        });
      }
      fetchData();
      handleHiddenModal();

      toast.success(modalTitle + " thành công");
    } catch (error) {
      console.log("error", error);
      toast.error("Fail to add new classroom");
    } finally {
      setIsSaving(false);
    }
  };

  function openModalDelete(item) {
    setClassSelected(item);
    setshowModalDelete(true);
  }

  async function confirmDeleteClass() {
    try {
      setIsDelete(true);
      await classesApi.detailClasses(classSelected.id);
      setshowModalDelete(false);
      setClassSelected({});
      fetchData();
      toast.success("Xóa thành công.");
      setIsDelete(false);
    } catch (error) {
      setIsDelete(false);
      toast.error("Không thể xóa lớp học.");
    }
  }

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
                Showing {paginationInfo.from} to {paginationInfo.to} of{" "}
                {paginationInfo.totalRecords} records
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
              {isLoading ? (
                <Skeleton count={11} style={{ display: "block" }} />
              ) : (
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
                    {classList.map((item) => (
                      <tr key={item.id}>
                        <td>ST_{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.start_time}</td>
                        <td>{item.end_time}</td>
                        <td>{numeral(item.tuition_fee).format("0,0.00")}</td>
                        <td className="text-center">
                          {item.status == 1 ? "Active" : "Inactive"}
                        </td>
                        <td>
                          <div className="text-right d-flex flex-nowrap justify-content-end">
                            <Link
                              className="btn btn-info btn-sm me-2 d-flex flex-nowrap align-items-center"
                              href="#"
                              onClick={() => showModalEdit(item)}
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
            totalPages={paginationInfo.totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
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
            {({ values }) => (
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
                      <Button
                        variant="secondary"
                        onClick={handleHiddenModal}
                        className="me-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            Saving
                            <ClipLoader color="#3498db" size={6} />
                          </>
                        ) : (
                          <>
                            <i className="fa fa-save"></i> Save
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalDelete}
        onHide={() => setshowModalDelete(false)}
        animation={true}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="border-0 fs-4">
          Xác nhận xóa lớp học {classSelected.name}?
        </Modal.Body>
        <div className="border-0 p-3 text-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => setshowModalDelete(false)}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={confirmDeleteClass}
            disabled={isDelete}
          >
            {isDelete ? (
              <>
                Xóa <ClipLoader color="#3498db" size={20} />
              </>
            ) : (
              <>Xóa</>
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
}

ClassessList.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
