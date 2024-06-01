document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const BookingId = urlParams.get("id");
    const apiURL = `http://localhost:8081/api/bookings/${BookingId}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Điền thông tin vào form
            document.getElementById('checkRoom').value = data.room.roomname;
            document.getElementById('roomTypeIP').value = data.room.roomtype;
            document.getElementById('checkUserName').value = data.username;
            document.getElementById('checkInDateIP').value = data.checkindate;
            document.getElementById('checkOutDateIP').value = data.checkoutdate;
            document.getElementById('checkEmail').value = data.email;
        })
        .catch(error => {
            console.error('Error fetching booking data:', error);
        });

    // Xử lý sự kiện cập nhật
    document.querySelector('.btn_timKiem[type="button"]').addEventListener('click', () => {
        const updatedData = {
            roomname: document.getElementById('checkRoom').value,
            roomtype: document.getElementById('roomTypeIP').value,
            user: document.getElementById('checkUserName').value,
            checkindate: document.getElementById('checkInDateIP').value,
            checkoutdate: document.getElementById('checkOutDateIP').value
        };

        fetch(apiURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                // Xử lý sau khi cập nhật thành công (có thể hiện thông báo, chuyển trang, ...)
            })
            .catch(error => {
                console.error('Error updating booking data:', error);
            });
    });

    // Xử lý sự kiện quay lại
    document.querySelectorAll('.btn_timKiem[type="button"]')[1].addEventListener('click', () => {
        window.history.back();
    });
});
