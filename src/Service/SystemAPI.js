import axiosClient from "./axiosClient";

export const SystemAPI = {
    login: (data) => {
        const url = '/Account/login';
        return axiosClient.post(url, data);
    },
    signup: (data) => {
        const url = '/Account';
        return axiosClient.post(url, data);
    },
    put:  (data) => {
        const url = '/Account';
        return axiosClient.put(url, data);
    },
    forgot:  (params) => {
        const url = '/account/getpassword';
        return axiosClient.get(url, {params});
    },
    accByCourse:  (id) => {
        const url = `/account/course/${id}`;
        return axiosClient.get(url);
    },
    getAll:  (params) => {
        const url = `/account`;
        return axiosClient.get(url, {params});
    },
    getMailbox:  (params) => {
        const url = '/mailboxs';
        return axiosClient.get(url, {params});
    },
    addAcc : (data) => {
        const url = '/Account/admin/add';
        return axiosClient.post(url, data);
    },
    activeAcc : (id) => {
        const url = `/Account/active/${id}`;
        return axiosClient.get(url);
    },


}
