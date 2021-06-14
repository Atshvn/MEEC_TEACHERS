import axiosClient from "./axiosClient";

export const TestAPI = {
    getAll: (params) => {
        const url = '/test/listtest';
        return axiosClient.get(url, { params });
    },
    getByCourse: (id) => {
        const url = `/test/listByCourse/${id}`;
        return axiosClient.get(url);
    }, 
    get: (id) => {
        const url = `/test/${id}`;
        return axiosClient.get(url);
    },
    getUnfinished: (params) => {
        const url = '/test/new';
        return axiosClient.get(url, { params });
    },
    getFinish: (params) => {
        const url = '/test/old';
        return axiosClient.get(url, { params });
    },
    post:  (data) => {
        const url = '/test';
        return axiosClient.post(url, data);
    },
    delete: (id) => {
        const url = `/test/${id}`;
        return axiosClient.delete(url);
    },
    put: (id, data) => {
        const url = `/test/${id}`;
        return axiosClient.put(url, data);
    },
    submit:  (data) => {
        const url = '/test/submit';
        return axiosClient.post(url, data);
    },
    getNew :  (params) => {
        const url = '/test/new/courseid';
        return axiosClient.get(url, { params });
    },
    getOld :  (params) => {
        const url = '/test/old/courseid';
        return axiosClient.get(url, { params });
    },
    getResult :  (params) => {
        const url = '/result';
        return axiosClient.get(url, { params });
    },
    checkDone : (params) => {
        const url = '/test/isdoing';
        return axiosClient.get(url, { params });
    },
    getResultList : (id) => {
        const url = `/result/test/${id}`;
        return axiosClient.get(url);
    },
    lockTest:  (id) => {
        const url = `/Test/admin/closed/${id}`;
        return axiosClient.get(url);
    },
    // getTestActive: (params) => {
    //     const url = '/test/new';
    //     return axiosClient.get(url, { params });
    // },
    // getTestActive: (params) => {
    //     const url = '/test/new';
    //     return axiosClient.get(url, { params });
    // },
    // getTestActive: (params) => {
    //     const url = '/test/new';
    //     return axiosClient.get(url, { params });
    // }
}

// const [productList, setProductList] = useState([]);
// useEffect(() => {
// const fetchProductList = async () => {
// try {
// const params = { _page: 1, _limit: 10 };
// const response = await productApi.getAll(params);
// console.log('Fetch products successfully: ', response);
// setProductList(response.data);
// } catch (error) {
// console.log('Failed to fetch product list: ', error);
// }
// }
// fetchProductList();
// }, []);