import axiosClient from "./axios-client";

export const scheduleApi = {
  getListSchedule(startDate, endDate) {
    return axiosClient.get("/schedule", {
      params: { start_date: startDate, end_date: endDate },
    });
  },
};
