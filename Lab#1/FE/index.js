function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = '';
      const list = data.data;

      // Store existing IDs for validation
      const existingIds = list.map(emp => emp.id);

      list.forEach(item => {
        const row = document.createElement('tr');

        // ID Cell
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        // Name Cell
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        // Delete Button
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', function () {
          deleteEmployee(item.id); // Pass employee ID to delete function
        });

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });

      // Store existing IDs globally for form validation
      window.existingEmployeeIds = existingIds;
    })
    .catch(error => console.error(error));
}

// Event listener for form submission
document.getElementById('employeeForm').addEventListener('submit', event => {
  event.preventDefault();
  createEmployee();
});

// Create Employee Function
function createEmployee() {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;

  // Frontend Validation: Prevent duplicate ID
  if (window.existingEmployeeIds.includes(id)) {
    alert('Error: Employee ID already exists. Please enter a unique ID.');
    return;
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, name }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message); // Show backend error message if ID exists
      } else {
        fetchEmployees(); // Refresh list
        document.getElementById('employeeForm').reset(); // Clear form inputs
      }
    })
    .catch(error => console.error(error));
}

// Delete Employee Function
function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(() => {
      fetchEmployees(); // Refresh list after deletion
    })
    .catch(error => console.error(error));
}

// Fetch employees on page load
fetchEmployees();
