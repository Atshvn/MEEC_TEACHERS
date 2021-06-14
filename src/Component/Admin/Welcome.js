import { TopMenuAdmin } from "../Template"


export const WelCome = () => {

    return (
        <>
            <div className="unsticky-layout">
                <TopMenuAdmin />
                <div class="content-page" style={{ marginTop: '0px', padding: '0px' }}>
                    <div class="content " style={{ marginTop: '80px' }}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 className="f-900">Chào mừng bạn đến với hệ thống giáo viên quản lý của MEEC</h1>
                                <p>Vui lòng lựa chọn các chức năng trong menu để thực hiện yêu cầu</p>
                                <img className="avatar m-auto" class="rounded-circle" src="assets\images\avatar.jpg" alt="" width="400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}