import { useState, useEffect, useRef } from "react";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";
import { Alerterror, Alertsuccess, Alertwarning, DataTable, ExportExcel, FormatDate, FormatDateJson, SelectCourse } from "../../Commom"
import { SystemAPI } from "../../Service";
import Select from "react-select";

export const ContentAccount = () => {

    const [DataAll, setDataAll] = useState([])
    const [CourseId, setCourseId] = useState({ value: 0, label: "Vui lòng chọn" })
    const [DataGender, setDataGender] = useState([])
    const [SelectCourseId, setSelectCourseId] = useState(0);
    const [BirthDay, setBirthDay] = useState(new Date());
    const [Gender, setGender] = useState({ value: 0, label: "Vui lòng chọn" })
    const [DataRole, setDataRole] = useState([]);
    const [Role, setRole] = useState({ value: 0, label: "Vui lòng chọn" })
    const [RoleSearch, setRoleSearch] = useState({ value: 0, label: "Vui lòng chọn" })
    const [hinden, setHinden] = useState(true);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("")
    const [PassWord, setPassWord] = useState("")
    const [Phone, setPhone] = useState('')
    const [Address, setAddress] = useState('');
    const NameRef = useRef()
    const EmailRef = useRef()
    const PassWordRef = useRef();
    const PhoneRef = useRef();
    const AddressRef = useRef();

    const [dataAdmin, setDataAdmin] = useState([])
    const [dataGV, setDataGV] = useState([])
    const [hinddenCoures, setHinddenCoures] = useState(true)
    const [dataTable, setDataTable] = useState([])
    useEffect(() => {
        MEEC_Gender_Local()
        MEEC_Level_Local()
    }, [])

    useEffect(() => {
        if (Role.value === 0 || Role.value === 1) {
            setHinden(true)
        }
        else {
            setHinden(false)
        }
     
    }, [Role])

    useEffect(() => {
        if (RoleSearch.value === 0 || RoleSearch.value === 1 || RoleSearch.value === 3) {
            setHinddenCoures(true)
        }
        else {
            setHinddenCoures(false)
        }

    }, [RoleSearch])



    const MEEC_Gender_Local = () => {
        const list = [
            { value: 0, label: "Vui lòng chọn" },
            { value: 1, label: "Nam" },
            { value: 2, label: "Nữ" },
            { value: 3, label: "Khác" }
        ]
        setDataGender(list)
    }
    const MEEC_Level_Local = () => {
        const list = [
            { value: 0, label: "Vui lòng chọn" },
            { value: 1, label: "Giáo vụ" },
            { value: 2, label: "Học viên" },
            { value: 3, label: "Giảng viên" }
        ]
        setDataRole(list)
    }

    const MEEC_Account_List = async () => {
        
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await SystemAPI.getAll();
            const x = response.map(i => {
                let role = ''
                if (i.roleId === 1) {
                    role = "Giáo vụ"
                }
                if (i.roleId === 2) {
                    role = "Học viên"
                }
                if (i.roleId === 3) {
                    role = "Giảng viên"
                }
                const phone = i.phoneNumber == 0 ? i.phoneNumber : `0${i.phoneNumber}`
                return { ...i, dateOfBirth: FormatDate(i.dateOfBirth), phoneNumber: phone, roleName: role }
            })
            const student = x.filter(i => i.roleId === 2);
            const admin = x.filter(i => i.roleId === 1);
            const teacher = x.filter(i => i.roleId === 3);
            if ( RoleSearch.value === 1) {
                setDataAll(admin)
            }
            if ( RoleSearch.value === 2) {
                setDataAll(student)
            }
            if ( RoleSearch.value === 3) {
                setDataAll(teacher)
            }
            setDataAdmin(admin);
            setDataGV(teacher)
        } catch (error) {

            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const MEEC_Account_List_ByCourse = async (id) => {

        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await SystemAPI.accByCourse(id);
            const x = response.map(i => {
                let role = ''
                if (i.roleId === 1) {
                    role = "Giáo vụ"
                }
                if (i.roleId === 2) {
                    role = "Học viên"
                }
                if (i.roleId === 3) {
                    role = "Giảng viên"
                }
                const phone = i.phoneNumber == 0 ? i.phoneNumber : `0${i.phoneNumber}`
                return { ...i, dateOfBirth: FormatDate(i.dateOfBirth), phoneNumber: phone, roleName: role }
            })
            const student = x.filter(i => i.roleId === 2);
            setDataAll(student)
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);
        }
    }

    const handleGet = () => {
        RoleSearch.value === 0 && Alertwarning("Vui lòng chọn loại tài khoản")
        CourseId.value === 0 ? MEEC_Account_List() : MEEC_Account_List_ByCourse(CourseId.value);
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
            Header: "Trình trạng",
            accessor: '[row identifier to be passed to button]',
            fixed: 'left',
            minWidth: 110,
            Cell: ({ row }) => {
                return (
                    row._original.state ? "Đã kích hoạt" : (<span><button
                        className="btn btn-sm btn-info font-16 pr-3 pl-3" style={{ marginRight: '5px' }} onClick={e =>activeAcc({row})} > Kích hoạt
                    </button>
                    </span>))
            }
        }
        ,
        {
            Header: "Tên",
            accessor: "fullName",
            width: 200
        },
        {
            Header: "Email",
            accessor: "email",
            width: 200
        },
        {
            Header: "Số điện thoại",
            accessor: "phoneNumber",
        },
        {
            Header: "Địa chỉ",
            accessor: "address",

        },
        {
            Header: "Giới tính",
            accessor: "gender",

        }
        ,
        {
            Header: "ngày sinh",
            accessor: "dateOfBirth",

        }
        ,
        {
            Header: "Vai trò",
            accessor: "roleName",

        }
    ];

    const activeAcc = async (item) => {
        const data = item.row._original;
        console.log(data.accountId);
        try {
            const response = await SystemAPI.activeAcc(data.accountId);
            MEEC_Account_List();
            Alertsuccess("Đã kích hoạt thành công")
            
        } catch (error) {
            Alerterror("Đã xảy ra lỗi, vui lòng thử lại sau")
        }
    }

    const clickexcel = () => {
        ExportExcel(newData, "Danh-sach-hoc-vien");
    }

    const newData = DataAll.map(i => {
        return {
            "Tên": i.fullName,
            "Khóa học": CourseId.label,
            "Email": i.email,
            "Số điện thoại": i.phoneNumber,
            "Địa chỉ": i.address,
            "Đáp án đúng": i.corectAns,
            "Giới tính": i.gender,
            "Ngày sinh": i.dateOfBirth,

        }
    })

    const MEEC_Account_Save = async () => {

        const Regex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm

        if (Name === '') {
            Alertwarning("Vui lòng nhập họ tên")
            NameRef.current.focus()
            return;
        }
        if (Email === '') {
            Alertwarning("Vui lòng nhập email")
            EmailRef.current.focus()
            return;
        }
        if (!Regex.test(Email)) {
            Alertwarning("Vui lòng nhập đúng định dạng email")
            EmailRef.current.focus()
            return;
        }
        if (Phone === '') {
            Alertwarning("Vui lòng nhập số điện thoại")
            PhoneRef.current.focus()
            return;
        }
        if (PassWord === '') {
            Alertwarning("Vui lòng nhập mật khẩu")
            PassWordRef.current.focus()
            return;
        }
        if (Address === '') {
            Alertwarning("Vui lòng nhập địa chỉ")
            AddressRef.current.focus()
            return;
        }
        if (Gender.value === 0) {
            Alertwarning("Vui lòng chọn giới tính")
            return;
        }
        if (Role.value === 0) {
            Alertwarning("Vui lòng chọn loại tài khoản")
            return;
        }
        if (SelectCourseId === 0 && !hinden) {
            Alertwarning("Vui lòng chọn khóa học")
            return;
        }

        const pr = {
            email: Email,
            state: true,
            fullName: Name,
            dateOfBirth: FormatDateJson(BirthDay, 0),
            phoneNumber: +Phone,
            gender: Gender.label,
            address: Address,
            roleId: Role.value,
            courseId: Role.value === 1 ? 1 : SelectCourseId,
            passWord: PassWord
        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await SystemAPI.addAcc(pr);
            Alertsuccess("Tạo tài khoản thành công.")
            MEEC_Account_List();

        } catch (error) {

            Alerterror("Có lỗi xảy ra, vui lòng thử lại sau.")
            console.log('Failed to fetch: ', error);
        }
    }


    return (
        <div class="content-page" style={{ marginTop: '0px', padding: '0px' }}>
            <div class="content " style={{ marginTop: '80px' }}>
                <div class="container-fluid">
                    <div class="row" style={{ height: '100vh' }}>
                        <div class="col-12">
                            <div class="card-box pt-0 bx">
                                <ul class="nav nav-tabs tabs-bordered " >
                                    <li class="nav-item">
                                        <a href="#profile" data-toggle="tab" aria-expanded="false" class="nav-link active " >
                                            <span class="d-block d-sm-none"><i class="mdi mdi-home-variant-outline font-18"></i></span>
                                            <span class="d-none d-sm-block">Thêm mới tài khoản</span>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#home" data-toggle="tab" aria-expanded="false" class="nav-link " >
                                            <span class="d-block d-sm-none"><i class="mdi mdi-home-variant-outline font-18"></i></span>
                                            <span class="d-none d-sm-block">Kích hoạt tài khoản</span>
                                        </a>
                                    </li>

                                </ul>
                                <div class="tab-content pt-3">
                                    <div class="tab-pane show active" id="profile">
                                        <div className="card">
                                            <div className="card-header p-2  bg-i ">
                                                <div class="d-flex align-items-center pt-1  " >
                                                    <h3 className="color-white card-title font-weight-bold align-middle mb-0">THÊM MỚI TÀI KHOẢN</h3>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row ">
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Họ và tên <sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground" ref={NameRef}
                                                                    value={Name} onChange={e => setName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Email<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground" ref={EmailRef}
                                                                    value={Email} onChange={e => setEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Số điện thoại<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="number" class="form-control back-ground" ref={PhoneRef}
                                                                    value={Phone} onChange={e => setPhone(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Mật khẩu<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="password" class="form-control back-ground" ref={PassWordRef}
                                                                    value={PassWord} onChange={e => setPassWord(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Địa chỉ<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <input type="text" class="form-control back-ground" ref={AddressRef}
                                                                    value={Address} onChange={e => setAddress(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Giới tính<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <Select
                                                                    className="SelectMeno font-16"
                                                                    value={Gender}
                                                                    options={DataGender}
                                                                    onChange={item => setGender(item)} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Ngày sinh<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group SelectDatetime">
                                                                <DateTimePicker className="form-control"
                                                                    onChange={date => setBirthDay(date)}
                                                                    value={BirthDay}
                                                                    format='MM/dd/yyyy'
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-4">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Loại tài khoản<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <Select
                                                                    className="SelectMeno font-16"
                                                                    value={Role}
                                                                    options={DataRole}
                                                                    onChange={item => setRole(item)} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class={hinden ? "display-none" : "col-sm-12 col-md-4"}>
                                                        <div class="form-group">
                                                            <label class="label mb-0">Khóa học<sup className="cl-d">(*)</sup></label>
                                                            <div class="input-group">
                                                                <SelectCourse
                                                                    title={"Vui lòng chọn"}
                                                                    onSelected={e => setSelectCourseId(e.value)}
                                                                    items={SelectCourseId}
                                                                    font="font-16">
                                                                </SelectCourse>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 d-flex justify-content-center mt-4">
                                                        <button className="btn bg-c waves-effect width-md waves-light mr-3 "
                                                            onClick={MEEC_Account_Save}
                                                        >
                                                            Lưu
                                                        </button>
                                                        <button className="btn bg-d waves-effect width-md "
                                                        >
                                                            Hủy
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane" id="home">
                                        <div className="card">
                                            <div className="card-header p-0 pl-2  bg-i ">
                                                <div class="row">
                                                    <div class="col-sm-12 col-md-6 d-flex align-items-center" >
                                                        <div class="d-flex align-items-center pt-1  " >
                                                            <h3 className="color-white card-title font-weight-bold align-middle mb-0">DANH SÁCH TÀI KHOẢN</h3>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12 col-md-6 margin-top-5s pt-1 pb-1">
                                                        <button type="button" class="btn btn-sm bg-c pull-right margin-left-5 mr-4" onClick={clickexcel}>
                                                            <i class="fa fa-download pr-2"></i>
                                                            Xuất Excel
                                                        </button>
                                                        <button type="button" class="btn btn-sm btn-danger pull-right mr-2"
                                                            onClick={handleGet} >
                                                            <i class="fa fa-eye pr-2"></i>
                                                            Xem
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body ">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div class="form-group">
                                                            <label class="label mb-0">Loại tài khoản</label>
                                                            <div class="input-group">
                                                            <Select
                                                                    className="SelectMeno font-16"
                                                                    value={RoleSearch}
                                                                    options={DataRole}
                                                                    onChange={item => setRoleSearch(item)} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={hinddenCoures ? "display-none": "col-md-6"}>
                                                        <div class="form-group">
                                                            <label class="label mb-0">Khóa học</label>
                                                            <div class="input-group">
                                                                <SelectCourse
                                                                    onSelected={e => setCourseId(e)}
                                                                    items={CourseId.value}
                                                                    font="font-16"
                                                                    title="Chọn tất cả">
                                                                </SelectCourse>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="table-responsive font-16" style={{ color: '#555', zIndex: '0' }}>
                                            <DataTable
                                                        data={DataAll}
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

    )
}