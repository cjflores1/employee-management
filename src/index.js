const express = require('express');
require('dotenv').config();

const v1EmployeesRouter = require('./v1/routes/employeeRoutes');
const v1UsersRouter = require('./v1/routes/userRoutes');
const v1DepartmentsRouter = require('./v1/routes/departmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/employees', v1EmployeesRouter);
app.use('/api/v1/users', v1UsersRouter);
app.use('/api/v1/departments', v1DepartmentsRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
