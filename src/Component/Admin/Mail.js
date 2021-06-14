
import { TopMenuAdmin } from "../Template"
import { QuestionAPI, TestAPI, CourseAPI, SystemAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson, FormatDate, Alertinfo } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const Mail = () => {

    useEffect(() => {
        MEEC_Mail_List();
    }, []);

  



    const [data, setData] = useState([])


    const MEEC_Mail_List = async () => {
        try {
            const response = await SystemAPI.getMailbox();
            const x  =  response.map(i => {
                return { ...i, date: FormatDate(i.date)}
            })
            setData(x)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    //#region Table
    const columns = [
       { Header: "STT",
        accessor: "content",
        width: 50,
        Cell: (row) => <span>{row.index + 1}</span>,
        
    },
        {
            Header: "Tên người góp ý",
            accessor: "fullName",
            minWidth: 200
        },
        {
            Header: "Email người góp ý",
            accessor: "email",
            minWidth: 200
        },
        {
            Header: "Số điện thoại người góp ý",
            accessor: "phone",
            minWidth: 150
        },
        {
            Header: "Nội dung góp ý",
            accessor: "content",
            minWidth: 150

        }
        ,
        {
            Header: "Ngày góp ý",
            accessor: "date",
            minWidth: 150

        }
    ];

    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-gop-y");
    }

    const newData = data.map(i => {
        return {
            "Tên người góp ý": i.fullName,
            "Email": i.email,
            "Số điện thoại ": i.phone,
            "Nội dung": i.content,
            "Ngày góp ý": i.date
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
                                            <a href="#profile" data-toggle="tab" aria-expanded="true" class="nav-link active">
                                                <span class="d-block d-sm-none"><i class="mdi mdi-account-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Danh sách góp ý và tư vấn</span>
                                            </a>
                                        </li>


                                    </ul>
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane show active" id="profile">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-i ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0">DANH SÁCH GÓP Ý VÀ TƯ VẤN TỪ KHÁCH HÀNG</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                                <i class="fa fa-download pr-2"></i>
                                                        Xuất Excel
                                                    </button>
                                                            <button type="button" class="btn btn-sm btn-danger pull-right mr-2" onClick={MEEC_Mail_List}  >
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