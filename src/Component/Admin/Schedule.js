

import { TopMenuAdmin } from "../Template"
import { CourseAPI, QuestionAPI, ScheduleAPI, SystemAPI, TestAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson, Alertinfo, FormatDate } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const Schedule = () => {
    const Infor = JSON.parse(localStorage.getItem("TeacherInfor"));

    useEffect(() => {

        MEEC_Hourse_Local();
        MEEC_Day_Local();
        MEEC_Schedule_List(Infor.courseId)
    }, []);

    const [ID, setID] = useState(0);

    const [dataGr, setDataGr] = useState([])

    const [CourseName, setCourseName] = useState("")
    const [Hours, setHours] = useState([])

    const [Days, setDays] = useState([])


    // useEffect(() => {
    //     MEEC_Account_List_ByCourse(CourseNew)
    // }, [CourseNew])




    const MEEC_Hourse_Local = () => {
        const list = [
            { value: 0, label: "Vui lòng chọn" },
            { value: 1, label: "8AM - 10AM" },
            { value: 2, label: "10AM - 12AM" },
            { value: 3, label: "2PM - 4PM" },
            { value: 4, label: "4PM - 6PM" },
            { value: 5, label: "6PM - 8PM" },
            { value: 6, label: "8PM - 10PM" }
        ]
        setHours(list)
    }

    const MEEC_Day_Local = () => {
        const list = [
            { value: 0, label: "Vui lòng chọn" },
            { value: 1, label: "Thứ 2" },
            { value: 2, label: "Thứ 3" },
            { value: 3, label: "Thứ 4" },
            { value: 4, label: "Thứ 5" },
            { value: 5, label: "Thứ 6" },
            { value: 6, label: "Thứ 7" },
            { value: 7, label: "Chủ nhật" }
        ]
        setDays(list)
    }


    //#region List
    const MEEC_Schedule_List = async (id) => {

        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await ScheduleAPI.get(id);
            const res = response.filter(i => i.accountId === Infor.accountId)
            if (res.length > 0) {
                setCourseName(res[0].courseName)
            }
            setDataGr(res)
        } catch (error) {
            Alerterror("Đã có lỗi xảy ra, vui lòng thử lại sau")
            console.log('Failed to fetch: ', error);
        }
    }
    //#endregion

    const RenderBody = () => {
        return (
            dataGr.map((i, index) => {
                let d = Days.find(item => item.value === i.date)
                let t = Hours.find(item => item.value === i.time)
                return <tr key={index} className="t font-weight-bold">
                    <td>{i.courseName}</td>
                    <td>{i.idZoom}</td>
                    <td>{i.passZoom}</td>
                    <td>{d.label}</td>
                    <td>{t.label}</td>
                    <td>{i.fullName}</td>
                </tr>
            })
        )
    }

    return (
        <div className="unsticky-layout">
            <TopMenuAdmin />
            <div class="content-page" style={{ marginTop: '0px', padding: '0px' }}>
                <div class="content " style={{ marginTop: '80px' }}>
                    <div class="container-fluid">
                        <div class="row" style={{ height: '100vh' }}>
                            <div class="col-12">
                                <div class="card-box pt-0 bx">
                                    <ul class="nav nav-tabs tabs-bordered font-16" >
                                        <li class="nav-item">
                                            <a href="#home" id="data-add" data-toggle="tab" aria-expanded="false" class="nav-link active" >
                                                <span class="d-block d-sm-none"><i class="mdi mdi-home-variant-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Lịch dạy</span>
                                            </a>
                                        </li>



                                    </ul>
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane show active" id="home">
                                            <div className="card">
                                                <div className="card-header p-2 pl-2  bg-i ">
                                                    <div className="row">
                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <div class="d-flex align-items-center pt-1  " >
                                                                <h2 className="color-white card-title font-weight-bold align-middle mb-0">KHÓA HỌC: {CourseName} </h2>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <div class="pt-1 float-right  " >
                                                                <h2 className="color-white card-title font-weight-bold align-middle mb-0">Thời gian khóa học: 01/05/2021 - 30/07/2021</h2>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div class="card-body p-0">
                                                    <div class="table-responsive" style={{ overflowX: 'scroll' }}>
                                                        <table class="table mb-0 font-16 text-center schedule table-hover">
                                                            <thead>
                                                                <tr >
                                                                    <th style={{ minWidth: '110px' }}>Khóa học</th>
                                                                    <th style={{ minWidth: '150px' }}>Id Zoom</th>
                                                                    <th style={{ minWidth: '150px' }}>Mật khẩu</th>
                                                                    <th style={{ minWidth: '150px' }}>Ngày học</th>
                                                                    <th style={{ minWidth: '150px' }}>Giờ học</th>
                                                                    <th style={{ minWidth: '150px' }}>Giảng viên</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <RenderBody />
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}