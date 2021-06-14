import axiosClient from "./axiosClient";

export const CourseAPI = {
    getAll: (params) => {
        const url = '/course';
        return axiosClient.get(url, { params });
    },
    post: (data) => {
        const url = '/course';
        return axiosClient.post(url, data);
    },
    put: (params, data) => {
        const url = '/course';
        return axiosClient.put(url, data, {params});
    },
    delete: (id) => {
        const url = `/course/${id}`;
        return axiosClient.delete(url);
    }
}
