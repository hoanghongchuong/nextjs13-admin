import axiosClient from "./axios-client"

export const classesApi = {
    getAllClasses() {
        return axiosClient.get('/classes/all')
    },
    getListClasses(params) {
        return axiosClient.get('/classes', {params: params})
    },
    detailClasses(id) {
        return axiosClient.get(`/classes/${id}`)
    },
    createClasses(payload) {
        return axiosClient.post('/classes/create', payload)
    }
}

export default classesApi;