import axiosClient from "./axios-client";

export const studentApi = {
  getListStudent(params) {
    console.log({params});
    return axiosClient.get("/students", { params: params });
  },
  detailStudent(id) {
    return axiosClient.get(`/students/detail/${id}`);
  },
  createStudent(payload) {
    return axiosClient.post("/students/create", payload);
  },
  updateStudent(payload, id) {
    return axiosClient.put(`/students/update/${id}`, payload);
  },
  deleteStudent(id) {
    return axiosClient.delete("/students/delete/" + id);
  },
};

export default studentApi;
