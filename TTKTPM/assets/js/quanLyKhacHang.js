// Function to search for customers by email
function searchCustomerByEmail(email) {
    fetch(`http://localhost:8081/api/users/${email}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing table rows
            const tbody = document.querySelector("#customerTable tbody");
            tbody.innerHTML = "";

            // Add the found customer to the table
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.phone}</td>
                <td>${data.address}</td>
                <td>${data.age}</td>
                <td><button onclick="showModalAndDelete('${data.email}')">Xóa</button></td>
            `;
            tbody.appendChild(row);

            // Show the back button
            const backButton = document.querySelector("#back-btn");
            backButton.style.display = "inline";
            // Assign handleSearch function to the back button click event
            backButton.addEventListener("click", hideBackButton);
        })
        .catch(error => {
            console.error("There was a problem fetching the customer:", error);
        });
}

// Function to hide the back button and show the search button
function hideBackButton() {
    const backButton = document.querySelector("#back-btn");
    backButton.style.display = "none";

    const searchButton = document.querySelector("#customer-search-btn");
    searchButton.style.display = "inline";

    // Clear the search input
    const searchInput = document.querySelector("#customer-search-input");
    searchInput.value = "";
}

// Function to handle the search button click event
function handleSearch() {
    const searchInput = document.querySelector("#customer-search-input");
    const email = searchInput.value.trim();
    if (email === "") {
        alert("Vui lòng nhập địa chỉ email để tìm kiếm.");
        return;
    }

    // Call the function to search for customer by email
    searchCustomerByEmail(email);
}

// Function to load customers from the API and display them in the table
function loadCustomers() {
    fetch("http://localhost:8081/api/users/customer")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Clear existing table rows
            const tbody = document.querySelector("#customerTable tbody");
            tbody.innerHTML = "";

            // Iterate over the received data and add rows to the table
            data.forEach(customer => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>${customer.age}</td>
                    <td><button onclick="showModalAndDelete('${customer.email}')">Xóa</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("There was a problem fetching the customers:", error);
        });
}

function confirmDeleteCustomer(email) {
        fetch(`http://localhost:8081/api/users/delete/${email}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                
                console.log(`Customer with email ${email} has been deleted successfully.`);
                // Reload customers after deletion
                loadCustomers();
                alert("xóa khách hàng thành công")
            })
            .catch(error => {
                console.error("There was a problem deleting the customer:", error);
            });
    
}

// Function to show modal and delete customer
function showModalAndDelete(email) {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Event listener for confirm delete button
    document.getElementById("confirm-delete-btn").addEventListener("click", function() {
        confirmDeleteCustomer(email);
        modal.style.display = "none"; // Hide modal after confirming deletion
    });

    // Event listener for cancel delete button
    document.getElementById("cancel-delete-btn").addEventListener("click", function() {
        modal.style.display = "none"; // Hide modal on cancel
    });
}

// Function to add a new customer
function addCustomer() {
    // Add your logic here to prompt user for customer details and send a POST request to the API
    console.log("Adding a new customer...");
}

// Load customers when the page loads
window.onload = function () {
    loadCustomers();    

    // Add event listener for the search button
    const searchButton = document.querySelector("#customer-search-btn");
    searchButton.addEventListener("click", handleSearch);
};
