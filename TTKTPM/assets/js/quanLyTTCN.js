let api = "http://localhost:8081/api/users/";
var api2 = "http://localhost:8081/api/users/update/";
let nameKH = document.querySelector("#name");
let emailDom = document.querySelector("#email");
let SDT = document.querySelector("#SDT");
let btn_CapNhat = document.querySelector(".btn_CapNhat");
function renderTTCN(data) {
    nameKH.value = data.username;
    emailDom.value = data.email;
    SDT.value = data.phoneNumber;
}

function getTTCN(callback) {
    fetch(api + email)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function updateUser() {
    let dataUpdate = {
        username: nameKH.value,
        phoneNumber: SDT.value,
        email: emailDom.value,
    };
    fetch(api + emailDom.value, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdate),
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Có lỗi khi cập nhật thông tin người dùng.");
            }
            return response.json();
        })
        .then(function (data) {
            localStorage.setItem("email", data.email);
            renderTTCN(data);
        })
        .catch(function (error) {
            console.error("Lỗi:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
        });
}

btn_CapNhat.onclick = updateUser;

function start() {
    getTTCN(renderTTCN);
}

start();
