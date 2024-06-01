document.addEventListener("DOMContentLoaded", () => {
    const bookingList = document.getElementById("bookingList");
    const modal = document.getElementById("myModal");


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchBookings = () => {
        fetch("http://localhost:8081/api/bookings/all-bookings")
            .then(response => response.json())
            .then(data => {
                renderBookings(data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    };

    const renderBookings = (bookings) => {
        bookingList.innerHTML = "";
        bookings.forEach((booking) => {
            const row = document.createElement("tr");
            const checkinDate = formatDate(booking.checkindate);
            const checkoutDate = formatDate(booking.checkoutdate);
            row.innerHTML = `
                <td>${booking.room.roomname}</td>
                <td>${booking.room.roomtype}</td>
                <td>${booking.user}</td>
                <td>${checkinDate}</td>
                <td>${checkoutDate}</td>
                <td>${booking.email}</td>
                <td>${booking.room.price}</td>
                <td>
                    <button class="btn edit-btn">Sửa</button>
                    <button class="btn delete-btn">Xóa</button>
                </td>
            `;
            bookingList.appendChild(row);

            // Add event listener for edit button
            const editButton = row.querySelector(".edit-btn");
            editButton.addEventListener("click", () => {
                window.location.href = `suaQuanLyDonDatPhong.html?id=${booking.id}`;
            });
            const deleteButton = row.querySelector(".delete-btn");
            deleteButton.addEventListener("click", () => {
                showModalAndDelete(booking.id);
            });
        });
    };
    const confirmAndDeleteBooking = (id) => {
        fetch(`http://localhost:8081/api/bookings/booking/${id}/delete`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                console.log(`BookedRoom with id ${id} has been deleted successfully.`);
                fetchBookings();
                alert("Xóa đặt phòng thành công");
            })
            .catch(error => {
                console.error("There was a problem deleting the booking:", error);
            });
    };

    const showModalAndDelete = (id) => {
        modal.style.display = "block";

        const confirmButton = document.getElementById("confirm-delete-btn");
        confirmButton.addEventListener("click", () => {
            confirmAndDeleteBooking(id);
            modal.style.display = "none";
        });

        const cancelButton = document.getElementById("cancel-delete-btn");
        cancelButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    };

    // Fetch bookings when the page loads
    fetchBookings();
});
