import axiosClient from "./axiosClient";

export const ScheduleAPI = {
    
    get : (id) => {
        const url = `/TimeTable/course/${id}`;
        return axiosClient.get(url);
    },
     getALL : () => {
        const url = `/TimeTable`;
        return axiosClient.get(url);
    },
    put: (id, data) => {
        const url = `/TimeTable/${id}`;
        return axiosClient.put(url, data );
    },
    delete:(id) => {
        const url = `/TimeTable/${id}`;
        return axiosClient.delete(url);
    },
    post: ( data) => {
        const url = '/TimeTable';
        return axiosClient.post(url,  data );
    }
}