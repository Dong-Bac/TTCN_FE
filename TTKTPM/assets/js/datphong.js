document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("id");
    const apiURL = `http://localhost:8081/api/rooms/room/${roomId}`;

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('checkRoom').value = data.roomname || '';
            document.getElementById('roomTypeIP').value = data.roomtype || '';
            document.getElementById('checkMoney').value = data.price || '';
            document.getElementById('checkInDateIP').value = data.checkindate || '';
            document.getElementById('checkOutDateIP').value = data.checkoutdate || '';
            const email = localStorage.getItem("email") || '';
            document.getElementById('checkEmail').value = email;
        })
        .catch(error => {
            console.error('Error fetching room data:', error);
        });
});

function editRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get("id");
    const checkInDate = document.getElementById('checkInDateIP').value;
    const checkOutDate = document.getElementById('checkOutDateIP').value;
    const email = document.getElementById('checkEmail').value;

    // const updatedData = {
    //     checkindate: checkInDate,
    //     checkoutdate: checkOutDate,
    //     username: "", // Ensure you populate this field if required by the backend
    //     email: email,
    //     totalguest: 0 // Adjust according to your application logic
    // };

    const token = localStorage.getItem("token"); // Retrieve token from local storage (if stored there)

    const apiBookingURL = `http://localhost:8081/api/bookings/room/${roomId}/booking/${checkInDate}/${checkOutDate}/${email}/0`;

    fetch(apiBookingURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add authorization header
        },
    })
    .then(data => {
        alert("Cập nhật thành công")
        window.location.href = 'quanLyPhongDaDat.html'
        console.log('Update successful:', data);
        // Handle post-update actions (display message, redirect, etc.)
    })
    .catch(error => {
        console.error('Error updating booking data:', error);
        // Check if the error is due to authentication failure
        if (error.message.includes('401')) {
            console.error('Authentication failed. Please check your credentials.');
        }
    });
}
