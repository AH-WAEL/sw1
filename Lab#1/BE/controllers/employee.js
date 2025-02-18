const employee = [{ id: '1', name: 'Mohamed Sayed' }];

// Get Employees
exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// Create Employee with ID Duplication Check
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: 'ID and Name are required' });
  }

  // Backend Validation: Prevent duplicate ID
  const existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {
    return res.status(400).json({ message: 'Error: Employee ID already exists. Please enter a unique ID.' });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee);

  res.status(201).json({ data: newEmployee });
};

// Delete Employee
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;

  const index = employee.findIndex(emp => emp.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employee.splice(index, 1);
  res.status(200).json({ message: 'Employee deleted successfully' });
};
