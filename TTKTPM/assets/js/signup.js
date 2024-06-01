const btn_signup = document.querySelector(".btn-signup");

btn_signup.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const data = {
        username: username,
        phoneNumber: "",
        email: email,
        password: password,
        address: "",
        age: "",
        avatar: "",
    };

    fetch("http://localhost:8081/auth/register-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.text())
        .then((text) => {
            if (text.includes("Registration successful")) {
                alert("Đăng ký thành công");
                window.location.href = "login.html";
            } else if (text.includes("already exists")) {
                alert("Đăng ký thất bại: Email hoặc tên đăng nhập đã tồn tại");
            } else {
                throw new Error("Đăng ký thất bại: " + text);
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});
