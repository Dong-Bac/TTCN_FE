var getAvatar = document.querySelector(".avatar");
var getMenuAccount = document.querySelector(".listSubNav");
getAvatar.onclick = function (e) {
    e.stopPropagation();
    getMenuAccount.classList.toggle("showMenuAccount");
};
document.onclick = function () {
    getMenuAccount.classList.remove("showMenuAccount");
};

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("id");
    const apiUrl = `http://localhost:8081/api/rooms/room/${roomId}`;

    // Function to fetch room data
    async function fetchRoomData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const roomData = await response.json();
            renderRoomDetails(roomData);
        } catch (error) {
            console.error("Error fetching room data:", error);
        }
    }

    // Function to render room details
    function renderRoomDetails(data) {
        const roomContainer = document.querySelector(".room");

        const roomCard = `
            <div class="room-card">
            <img src="data:image/png;base64, ${data.image}" alt="" style="width: 300px;">
            <div class="room-info">
                <div class="room-info">
                    <p>Số phòng: ${data.roomnumber}</p>
                    <p>Tên phòng: ${data.roomname || "N/A"}</p>
                    <p>Loại phòng: ${data.roomtype}</p>
                    <p>Giá tiền: ${data.price} VND/ ngày</p>
                    <p>Trạng thái: ${data.isBooked ? "Đã đặt" : "Còn trống"}</p>
                    <p>Mô tả: ${data.description || "Không có mô tả"}</p>
                </div>
                <div onclick="window.location.href = 'datphong.html?id=' + ${roomId}" class="book-now">Đặt Phòng</div>
            </div>
        `;

        roomContainer.innerHTML = roomCard;
    }

    // Fetch and render room data on page load
    fetchRoomData();
});