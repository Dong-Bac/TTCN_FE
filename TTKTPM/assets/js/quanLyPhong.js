const quanLyTableBody = document.querySelector("#quanLyTableBody");
const api = "http://localhost:8081/api/rooms/all-rooms";
var modal = document.getElementById("confirmationModal");
var span = document.getElementsByClassName("close")[0];
var confirmButton = document.getElementById("confirmCancel");
var cancelButton = document.getElementById("cancel");
var roomIdToDelete = null;
var x_modal = document.querySelector(".close");
function getPhong(callback) {
    fetch(api)
        .then((response) => response.json())
        .then(callback);
}
function renderPhong(data) {
    var content = "";
    data.forEach(function (item) {
        content += `
        <tr id="phong${item.id}">
            <td>${item.id}</td>
            <td>${item.roomnumber}</td>
            <td>${item.roomname}</td>
            <td>${item.roomtype}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td>${item.isBooked ? "Đã được thuê" : "Trống"}</td>
            <td>
            <img src="data:image/png;base64, ${item.image}" alt="Ảnh phòng" height="50px"></td>
            <td>
                <button class="btn btnSua" onclick="window.location.href='suaQuanLyPhong.html?id=${item.id}'">Sửa</button>
                <button class="btn btnXoa" onclick="deletePhong(${
                    item.id
                })">Xóa</button>
            </td>
        </tr>
        `;
    });
    quanLyTableBody.innerHTML = content;
}

function start() {
    getPhong(renderPhong);
}

start();

function deletePhong(id) {
    roomIdToDelete = id;
    modal.style.display = "block";
}

x_modal.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks on cancel button, close the modal
cancelButton.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

confirmButton.onclick = function () {
    fetch(`http://localhost:8081/api/rooms/delete/room/${roomIdToDelete}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        let phongDelete = document.querySelector(`#phong${roomIdToDelete}`);
        phongDelete.remove();
        modal.style.display = "none";
    });
};
