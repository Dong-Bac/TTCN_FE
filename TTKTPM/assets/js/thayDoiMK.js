const old_password = document.getElementById("old_password");
const password = document.getElementById("password");
const btn_CapNhat = document.querySelector(".btn_CapNhat");
let api = "http://localhost:8081/api/users/changePassword/";
btn_CapNhat.addEventListener("click", () => {
    const old_passwordValue = old_password.value.trim();
    const passwordValue = password.value.trim();
    const data = {
        email: email,
        oldPassword: old_passwordValue,
        newPassword: passwordValue,
    };

    fetch(api + email + "/" + old_passwordValue + "/" + passwordValue, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then(() => {
            alert("Đổi mật khẩu thành công!");
            window.location.href = "login.html";
        })
        .catch(() => {
            alert("Đổi mật khẩu bại!");
        });
});
