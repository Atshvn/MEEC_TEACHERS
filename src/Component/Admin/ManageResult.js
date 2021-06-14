import { TopMenuAdmin } from "../Template"
import { QuestionAPI, TestAPI, CourseAPI, SystemAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson, FormatDate, Alertinfo } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const ManageResult = () => {
    const Infor = JSON.parse(localStorage.getItem("TeacherInfor"));
    const courseIDTeacher = Infor.courseId;
    useEffect(() => {
        MEEC_Course_List();
    }, []);
    const [CourseSearch, setCourseSearch] = useState(0);

    useEffect(() => {
        setData([])
        if (CourseSearch === 0) {
            return MEEC_Test_List();
        }
        else {
            return MEEC_Test_List_ByCourse();
        }
    }, [CourseSearch])



    const [data, setData] = useState([])

    const [TestId, setTestId] = useState({value: 0, label: 'Vui lòng chọn'})
    const [DataCourse, setDataCourse] = useState([]);
    const [dataGr, setDataGr] = useState([])

    const MEEC_Course_List = async () => {
        try {
            const response = await CourseAPI.getAll();

            setDataCourse(response)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }


    //#region List
    const MEEC_Test_List = async () => {
        setTestId({value: 0, label: 'Vui lòng chọn'})
        try {
            const response = await TestAPI.getAll();
            const d ={value: 0, label: 'Vui lòng chọn'};
            let dataSelect = [];
            dataSelect.push(d)
            response.forEach((element, index) => {
                dataSelect.push({ value: element.testId, label: element.testName });
            });
            setData(dataSelect);
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Test_List_ByCourse = async () => {
        setTestId({value: 0, label: 'Vui lòng chọn'})
        try {
            const response = await TestAPI.getByCourse(courseIDTeacher);
            const d ={value: 0, label: 'Vui lòng chọn'};
            let dataSelect = [];
            dataSelect.push(d)
            response.forEach((element, index) => {
                dataSelect.push({ value: element.testId, label: element.testName });
            });
            setData(dataSelect)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }




    const MEEC_Result_List =  async () => {
        if(TestId.value ===0){
            Alertwarning("Vui lòng chọn bài thi")
            return
        }
        try {
            const res  =  await TestAPI.getResultList(TestId.value)
            if(res.length == 0){
                Alertwarning("Không có kết quả nào cho bài thi")
            }
            const newData = res.map(i => {
                return {...i, date: FormatDate(i.date), score: `${i.score}/100`}
            })
            setDataGr(newData)
        } catch (error) {
            
        }
    }

    //#region Table
    const columns = [
        {
            Header: "STT",
            accessor: "content",
            width: 50,
            Cell: (row) => <span>{row.index + 1}</span>,
            
        },
        {
            Header: "Tên bài kiểm tra",
            accessor: "testName",
            minWidth: 200
        },
        {
            Header: "Tên học viên",
            accessor: "fullName",
            minWidth: 200
        },
        {
            Header: "Điểm",
            accessor: "score",
            minWidth: 150
        },
        {
            Header: "Ngày thi",
            accessor: "date",
            minWidth: 150

        }
    ];

    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-ket-qua-bai-thi");
    }

    const newData = dataGr.map(i => {
        return {
            "Tên bài kiểm tra": i.testName,
            "Tên học viên": i.fullName,
            "Tên ": i.score,
            "Ngày thi": i.date
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
                                                <span class="d-none d-sm-block">Danh sách kết quả bài thi</span>
                                            </a>
                                        </li>


                                    </ul>
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane show active" id="profile">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-i ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0">DANH SÁCH KẾT QUẢ THI</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                                <i class="fa fa-download pr-2"></i>
                                                        Xuất Excel
                                                    </button>
                                                            <button type="button" class="btn btn-sm btn-danger pull-right mr-2" onClick={MEEC_Result_List}  >
                                                                <i class="fa fa-eye pr-2"></i>
                                                        Xem
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body ">
                                                    <div className="row d-flex m-auto">
                                                        <div className="col-md-6 col-12">
                                                        <div class="form-group">
                                                                <label class="label mb-0">Bài thi <sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                <Select
                                                                    className={`SelectMeno font-16`}
                                                                    styles={{ color: '#c7c3c3' }}
                                                                    value={TestId}
                                                                    onChange={ e=> setTestId(e)}
                                                                    options={data}
                                                                />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={dataGr.length > 0 ? "table-responsive font-16" : "display-none"} style={{ color: '#555', zIndex: '0' }}>
                                                    <DataTable
                                                        data={dataGr}
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
    )

}