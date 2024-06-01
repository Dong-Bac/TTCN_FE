const email = localStorage.getItem("email");
var getAvatar = document.querySelectorAll(".avatar");
var getMenuAccount = document.querySelector(".listMenuAcc");
getAvatar[0].onclick = function (e) {
    e.stopPropagation();
    getMenuAccount.classList.toggle("showMenuAccount");
};
if (role == "ROLE_ADMIN") {
    var getQuanLy = document.querySelector(".quanLy");
    var getMenuQuanLy = document.querySelector(".listSubNav");
    getQuanLy.onclick = function (e) {
        e.stopPropagation();
        getMenuQuanLy.classList.toggle("showMenuQuanLy");
    };
}
const logout = document.querySelector(".logout");
logout.addEventListener("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
});
