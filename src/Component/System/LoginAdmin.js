
import React, { useState, useEffect, useRef, useContext } from "react";
import logo from '../../logo2.png';
import { Link } from 'react-router-dom';
import { Alerterror, Alertsuccess, Alertwarning } from "../../Commom";
import { SystemAPI } from "../../Service";
import { useHistory } from "react-router-dom";
 import { store } from "../../Store/store";


export const LoginAdmin = () => {
    useEffect(() => {
        const TeacherInfor = JSON.parse(localStorage.getItem("TeacherInfor"));
        (TeacherInfor) && history.push("/welcome");
    }, [])

    useEffect(() => {
        const eventEnter = (e) => {
            if(e.key === "Enter" || e.key === "NumpadEnter"){
                document.querySelector("#click").click();
                e.preventDefault();
            }
        }
        document.addEventListener("keydown",eventEnter)
        return () => {
            document.removeEventListener("keydown",eventEnter)
        }
            
    }, [])
  
    const globalState = useContext(store);
    const { dispatch } = globalState;

  
    let history = useHistory();
    const [userName, setUserName] = useState("")
    const userNameRef = useRef();
    const [passWord, setpassWord] = useState("")
    const passWordRef = useRef();

    const handleLogin = async () => {
        if(userName === ""){
            Alertwarning("Nhập email")
            return;
        }
        if(passWord === ""){
            Alertwarning("Nhập mật khẩu")
            return;
        }
        const obj = {
            email: userName,
            passWord: passWord
        }
        try {
            //const params = { _page: 1, _limit: 10 };
            const response = await SystemAPI.login(obj);
            if(response === 'Email or password incorrect!'){
                Alerterror("Tên đăng nhập hoặc mật khẩu không đúng");
                return;
            }
            if(response.roleId === 2 || response.roleId === 1){
                Alerterror("Bạn không có quyền sử dụng chức năng này");
                return;
            }
            else{
                Alertsuccess("Đăng nhập thành công");
                localStorage.setItem("TeacherInfor", JSON.stringify(response));
                // const userInfor = JSON.parse(localStorage.getItem("UserInfor"));
                // dispatch({ type: 'SET_USERINFO',  userInfor });
                history.push("/welcome");
            }
            
        } catch (error) {
            Alerterror("Lỗi")
            console.log('Failed to fetch: ', error);

        }
    }

    return (
        <div class="container-fluid ">
            <div className="login-admin">
                <div className="row ">
                    <div className="col-md-8 col-12 pull-right ">
                    </div>
                    <div className="col-md-4 col-12 login-form pr-5 pl-5" >
                        <div className="main-login " >
                            <div className="pt-5 pb-5 text-center">
                                <Link to="/">
                                    <img class="logo" style={{ marginLeft: '-30px' }} src={logo} alt="" />
                                </Link>
                            </div>
                            <div className="pb-3">
                                <h2 style={{ fontWeight: '900' }}>Đăng nhập vào MEEC</h2>
                                <p >Hệ thống dành cho giáo viên tại Master Easy English Center</p>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend ">
                                        <span class="input-group-text"><i class="far fa-envelope"></i></span>
                                    </div>
                                    <input type="text" class="form-control form-custom" placeholder="Email" autoComplete="true"
                                    value={userName} ref={userNameRef} onChange={e => setUserName(e.target.value)} />
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    </div>
                                    <input type="password" class="form-control form-custom" placeholder="Mật khẩu"
                                    value={passWord} ref={passWordRef} onChange={e => setpassWord(e.target.value)} />
                                </div>
                            </div>
                           
                            <div>
                                <button  onClick={handleLogin} id="click" class="btn btn-info w-100 mb-3 font-1rem pt-2 pb-2">Đăng nhập vào MEEC</button>
                            </div>
                            <div className="font-1rem mt-3" >
                                Bạn là học viên của MEEC?
                                <a href="https://meec.vercel.app/login"  className="text-info font-weight-bold pointer" > Đăng nhập</a>
                            </div>
                            <div className="font-1rem mt-2" >
                                Bạn là giáo vụ của MEEC?
                                <a href="https://meec-admin.vercel.app"  className="text-info font-weight-bold pointer" > Đăng nhập</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}