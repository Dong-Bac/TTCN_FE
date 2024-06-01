const roomTypeIP = document.querySelector("#roomTypeIP");
const checkInDateIP = document.querySelector("#checkInDateIP");
const checkOutDateIP = document.querySelector("#checkOutDateIP");
const btn_timKiem = document.querySelector(".btn_timKiem");
fetch("http://localhost:8081/api/rooms/all-rooms")
    .then((response) => response.json())
    .then((data) => {
       
        const listRoom = document.querySelector(".listRoom");
        let i = 0;
        // Display the rooms
        data.some((room) => {
            if (i == 4) {
                return true;
            }
            let roomElement = document.createElement("div");
            roomElement.classList.add("room");
            roomElement.classList.add(room.id);
            roomElement.innerHTML = `
                <img src="data:image/png;base64, ${room.image}" alt="" style="width: 300px;">
                <div class="room-info">
                    <p>Số phòng: ${room.roomnumber}</p>
                    <p>Phòng ${room.roomname}</p>
                    <p>Loại phòng: ${room.roomtype}</p>
                    <p>Giá: ${room.price} VND / ngày</p>
                </div>
            `;
            roomElement.addEventListener("click", function () {
                window.location.href = "xemChiTietPhongByID.html?id=" + room.id;
            });
            listRoom.appendChild(roomElement);
            i++;
        });
    })
    .catch((error) => {
        console.error("Error fetching rooms:", error);
    });

btn_timKiem.onclick = function () {
    let roomTypeValue = roomTypeIP.value;
    let checkInDateValue = checkInDateIP.value;
    let checkOutDateValue = checkOutDateIP.value;
    let params = new URLSearchParams({
        roomType: roomTypeValue,
        checkInDate: checkInDateValue,
        checkOutDate: checkOutDateValue,
    });

    fetch(
        `http://localhost:8081/api/rooms/available-rooms?${params.toString()}`,
        {
            method: "GET",
        }
    )
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Lỗi tìm kiếm");
            }
            return response.json();
        })
        .then(function (data) {
            let listResult = document.querySelector(".listResult");
            listResult.innerHTML = ""; // Xóa kết quả cũ

            data.forEach((room) => {
                let roomElement = document.createElement("div");
                roomElement.classList.add("room");
                roomElement.classList.add(room.id);
                roomElement.innerHTML = `
                <img src="data:image/png;base64, ${room.image}" alt="" style="width: 300px;">
                <div class="room-info">
                    <div class="room-info">
                        <p>Số phòng: ${room.roomnumber}</p>
                        <p>Phòng ${room.roomname}</p>
                        <p>Loại phòng: ${room.roomtype}</p>
                        <p>Giá: ${room.price} VND / ngày</p>
                    </div>
                `;
                roomElement.addEventListener("click", function () {
                    window.location.href =
                        "xemChiTietPhongByID.html?id=" + room.id;
                });

                listResult.appendChild(roomElement);
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};
