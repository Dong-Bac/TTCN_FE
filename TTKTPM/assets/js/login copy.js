const form = document.querySelector("#loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.querySelector(".btn-login");

var xuLy = function() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const formData = {
        email: email,
        password: password,
    };

    // Gửi yêu cầu POST đến server
    fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        // Kiểm tra kết quả phản hồi từ server
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng thử lại.");
        }
    })
    .then(result => {
        if (result.token) {
            localStorage.setItem("email", result.email);
            localStorage.setItem("userRole", result.roles);
            localStorage.setItem("token", result.token);
            if (result.roles.includes("ROLE_ADMIN")) {
                window.location.href = "Trangchu.html";
            } else {
                window.location.href = "DanhSachPhong.html";
            }
        } else {
            throw new Error("Dữ liệu phản hồi từ server không hợp lệ. Vui lòng thử lại.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    });
}
