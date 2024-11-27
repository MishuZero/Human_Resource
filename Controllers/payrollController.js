const Employee = require('../models/employeeModel');
const Attendance = require('../models/attendanceModel');

exports.generatePayroll = async (req, res) => {
    try {
        const { month, year } = req.params;
        const employee = await Employee.findById(req.params.employeeId);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Calculate working days
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        
        const attendance = await Attendance.find({
            employee: employee._id,
            date: { $gte: startDate, $lte: endDate }
        });

        // Basic calculations
        const workingDays = attendance.filter(a => a.status === 'Present').length;
        const basicSalary = employee.salary;
        const perDaySalary = basicSalary / 30;
        const earnedSalary = workingDays * perDaySalary;

        // Deductions
        const tax = basicSalary * 0.1; // 10% tax
        const insurance = basicSalary * 0.05; // 5% insurance
        
        const payroll = {
            employee: employee._id,
            month,
            year,
            basicSalary,
            workingDays,
            earnedSalary,
            deductions: {
                tax,
                insurance
            },
            netSalary: earnedSalary - (tax + insurance)
        };

        res.json(payroll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};