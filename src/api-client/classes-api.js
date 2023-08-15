import axiosClient from "./axios-client"

export const classesApi = {
    getAllClasses() {
        return axiosClient.get('/classes/all');
    },
    getListClass(params) {
        return axiosClient.get('/classes', {params: params});
    },
    getListClasses(params) {
        return axiosClient.get('/classes', {params: params})
    },
    detailClasses(id) {
        return axiosClient.delete(`/classes/delete/${id}`)
    },
    createClasses(payload) {
        return axiosClient.post('/classes/create', payload)
    },
    updateClass(id, payload) {
        return axiosClient.put(`/classes/edit/${id}`, payload)
    }
}

export default classesApi;