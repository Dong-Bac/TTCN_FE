let api = "http://localhost:8081/api/rooms/all-rooms";
function renderP(data) {
    let listDouble = document.querySelector(".listDouble");
    let listSimple = document.querySelector(".listSimple");
    let htmlListDouble = "";
    let htmlListSimple = "";
    data.forEach(function (item) {
        if (item.roomtype == "simpleRoom") {
            htmlListSimple += `
            <div class="phong phong${item.id}">
                <img
                    class="hinhAnhP"
                    src="data:image/png;base64, ${item.image}" style="width: 300px;"
                />
                <div class="TTPhong">
                    <p class="soPhong">Số phòng: ${item.roomnumber}</p>
                    <p class="tenPhong">Tên phòng: ${item.roomname}</p>
                    <p class="giaT">Giá thuê/ngày: ${item.price}</p>
                    <input
                        class="btn_xemCT xemCTP${item.id}"
                        onClick="xemChiTiet(${item.id})"
                        type="button"
                        value="Xem Chi Tiết"
                    />
                </div>
            </div>
            `;
        } else {
            htmlListDouble += `
            <div class="phong phong${item.id}">
                <img
                    class="hinhAnhP"
                    src="data:image/png;base64, ${item.image}" style="width: 300px;"
                    alt="phong ${item.id}"
                />
                <div class="TTPhong">
                    <p class="soPhong">Số phòng: ${item.roomnumber}</p>
                    <p class="tenPhong">Tên phòng: ${item.roomname}</p>
                    <p class="giaT">Giá thuê/ngày: ${item.price}</p>
                    <input
                        class="btn_xemCT xemCTP${item.id}"
                        onClick="xemChiTiet(${item.id})"
                        type="button"
                        value="Xem Chi Tiết"
                    />
                </div>
            </div>
            `;
        }
    });
    listDouble.innerHTML = htmlListDouble;
    listSimple.innerHTML = htmlListSimple;
}
function getP(callback) {
    fetch(api)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function xemChiTiet(id) {
    window.location.href = "xemChiTietPhongByID.html?id=" + id;
}

function start() {
    getP(renderP);
}

start();
