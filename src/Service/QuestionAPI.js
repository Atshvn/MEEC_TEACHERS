import axiosClient from "./axiosClient";

export const QuestionAPI = {
    getAll: (params) => {
        const url = '/questions';
        return axiosClient.get(url, { params });
    },
    put: (params, data) => {
        const url = '/questions';
        return axiosClient.put(url, data ,{ params });
    },
    delete: (params) => {
        const url = '/questions';
        return axiosClient.delete(url, { params });
    },
    post: ( data) => {
        const url = '/questions';
        return axiosClient.post(url,  data );
    },
    postMutil: ( data) => {
        const url = '/questions/questions';
        return axiosClient.post(url,  data );
    }
}