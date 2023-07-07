import axiosClient from "./axios-client"

export const studentApi = {
    getListStudent(params) {
        return axiosClient.get('/students', {params: params})
    },
    detailStudent(id) {
        return axiosClient.get(`/${id}`)
    },
    createStudent(payload) {
        return axiosClient.post('/students/create', payload)
    }
}

export default studentApi;