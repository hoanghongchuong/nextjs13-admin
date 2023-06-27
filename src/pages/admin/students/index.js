import AdminLayout from "@/components/layout/admin";
import Link from "next/link";
import React from "react";
import { Form, Table } from "react-bootstrap";

function ProductList(props) {
  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Students</h1>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li class="breadcrumb-item active">Students</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="container-fluid">
          <div className="row mb-3">
            <div class="col-3">
              <input
                name="sku"
                id="sku"
                type="text"
                class="form-control form-control-sm"
                value=""
                placeholder="Name, phone, parent"
              />
            </div>
            <div class="col-2">
              <Form.Select aria-label="Default select example" size="sm">
                <option>Status</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div class="col-4">
              <button type="submit" class="btn btn-sm btn-primary">
                Search
              </button>
            </div>
          </div>
          <div className="card ">
            <div className="card-header">
            <p class="card-title mb-0">
                Showing 1 to 20 of 172549 records
            </p>
            </div>
            <div className="card-body p-0">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>#</th>
                    <th style={{ width: "10%" }}>Name</th>
                    <th style={{ width: "10%" }}>Age</th>
                    <th style={{ width: "10%" }}>Gender</th>
                    <th style={{ width: "10%" }}>Parent</th>
                    <th style={{ width: "10%" }}>Phone Number</th>
                    <th style={{ width: "3%" }} class="text-center">
                      Status
                    </th>
                    <th style={{ width: "7%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>aaa</td>
                    <td>32</td>
                    <td>nam</td>
                    <td>afds f</td>
                    <td>123231232</td>
                    <td className="text-center">active</td>
                    <td className="text-right">
                      <Link class="btn btn-info btn-sm me-2" href="#">
                        <i class="fas fa-pencil-alt me-1"></i>
                        Edit
                      </Link>

                      <Link class="btn btn-danger btn-sm" href="#">
                        <i class="fas fa-trash me-1"></i>
                        Delete
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;

ProductList.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
