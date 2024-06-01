const role = localStorage.getItem("userRole");
const header = document.querySelector(".header");
if (role == "ROLE_USER") {
    header.innerHTML = `<figure>
                            <img class="logo" src="./assets/img/logo.png" alt="Lotte" />
                        </figure>
                        <ul class="listNav">
                            <li class="nav"><a href="Trangchu.html">Trang chủ</a></li>
                            <li class="nav"><a href="about.html">Giới thiệu</a></li>
                            <li class="nav"><a href="DanhSachPhong.html">Phòng</a></li>
                            <li class="nav">
                                <a href="QuanLyPhongDaDat.html">Phòng đã đặt</a>
                            </li>
                        </ul>
                        <div class="account">
                            <img class="avatar" src="./assets/img/logo.png" alt="Avatar" />
                            <ul class="listMenuAcc">
                                <li class="subNav">
                                    <a href="QuanLyTTCN.html">Quản lý tài khoản</a>
                                </li>
                                <li class="subNav">
                                    <a class="logout" href="#!">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>`;
} else if (role == "ROLE_ADMIN") {
    header.innerHTML = `<figure>
                            <img class="logo" src="./assets/img/logo.png" alt="Lotte" />
                        </figure>
                        <ul class="listNav">
                            <li class="nav"><a href="Trangchu.html">Trang chủ</a></li>
                            <li class="nav"><a href="about.html">Giới thiệu</a></li>
                            <li class="nav"><a href="DanhSachPhong.html">Phòng</a></li>
                            <li class="nav quanLy">
                                <a href="#!">Quản lý</a>
                                <ul class="listSubNav">
                                    <li class="subNav">
                                        <a href="quanLyKhachHang.html"
                                            >Quản lý khách hàng</a
                                        >
                                    </li>
                                    <li class="subNav">
                                        <a href="quanLyPhong.html">Quản lý phòng</a>
                                    </li>
                                    <li class="subNav">
                                        <a href="quanLyDonDatPhong.html"
                                            >Quản lý đơn đặt phòng</a
                                        >
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div class="account">
                            <img class="avatar" src="./assets/img/logo.png" alt="Avatar" />
                            <ul class="listMenuAcc">
                                <li class="subNav">
                                    <a href="#!">Quản lý tài khoản</a>
                                </li>
                                <li class="subNav">
                                    <a class="logout" href="#!">Đăng xuất</a>
                                </li>
                            </ul>
                        </div>`;
}
