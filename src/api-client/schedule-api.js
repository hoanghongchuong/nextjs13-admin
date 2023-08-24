import axiosClient from "./axios-client";

export const scheduleApi = {
  getListSchedule(startDate, endDate) {
    return axiosClient.get("/schedule", {
      params: { start_date: startDate, end_date: endDate },
    });
  },
  getDetailSchedule(id) {
    return axiosClient.get(`/schedule/detail/${id}`);
  },
  editSchedule(id, params) {
    console.log(params);
    return axiosClient.put(`/schedule/edit/${id}`, params)
  }
};
