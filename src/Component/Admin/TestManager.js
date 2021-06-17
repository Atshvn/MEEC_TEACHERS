import { TopMenuAdmin } from "../Template"
import { QuestionAPI, TestAPI, CourseAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson, FormatDate } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const TestManager = () => {

    const Infor = JSON.parse(localStorage.getItem("TeacherInfor"));
    useEffect(() => {
        MEEC_Course_List();
       
    }, []);
    useEffect(() => {
        MEEC_Test_List_ByCourse(Infor.courseId)
        MEEC_Test_ListNew_ByCourse(Infor.courseId)
    }, [])

    const [ID, setID] = useState(0);

    const [TestName, setTestName] = useState("");
    const TestNameRef = useRef();

    const [TestDate, setTestDate] = useState(new Date())

    const [TotalQuestion, setTotalQuestion] = useState(0);
    const TotalQuestionRef = useRef()

    const [TestTime, setTestTime] = useState(0);
    const TestTimeRef = useRef();

    const [CourseID, setCourseID] = useState(0)
    const [disableBtn, setDisableBtn] = useState(false);

    const [dateNow, setDateNow] = useState(new Date())
    const [data, setData] = useState([])


    const [DataCourse, setDataCourse] = useState([]);
    const [Edit, setEdit] = useState(false)

    const MEEC_Course_List = async () => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await CourseAPI.getAll();
            setDataCourse(response)
            const data= response.find(i => i.courseId === Infor.courseId)
            setCourseID(data)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    const filterItem = (item, data) => {
        return data.filter(i => i.courseId === item);
    }

    const MEEC_Test_List_ByCourse = async (id) => {
        try {
            const res = await CourseAPI.getAll();
            setDataCourse(res)
            const data= res.find(i => i.courseId === Infor.courseId)
            setCourseID(data)
            const response = await TestAPI.getByCourse(id);
            const newData = response.map(item => {
                const itemNew = filterItem(item.courseId, res);
                const Status = item.state ? "Chưa thi" : "Đã thi";
                return {
                    ...item,
                    courseName: itemNew[0].name,
                    dateTest: FormatDate(item.dateTest),
                    Status: Status
                }
            })
            setData(newData)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Test_Save = async () => {
        if (TestName === "") {
            Alertwarning("Nhập tên bài kiểm tra");
            TestNameRef.current.focus();
            return;
        }
        if (TestTime === 0) {
            Alertwarning("Nhập thời gian thi");
            TestTimeRef.current.focus();
            return;
        }
        if (TotalQuestion === 0) {
            Alertwarning("Nhập số lượng câu hỏi");
            TotalQuestionRef.current.focus();
            return;
        }
        if (TotalQuestion > 70) {
            Alertwarning("Số lượng câu hỏi quá lớn, vui lòng chọn lại");
            TotalQuestionRef.current.focus();
            return;
        }
        if (TestTime < 0) {
            Alertwarning("Thời gian không hợp lệ");
            TestTimeRef.current.focus();
            return;
        }
        if (TotalQuestion < 0) {
            Alertwarning("Số lượng câu hỏi không hợp lệ");
            TotalQuestionRef.current.focus();
            return;
        }
        if(TestDate.getTime() < dateNow.getTime()){
            Alertwarning("Thời gian thi phải lớn hơn hiện tại")
            return
        }

        setEdit(false)
        setDisableBtn(true)
        const obj = {
            testName: TestName,
            courseId: Infor.courseId,
            dateTest: FormatDateJson(TestDate, 0),
            time: +TestTime,
            totalQuestion: +TotalQuestion,
            createsby: "admin"

        }

        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await TestAPI.post(obj);
            Alertsuccess("Lưu thành công");
            setDisableBtn(false)
            MEEC_Test_List_ByCourse(Infor.courseId)
            MEEC_Test_ListNew_ByCourse(Infor.courseId)
        } catch (error) {
            Alerterror("Lỗi")
            setDisableBtn(false)
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Test_Delete = async (Id) => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await TestAPI.delete(Id);
            Alertsuccess("Xóa thành công");
            const newData = data.filter(i => i.testId !== Id);
            setData(newData)
            MEEC_Test_List_ByCourse(Infor.courseId)
            MEEC_Test_ListNew_ByCourse(Infor.courseId)
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Test_View = (item) => {
        setEdit(true)
        setID(item.testId)
        setTestName(item.testName)
        setTestTime(item.time);
        setTotalQuestion(item?.totalQuestion);


        document.querySelector("#data-add").click();
    }

    const MEEC_Test_Cancer = () => {
        setEdit(false)
        setTestName("")
        setTestTime(0);
        setTotalQuestion(0);
        setID(0);

    }

    const MEEC_Test_Edit = async () => {
        setEdit(true)
        const obj = {
            testName: TestName,
            time: +TestTime,
            totalQuestion: +TotalQuestion,
            courseId: Infor.courseId,
            dateTest: FormatDateJson(TestDate, 0),
            state: true
        }
        console.log(obj)
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await TestAPI.put(ID, obj);
            Alertsuccess("Cập nhật thành công");
            setEdit(false)
            MEEC_Course_List();
            MEEC_Test_List_ByCourse(Infor.courseId)
            MEEC_Test_ListNew_ByCourse(Infor.courseId)
        } catch (error) {
            setEdit(true)
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const HandleSave = () => {
        Edit ? MEEC_Test_Edit() : MEEC_Test_Save();
    }

    const [dataLock, setDataLock] = useState([])


    const MEEC_Test_ListNew_ByCourse = async (id) => {
        try {
            const res = await CourseAPI.getAll();
            setDataCourse(res)
            const data= res.find(i => i.courseId === Infor.courseId)
            setCourseID(data)
            const response = await TestAPI.getNew({ courseId: id });
            const newData = response.map(item => {
                const itemNew = filterItem(item.courseId, res);
                const Status = item.state ? "Chưa thi" : "Đã thi";
                return {
                    ...item,
                    courseName: itemNew[0].name,
                    dateTest: FormatDate(item.dateTest),
                    Status: Status
                }
            })
            setDataLock(newData)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }



    const MEEC_Test_Close = async (id) => {
        try {
            const res = await TestAPI.lockTest(id)
            if (res === 'Success') {
                Alertsuccess("Khoá test thành công")
                const newData = dataLock.filter(i => i.testId !== id);
                setDataLock(newData)
                return
            }
            else {
                Alerterror("Đã có lỗi xảy ra, vui lòng thử lại sau")
                return
            }

        } catch (error) {
            console.log(error)
            Alerterror("Đã có lỗi xảy ra, vui lòng thử lại sau")
        }

    }


    //#region Table
    const columns = [
        {
            Header: "Tùy chọn",
            accessor: '[row identifier to be passed to button]',
            fixed: 'left',
            minWidth: 110,
            Cell: ({ row }) => (<span><button
                className="btn btn-sm btn-info" style={{ marginRight: '5px' }} onClick={e => clickEdit({ row })}>Sửa
            </button><button
                className="btn btn-sm btn-danger" onClick={e => clickDelete({ row })}>Xóa
                </button></span>)
        },
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
            Header: "Thuộc khóa",
            accessor: "courseName",
            minWidth: 200
        },
        {
            Header: "Thời lượng thi (phút)",
            accessor: "time",
            minWidth: 150
        },
        {
            Header: "Số lượng câu hỏi",
            accessor: "totalQuestion",
            minWidth: 150

        },
        {
            Header: "Ngày thi",
            accessor: "dateTest",
            minWidth: 100

        },
        {
            Header: "Tình trạng",
            accessor: "Status",
            minWidth: 100

        }
    ];
    const clickEdit = (item) => {
        MEEC_Test_View(item.row._original)
    }
    const clickDelete = (item) => {

        MEEC_Test_Delete(item.row._original.testId);
    }
    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-bai thi");
    }

    const newData = data.map(i => {
        return {
            "Bài thi": i.testName,
            "Khóa": i.courseName,
            "Thời gian": i.time,
            "Ngày thi": i.dateTest,
            "Số lượng câu hỏi": i.totalQuestion

        }
    })
    //#endregion
    //#region Table2
    const columns2 = [
        {
            Header: "Tùy chọn",
            accessor: '[row identifier to be passed to button]',
            fixed: 'left',
            minWidth: 80,
            Cell: ({ row }) => (<span><button
                className="btn btn-sm btn-danger" onClick={e => clickDelete2({ row })}> <i class="fas fa-lock pr-2"></i>Khóa
            </button></span>)
        },
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
            Header: "Thuộc khóa",
            accessor: "courseName",
            minWidth: 200
        },
        {
            Header: "Thời lượng thi (phút)",
            accessor: "time",
            minWidth: 150
        },
        {
            Header: "Số lượng câu hỏi",
            accessor: "totalQuestion",
            minWidth: 150

        },
        {
            Header: "Ngày thi",
            accessor: "dateTest",
            minWidth: 100

        },
        {
            Header: "Tình trạng",
            accessor: "Status",
            minWidth: 100

        }
    ];

    const clickDelete2 = (item) => {

        MEEC_Test_Close(item.row._original.testId);
    }
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
                                                <span class="d-none d-sm-block">Thêm mới</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#profile" data-toggle="tab" aria-expanded="true" class="nav-link ">
                                                <span class="d-block d-sm-none"><i class="mdi mdi-account-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Danh sách bài thi</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#close" data-toggle="tab" aria-expanded="true" class="nav-link ">
                                                <span class="d-block d-sm-none"><i class="mdi mdi-account-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Đóng - Kết thúc bài thi</span>
                                            </a>
                                        </li>


                                    </ul>
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane show active" id="home">
                                            <div className="card">
                                                <div className="card-header p-2  bg-i ">
                                                    <div class="d-flex align-items-center pt-1  " >
                                                        <h3 className="color-white card-title font-weight-bold align-middle mb-0">THÊM BÀI KIỂM TRA</h3>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row ">
                                                        <div class="col-sm-12 col-md-4">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Tên bài kiểm tra<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <input type="text" class="form-control back-ground"
                                                                        ref={TestNameRef} value={TestName} onChange={e => setTestName(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-4">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Thời gian thi (phút)<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <input type="number" class="form-control back-ground"
                                                                        ref={TestTimeRef} value={TestTime} onChange={e => setTestTime(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-4">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Số lượng câu hỏi<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <input type="number" class="form-control back-ground"
                                                                        ref={TotalQuestionRef} value={TotalQuestion} onChange={e => setTotalQuestion(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-6">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Ngày thi<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group SelectDatetime">
                                                                    <DateTimePicker className="form-control"
                                                                        onChange={date => setTestDate(date)}
                                                                        value={TestDate}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-6">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Khóa học</label>
                                                                <div class="input-group">
                                                                    <input type="text" class="form-control back-ground"
                                                                        value={CourseID.name} disabled />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-12 d-flex justify-content-center mt-4">
                                                            <button disabled={disableBtn ? true : false} className="btn bg-c waves-effect width-md waves-light mr-3 "
                                                                onClick={HandleSave}
                                                            >
                                                                Lưu
                                                            </button>
                                                            <button className="btn bg-d waves-effect width-md "
                                                                onClick={MEEC_Test_Cancer}>
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane " id="profile">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-i ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0"> QUẢN LÝ BÀI KIỂM TRA</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                                <i class="fa fa-download pr-2"></i>
                                                                Xuất Excel
                                                            </button>
                                                            <button type="button" class="btn btn-sm btn-danger pull-right mr-2" onClick={e => MEEC_Test_List_ByCourse(Infor.courseId)} >
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

                                        <div class="tab-pane " id="close">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-i ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0">QUẢN LÝ ĐÓNG BÀI THI</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">

                                                            <button type="button" class="btn btn-sm bg-c pull-right mr-2" onClick={e => MEEC_Test_ListNew_ByCourse(Infor.courseId)} >
                                                                <i class="fa fa-eye pr-2"></i>
                                                                Xem
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body ">
                                                <div className= "table-responsive font-16" style={{ color: '#555', zIndex: '0' }}>
                                                    <DataTable
                                                        data={dataLock}
                                                        columns={columns2}
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