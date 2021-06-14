import { TopMenuAdmin } from "../Template"
import { QuestionAPI, TestAPI, CourseAPI, SystemAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson, FormatDate } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const ListStudent = () => {

    const Infor = JSON.parse(localStorage.getItem("TeacherInfor"));
    useEffect(() => {
        MEEC_Acc_List();
    }, []);
  

  


    const [data, setData] = useState([])


   

    const MEEC_Acc_List = async () => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await SystemAPI.accByCourse(Infor.courseId);
            const dataNew  = response.filter(i => i.roleId === 2 && i.state)
            const dt = dataNew.map(i => {
                return {...i, dateOfBirth: FormatDate(i.dateOfBirth)}
            })
           setData(dt)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    console.log(data)
   

    //#region Table
    const columns = [
      
        {
            Header: "STT",
            accessor: "content",
            width: 50,
            Cell: (row) => <span>{row.index + 1}</span>,

        },
        {
            Header: "Tên học viên",
            accessor: "fullName",
            minWidth: 150
        },
        {
            Header: "Email",
            accessor: "email",
            minWidth: 200
        },
        {
            Header: "Số điện thoại",
            accessor: "phoneNumber",
            minWidth: 150
        },
        {
            Header: "Giới tính",
            accessor: "gender",
            minWidth: 100

        },
        {
            Header: "Ngày sinh",
            accessor: "dateOfBirth",
            minWidth: 150
        },
        {
            Header: "Địa chỉ",
            accessor: "address",
            minWidth: 150
        }

    ];
   
    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-hoc-vien");
    }

    const newData = data.map(i => {
        return {
            "Tên": i.testName,
            "Email": i.courseName,
            "Số điện thoại": i.time,
            "Ngày sinh": i.dateTest,
            "Giới tính": i.dateTest,
            "Địa chỉ": i.totalQuestion,

        }
    })
    //#endregion
  

    return (
        <div className="unsticky-layout">
            <TopMenuAdmin />
            <div class="content-page" style={{ marginTop: '0px', padding: '0px' }}>
                <div class="content " style={{ marginTop: '80px' }}>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card-box pt-0 bx">
                                    <ul class="nav nav-tabs tabs-bordered font-16" >
                                        <li class="nav-item">
                                            <a href="#home" id="data-add" data-toggle="tab" aria-expanded="false" class="nav-link active" >
                                                <span class="d-block d-sm-none"><i class="mdi mdi-home-variant-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Danh sách</span>
                                            </a>
                                        </li>
                                       


                                    </ul>
                                    <div class="tab-content pt-3">
                                        
                                        <div class="tab-pane show active" id="home">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-i ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0"> DANH SÁCH HỌC VIÊN CỦA KHÓA HỌC</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                                <i class="fa fa-download pr-2"></i>
                                                                Xuất Excel
                                                            </button>
                                                            <button type="button" class="btn btn-sm btn-danger pull-right mr-2"  >
                                                                <i class="fa fa-eye pr-2"></i>
                                                                Xem
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body ">
                                                <div className="table-responsive font-16" style={{ color: '#555', zIndex: '0' }}>
                                                    <DataTable
                                                        data={data}
                                                        columns={columns}
                                                    />
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