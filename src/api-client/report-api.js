import axiosClient from "./axios-client";

export const reportApi = {
    getReport(params) {
        return axiosClient.get('/report', {params: params})
    }
}