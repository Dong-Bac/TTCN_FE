function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const RoomId = urlParams.get("id");
    const apiURL = `http://localhost:8081/api/rooms/room/${RoomId}`;
    const updateApiURL = `http://localhost:8081/api/rooms/update/${RoomId}`;

    fetch(apiURL, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Điền thông tin vào form
            document.getElementById('roomName').value = data.roomname;
            document.getElementById('roomTypeIP').value = data.roomtype;
            document.getElementById('checkMoney').value = data.price;
            document.getElementById('checkDesc').value = data.description;
            document.getElementById('imagePreview').src = `data:image/png;base64,${data.image}`;
            document.getElementById('imagePreview').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching room data:', error);
        });
});

function editRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const RoomId = urlParams.get("id");
    const updateApiURL = `http://localhost:8081/api/rooms/update/${RoomId}`;

    const formData = new FormData();
    formData.append('roomName', document.getElementById('roomName').value);
    formData.append('roomType', document.getElementById('roomTypeIP').value);
    formData.append('roomPrice', document.getElementById('checkMoney').value);
    formData.append('description', document.getElementById('checkDesc').value);

    const fileInput = document.getElementById('checkImageRoom');
    if (fileInput.files[0]) {
        formData.append('photo', fileInput.files[0]);
    }

    fetch(updateApiURL, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Update successful:', data);
        alert("Cập nhật thành công");
        window.location.href = 'quanLyPhongDaDat.html';
    })
    .catch(error => {
        console.error('Error updating room data:', error);
    });
}

document.querySelectorAll('.btn_timKiem[type="button"]')[1].addEventListener('click', () => {
    window.history.back();
});
