var modal = document.getElementById("confirmationModal");
var span = document.getElementsByClassName("close")[0];
var confirmButton = document.getElementById("confirmCancel");
var cancelButton = document.getElementById("cancel");
var roomIdToDelete = null;
var x_modal = document.querySelector(".close");

var api = "http://localhost:8081/api/bookings/user/" + email + "/bookings";
var api2 = "http://localhost:8081/api/bookings/booking/";
function renderPhongDD(data) {
    var listPDD = document.querySelector(".listPDD");
    var content = "";
    var sumT = 0;
    data.forEach(function (item) {
        var ngayBD = new Date(item.checkindate);
        var ngayKT = new Date(item.checkoutdate);
        var chenhLech = ngayKT - ngayBD;
        var chechLechNgay = Math.floor(chenhLech / (1000 * 60 * 60 * 24));
        sumT += item.room.price * chechLechNgay;
        content += `
        <div class="phongDD">
                <img
                    class="hinhAnhP phongDD${item.id}"
                    src="./assets/img/hinhAnh.png"
                    alt="phong"
                />
                <div class="TTPhong">
                    <p class="soP">Mã phòng: ${item.room.roomnumber}</p>
                    <p class="tenP">Tên phòng: ${item.room.roomname}</p>
                    <p class="trangThai">
                        Từ <span class="ngayBD">${item.checkindate}</span> đến
                        <span class="ngayTra">${item.checkoutdate}</span>
                    </p>
                    <p class="giaT">Giá thuê/ngày: ${item.room.price}</p>
                </div>
                <div class="btn">
                    <input
                        class="btn_xemCT xemCTP${item.room.id}"
                        onclick="xemChiTiet(${item.room.id})"
                        type="button"
                        value="Xem Chi Tiết"
                    />
                    <input class="btn_huy huyP${item.id}" onclick="huyPhong(${item.id})" type="button" value="Hủy" />
                </div>
            </div>
        `;
    });
    content += `<p class="tongT">Tổng Tiền: ${sumT} VND</p>`;
    listPDD.innerHTML = content;
}
function getPhongDD(callback) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function huyPhong(id) {
    roomIdToDelete = id;
    modal.style.display = "block";
}

function xemChiTiet(id) {
    window.location.href = "xemChiTietPhongByID.html?id=" + id;
}

// When the user clicks on <span> (x), close the modal
x_modal.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks on cancel button, close the modal
cancelButton.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks on confirm button, proceed with deletion
confirmButton.onclick = function () {
    fetch(api2 + roomIdToDelete + "/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function () {
        var getDeleteP = document.querySelector(".huyP" + roomIdToDelete);
        var parentElement = getDeleteP.parentElement;
        var grandParentElement = parentElement.parentElement;
        grandParentElement.remove();
        modal.style.display = "none";
    });
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function start() {
    getPhongDD(renderPhongDD);
}

start();
