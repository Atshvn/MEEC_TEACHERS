import { TopMenuAdmin } from "../Template"
import { CourseAPI, QuestionAPI, TestAPI } from "../../Service";
import { Alertsuccess, Alerterror, Alertwarning, DataTable, ExportExcel, SelectCourse, FormatDateJson } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select';
export const CourseManage = () => {
 

    useEffect(() => {
        MEEC_Course_List();
    }, []);

    const [ID, setID] = useState(0);

    const [CourseName, setCourseName] = useState("");
    const CourseNameRef = useRef();


    const [CourseTime, setCourseTime] = useState(0);
    const CourseTimeRef = useRef()

    const [Description, setDescription] = useState('')
    const DescriptionRef = useRef();
    const [DisableBtn, setDisableBtn] = useState(false)
    const [data, setData] = useState([])

    const [Edit, setEdit] = useState(false)

    //#region List
    const MEEC_Course_List = async () => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await CourseAPI.getAll();

            setData(response)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }
    //#endregion

    const MEEC_Course_Save = async () => {
        setEdit(false)
        if (CourseName === "") {
            Alertwarning("Nhập tên khóa học");
            CourseNameRef.current.focus();
            return;
        }
        if (CourseTime === 0) {
            Alertwarning("Nhập thời lượng khóa học");
            CourseTimeRef.current.focus();
            return;
        }
        if (Description === "") {
            Alertwarning("Nhập mô tả khóa học");
            DescriptionRef.current.focus();
            return;
        }


        setDisableBtn(true)
        const obj = {
            name: CourseName,
            description: Description,
            timeStudy: CourseTime

        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await CourseAPI.post(obj);
            Alertsuccess("Lưu thành công");
            setDisableBtn(false)
            MEEC_Course_List();
        } catch (error) {
            Alerterror("Lỗi")
            setDisableBtn(false)
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Course_Delete = async (Id) => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await CourseAPI.delete(Id);
            Alertsuccess("Xóa thành công");
            const newData = data.filter(i => i.courseId !== Id);
            setData(newData)
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }
    const MEEC_Course_Edit = async () => {
        setEdit(true)
        const obj = {
            name: CourseName,
            timeStudy: CourseTime,
            description: Description
        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await CourseAPI.put({ Id: ID }, obj);
            Alertsuccess("Cập nhật thành công");
            setEdit(false)
            MEEC_Course_List();
        } catch (error) {
            setEdit(true)
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Course_View = (item) => {
        setEdit(true)
        setCourseName(item.name);
        setCourseTime(item.timeStudy);
        setDescription(item.description)
        setID(item.courseId);
        document.querySelector("#data-add").click();
    }

    const MEEC_Course_Cancer = () => {
        setEdit(false)
        setCourseName("");
        setCourseTime(0);
        setDescription("")
        setID(0);

    }
    
    const MEEC_Check_SaveEdit = () => 
    {
        Edit ? MEEC_Course_Edit() : MEEC_Course_Save()
    }



    //#region Table
    const columns = [
        {
            Header: "Tùy chọn",
            accessor: '[row identifier to be passed to button]',
            fixed: 'left',
            width: 110,
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
            Header: "Tên khóa học",
            accessor: "name",
            width: 300
        },
        {
            Header: "Thời lượng",
            accessor: "timeStudy",
            width: 100
        },
        {
            Header: "Mô tả khóa học",
            accessor: "description",

        }
    ];
    const clickEdit = (item) => {
        MEEC_Course_View(item.row._original)
    }
    const clickDelete = (item) => {
        MEEC_Course_Delete(item.row._original.courseId);
    }
    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-khoa-hoc");
    }

    const newData = data.map(i => {
        return {
            "Tên khóa học": i.name,
            "Thời lượng": i.timeStudy,
            "Mô tả": i.description

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
                                                <span class="d-none d-sm-block">Thêm mới</span>
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a href="#profile" data-toggle="tab" aria-expanded="true" class="nav-link ">
                                                <span class="d-block d-sm-none"><i class="mdi mdi-account-outline font-18"></i></span>
                                                <span class="d-none d-sm-block">Danh sách khóa học</span>
                                            </a>
                                        </li>


                                    </ul>
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane show active" id="home">
                                            <div className="card">
                                                <div className="card-header p-2  bg-w ">
                                                    <div class="d-flex align-items-center pt-1  " >
                                                        <h3 className="color-white card-title font-weight-bold align-middle mb-0">THÊM MỚI KHÓA HỌC</h3>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row ">
                                                        <div class="col-sm-12 col-md-6">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Tên khóa học<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <input type="text" class="form-control back-ground"
                                                                        ref={CourseNameRef} value={CourseName} onChange={e => setCourseName(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-6">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Thời lượng khóa học (giờ)<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <input type="number" class="form-control back-ground"
                                                                        ref={CourseTimeRef} value={CourseTime} onChange={e => setCourseTime(e.target.value)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12 col-md-12">
                                                            <div class="form-group">
                                                                <label class="label mb-0">Mô tả khóa học<sup className="cl-d">(*)</sup></label>
                                                                <div class="input-group">
                                                                    <textarea class="form-control back-ground" rows="5" id="example-textarea"
                                                                        ref={DescriptionRef} value={Description} onChange={e => setDescription(e.target.value)}>

                                                                    </textarea>

                                                                </div>
                                                            </div>
                                                        </div>



                                                        <div className="col-12 d-flex justify-content-center mt-4">
                                                            <button disabled={DisableBtn ? true : false} className="btn bg-c waves-effect width-md waves-light mr-3 "
                                                                onClick={MEEC_Check_SaveEdit}
                                                            >
                                                                Lưu
                                                        </button>
                                                            <button className="btn bg-d waves-effect width-md "
                                                                onClick={MEEC_Course_Cancer}>
                                                                Hủy
                                                        </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane " id="profile">
                                            <div className="card bx">
                                                <div className="card-header p-0 pl-2  bg-w ">
                                                    <div class="row">
                                                        <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0"> QUẢN LÝ KHÓA HỌC</h3>
                                                        </div>

                                                        <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                            <button type="button" class="btn btn-sm bg-i pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                                <i class="fa fa-download pr-2"></i>
                                                        Xuất Excel
                                                    </button>
                                                            <button type="button" class="btn btn-sm bg-d pull-right mr-2" onClick={MEEC_Course_List} >
                                                                <i class="fa fa-eye pr-2"></i>
                                                        Xem
                                                    </button>
                                                        </div>
                                                    </div>
                                                </div>

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
    )

}