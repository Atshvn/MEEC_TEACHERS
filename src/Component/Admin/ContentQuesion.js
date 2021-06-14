import { QuestionAPI } from "../../Service";
import { Alertsuccess,Alerterror, Alertwarning, DataTable, ExportExcel } from "../../Commom";
import React, { useState, useEffect, useRef } from 'react';
import XLSX from 'xlsx'
import { Link } from "react-router-dom";


export const ContentQuestion = () => {
    useEffect(() => {
        MEEC_Question_List();
    }, []);
    const [ID, setID] = useState(0);
    const [Content, setContent] = useState('');
    const ContentRef = useRef();

    const [answerA, setA] = useState('');
    const ARef = useRef();

    const [answerB, setB] = useState('');
    const BRef = useRef();

    const [answerC, setC] = useState('');
    const CRef = useRef();

    const [answerD, setD] = useState('');
    const DRef = useRef();

    const [Correct, setCorrect] = useState('');
    const CorrectRef = useRef();
    const [getEdit, setGetEdit] = useState(false)

    //#region List
    const MEEC_Question_List = async () => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await QuestionAPI.getAll();
            const datanew = response.map(i => {
                return {
                    ...i,
                    content: i.content.trim(),
                    answerA: i.answerA.trim(),
                    answerB: i.answerB.trim(),
                    answerC: i.answerC.trim(),
                    answerD: i.answerD.trim(),
                    corectAns: i.corectAns.trim(),
                }
            })
            setData(datanew)
        } catch (error) {
            console.log('Failed to fetch: ', error);
        }
    }
    //#endregion

    const MEEC_Question_Save = async () => {
        if (Content === "") {
            Alertwarning("Nhập câu hỏi");
            ContentRef.current.focus();
            return;
        }
        if (answerA === "") {
            Alertwarning("Nhập đáp án");
            ARef.current.focus();
            return;
        }
        if (answerB === "") {
            Alertwarning("Nhập đáp án");
            BRef.current.focus();
            return;
        }
        if (answerC === "") {
            Alertwarning("Nhập đáp án");
            CRef.current.focus();
            return;
        }
        if (answerD === "") {
            Alertwarning("Nhập đáp án");
            DRef.current.focus();
            return;
        }
        if (Correct === "") {
            Alertwarning("Nhập kết quả");
            CorrectRef.current.focus();
            return;
        }

        const obj = {
            content: Content,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            corectAns: Correct
        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await QuestionAPI.post(obj);
            Alertsuccess("Lưu thành công")
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Question_Edit = async () => {
        const obj = {
            content: Content,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            corectAns: Correct
        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await QuestionAPI.put({ id: ID }, obj);
            Alertsuccess("Cập nhật thành công")
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }
    const MEEC_Question_Delete = async (Id) => {
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await QuestionAPI.delete({ id: Id });
            Alertsuccess("Xóa thành công");
            const newData = data.filter(i => i.questionId !== Id);
            setData(newData)
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Question_View = (item) => {
        setGetEdit(true)
        setID(item.questionId);
        setContent(item.content);
        setA(item.answerA);
        setB(item.answerB);
        setC(item.answerC);
        setD(item.answerD);
        setCorrect(item.corectAns);
        document.querySelector("#data-add").click();
    }

    const MEEC_Question_Cancer = () => {
        setGetEdit(false);
        setID(0);
        setContent("")
        setA("")
        setB("")
        setC("")
        setD("")
        setCorrect("")
    }

    const SaveAndEdit = () =>{
        getEdit ? MEEC_Question_Edit() : MEEC_Question_Save();
    }

    const [data, setData] = useState([])

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
            Header: "Nội dung",
            accessor: "content",
            width: 400,
        },
        {
            Header: "Đáp án 1",
            accessor: "answerA",
        },
        {
            Header: "Đáp án 2",
            accessor: "answerB",
        },
        {
            Header: "Đáp án 3",
            accessor: "answerC",

        },
        {
            Header: "Đáp án 4",
            accessor: "answerD",

        }
        ,
        {
            Header: "Đáp án đúng",
            accessor: "corectAns",

        }
    ];
    const clickEdit = (item) => {
        MEEC_Question_View(item.row._original)
    }
    const clickDelete = (item) => {
        MEEC_Question_Delete(item.row._original.questionId);
    }
    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-cau-hoi");
    }

    const newData = data.map(i => {
        return {
            "Câu hỏi": i.content,
            "Đáp án 1": i.answerA,
            "Đáp án 2": i.answerB,
            "Đáp án 3": i.answerC,
            "Đáp án 4": i.answerD,
            "Đáp án đúng": i.corectAns,

        }
    })
    //#endregion

    //#region Upload excel
    const [file, setFile] = useState([]);
    const [dataExcel, setDataExcel] = useState([]);
    const [hinddenInput, setHinddenInput] = useState("");
    const [showBnt, setShowBnt] = useState(false);
    const [dataOK, setDataOK] = useState([]);
    const [hinndenTable, setHinndenTable] = useState(true)
    const [disableBtn, setDisableBtn] = useState(false)

    //handle change choose file
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) setFile(files[0]);
        setHinddenInput("display-none")
        setShowBnt(true)
    };

    //Delete file
    const handleDelete = () => {
        setHinddenInput("")
        setShowBnt(false)
        setFile("")
        setHinndenTable(true)
    }

    //Handle File
    const handleFile = () => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const datae = XLSX.utils.sheet_to_json(ws);
            const x = datae.length > 0 && datae.map(i => {
                return {
                    content: i["Câu hỏi"],
                    answerA: i["Đáp án 1"],
                    answerB: i["Đáp án 2"],
                    answerC: i["Đáp án 3"],
                    answerD: i["Đáp án 4"],
                    corectAns: i["Đáp án đúng"]
                }
            })

            setDataExcel(x);
            if(x[0]?.content){
                CheckData(x) 
            }
            else{
            Alerterror("Dữ liệu không hợp lệ, vui lòng xem file mẫu")

            }
        };
        if (rABS) {
            reader.readAsBinaryString(file);
        } else {
            reader.readAsArrayBuffer(file);
        };
    }

    //Check data upload

    //check data valid
    const CheckData = (data) => {
        let arrNew = []
        data?.filter((element, index) => {
            if (element.content && element.answerA && element.answerB && element.answerC && element.answerD && element.corectAns) {
                arrNew.push(element)
            }
        })
        arrNew.length > 0 && setHinndenTable(false)
        setDataOK([...arrNew]);
    }

    const MEEC_Question_UploadExcel_Save = async () => {
        const pr = dataOK
        try {
            setDisableBtn(true)
            const response = await QuestionAPI.postMutil(pr);
            Alertsuccess("Upload excel thành công");
            handleDelete();
            MEEC_Question_List();
            setDisableBtn(false)
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
            setDisableBtn(false)
        }
    }
    //#endregion

    return (

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
                                            <span class="d-none d-sm-block">Thêm câu hỏi</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#profile" data-toggle="tab" aria-expanded="true" class="nav-link ">
                                            <span class="d-block d-sm-none"><i class="mdi mdi-account-outline font-18"></i></span>
                                            <span class="d-none d-sm-block">Danh sách câu hỏi</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#messages" data-toggle="tab" aria-expanded="false" class="nav-link">
                                            <span class="d-block d-sm-none"><i class="mdi mdi-email-outline font-18"></i></span>
                                            <span class="d-none d-sm-block">Upload câu hỏi bằng excel</span>
                                        </a>
                                    </li>
                                   
                                </ul>
                                <div class="tab-content pt-3">
                                    <div class="tab-pane show active" id="home">
                                        <div className="card">
                                            <div className="card-header p-2  bg-i ">
                                                <div class="d-flex align-items-center pt-1  " >
                                                    <h3 className="color-white card-title font-weight-bold align-middle mb-0"> THÊM CÂU HỎI MỚI</h3>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row ">
                                                    <div class="col-sm-12 col-md-12">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Câu hỏi<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground text-input"
                                                                    ref={ContentRef} value={Content} onChange={e => setContent(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-2">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Đáp án A<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground"
                                                                    ref={ARef} value={answerA} onChange={e => setA(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-2">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Đáp án B<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground"
                                                                    ref={BRef} value={answerB} onChange={e => setB(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-2">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Đáp án C<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground"
                                                                    ref={CRef} value={answerC} onChange={e => setC(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-2">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Đáp án D<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground"
                                                                    ref={DRef} value={answerD} onChange={e => setD(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Đáp án đúng<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground"
                                                                    ref={CorrectRef} value={Correct} onChange={e => setCorrect(e.target.value)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-center mt-4">
                                                        <button className="btn bg-c waves-effect width-md waves-light mr-3 "
                                                        onClick={SaveAndEdit}>
                                                            Lưu
                                                        </button>
                                                        <button className="btn bg-d waves-effect width-md "
                                                        onClick={MEEC_Question_Cancer}>
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
                                                        <h3 className="color-white card-title font-weight-bold align-middle mb-0"> QUẢN LÝ CÂU HỎI</h3>
                                                    </div>

                                                    <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                        <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                            <i class="fa fa-download pr-2"></i>
                                                        Xuất Excel
                                                    </button>
                                                        <button type="button" class="btn btn-sm btn-danger pull-right mr-2" onClick={MEEC_Question_List} >
                                                            <i class="fa fa-eye pr-2"></i>
                                                        Xem
                                                    </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="table-responsive font-16" style={{ color: '#555' }}>
                                                <DataTable
                                                    data={data}
                                                    columns={columns}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="messages">
                                        <div class="card " >
                                            <div class="card-header bg-i p-1">
                                                <div class="row">
                                                    <div class="col-12 col-md-6 d-flex align-items-center pl-3 ">
                                                        <h3 className="color-white card-title font-weight-bold mb-0"> UPLOAD EXCEL</h3>
                                                    </div>
                                                    <div class="col-12 col-md-6 pt-2">
                                                        <Link style={{ marginTop: '-8px', padding: '3px 10px' }}
                                                            className=" btn bg-p pull-right"
                                                            download
                                                            target="_blank"
                                                            to="/assets/Excel/Danh-sach-cau-hoi.xlsx"
                                                        >
                                                            <i className="nav-icon fa fa-download"></i> Tải file mẫu
                                                </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-body">
                                                <div class="col-sm-12 col-md-12">
                                                    <div>
                                                        <form className="form-horizontal mt-2">
                                                            <div className="row">
                                                                <div className="col-md-3"></div>
                                                                <div className={hinddenInput + " col-md-6 "}>
                                                                    <div className="uploadFileContainer text-center">
                                                                        <span>
                                                                            <i className="fa fa-cloud-upload-alt size40"> </i>
                                                                        </span>
                                                                        <span>Upload a File</span>
                                                                        <span className="font-normal">Choose a file</span>
                                                                        <input
                                                                            type="file"
                                                                            className="fileUploadHidden"
                                                                            onChange={handleChange}
                                                                            onClick={(e) => { e.target.value = null; }}/* */
                                                                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className={showBnt ? " col-md-6" : "display-none col-md-6"}>
                                                                    <div className="fileNameUpload">
                                                                        <span className="fileNameUpload">
                                                                            {file !== {} && file !== [] ? file.name : ""}
                                                                        </span>
                                                                        <i className="fa fa-trash pull-right pointer" title="Xóa file"
                                                                            onClick={handleDelete}
                                                                        ></i>
                                                                        <span className="pull-right pr-3">
                                                                            {"(" + (file.size / 1024).toFixed(2) + "KB)"}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-center mt-4">
                                                                        <button
                                                                            type="button"
                                                                            className="btn bg-i waves-effect width-md waves-light"
                                                                            onClick={handleFile}
                                                                        ><i className="fa fa-upload"></i> TẢI LÊN</button>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3"></div>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={hinndenTable ? "row display-none" : "row"}>
                                            <div className="col-12">
                                                <div className="card bx">
                                                    <div class="card-header back-ground p-2">
                                                        <div class=" d-flex align-items-center ">
                                                            <h3 className=" card-title font-weight-bold mb-0">Dữ liệu hợp lệ ({dataOK.length})</h3>
                                                        </div>
                                                    </div>
                                                    <div class="table-responsive" style={{maxHeight:'350px'}}>
                                                        <table class=" card-body table table-striped">
                                                            <thead>
                                                                <tr class="thead-custom">
                                                                    <th>STT</th>
                                                                    <th>Nội dung</th>
                                                                    <th>Đáp án 1</th>
                                                                    <th>Đáp án 2</th>
                                                                    <th>Đáp án 3</th>
                                                                    <th>Đáp án 4</th>
                                                                    <th>Đáp án đúng</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {dataOK.map((item, index) => {
                                                                    return (
                                                                        <tr key={index} class="thead-custom">
                                                                            <td>{index + 1}</td>
                                                                            <td>{item.content}</td>
                                                                            <td>{item.answerA}</td>
                                                                            <td>{item.answerB}</td>
                                                                            <td>{item.answerC}</td>
                                                                            <td>{item.answerD}</td>
                                                                            <td>{item.corectAns}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12 col-md-12">
                                                <button type="button" class="btn bg-danger waves-effect width-md waves-light pull-right" onClick={handleDelete}>
                                                    <i class="fa fa-trash pr-2"></i>
                                                Hủy
                                            </button>
                                                <button disabled={disableBtn ? true : false} type="button" class="btn bg-c waves-effect width-md waves-light pull-right mr-2" 
                                                onClick={MEEC_Question_UploadExcel_Save}>
                                                    <i class="fa fa-edit pr-2"></i>
                                                Lưu
                                            </button>
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