
import React, { useState, useEffect, useRef, useContext } from "react";
import logo from '../../logo2.png';
import { Link } from 'react-router-dom';
import { Alerterror, Alertsuccess, Alertwarning } from "../../Commom";
import { SystemAPI } from "../../Service";
import { useHistory } from "react-router-dom";
// import { store } from "../../Store/store";


export const Page404 = () => {
  



    return (
        <div class="container-fluid ">
            <div className="page404 d-flex">
                <div className="element-center card p-4 bx w-50 m-auto" style={{ backgroundColor: '#c4e8d9', opacity: 0.7 }}>
                    <div className="text-center color-text">
                        <h1 className="f-900 cl-p ">404</h1>
                        <h1 className="f-900  ">Lost in space ?</h1>
                        <p className="font-18">Bạn đang truy cập một trang không tồn tại hoặc đã bị xoá/thay thế trong hệ thống.
                             Đừng lo, hãy quay về trang chủ.</p>
                             <Link to="/" className="btn bg-c btn-lg">Trang chủ</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}