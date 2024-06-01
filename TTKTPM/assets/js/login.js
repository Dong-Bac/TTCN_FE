const form = document.querySelector(".loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btn = document.querySelector(".btn_login");

// Thêm sự kiện lắng nghe cho nút login
btn.addEventListener("click", async (event) => {
    // Lấy tên đăng nhập và mật khẩu đã nhập
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Thực hiện kiểm tra phía client
    if (email === "" || password === "") {
        alert("Vui lòng nhập tên đăng nhập và mật khẩu!");
        return;
    }

    // Tạo đối tượng chứa dữ liệu gửi đi
    const formData = {
        email: email,
        password: password,
    };

    try {
        // Gửi yêu cầu POST đến server
        const response = await fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Kiểm tra kết quả phản hồi từ server
        if (response.ok) {
            const result = await response.json();
            if (result.token) {
                alert("Đăng nhập thành công!");
                // Lưu thông tin vào localStorage
                localStorage.setItem("email", result.email);
                localStorage.setItem("userRole", result.roles);
                localStorage.setItem("token", result.token);
                if (result.roles.includes("ROLE_ADMIN")) {
                    window.location.href = "Trangchu.html";
                } else {
                    window.location.href = "QuanLyMK.html";
                }
            } else {
                alert(
                    "Dữ liệu phản hồi từ server không hợp lệ. Vui lòng thử lại."
                );
            }
        } else {
            alert("Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng thử lại.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Đăng nhập không thành công");
    }
});
