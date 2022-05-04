const Employee = require('../model/Employee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({'data':[]});
    res.json({'data': employees})
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({"message":"first and last name are required"});
    }

    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        res.status(201).json({'data': result});
    } catch (e) {
        console.error(e);
    }
}

const updateEmployee = async (req, res) => {
    
    if(req?.body?.id) {
        return res.status(400).json({'message': 'Id is required'});
    }
    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if (!employee) {
        return res.status(400).json({ "message": `Employee with ID ${req.body.id}` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = employee.save();
    res.json({'data': employee});
}

const deleteEmployee = async (req, res) => {
    
    if(!req?.body?.id) {
        return res.status(400).json({'message': 'Id is required'});       
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();
    
    if (!employee) {
        return res.status(400).json({ "message": `Employee with ID ${req.body.id}` });
    }

    const result = await Employee.deleteOne({_id: req.body.id});
    res.json({'message': `Employee with ${req.body.id} deleted`, data: result});
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) {
        return res.status(400).json({'message': 'Id is required'});
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if (!employee) {
        return res.status(400).json({ "message": `Employee with ID ${req.params.id}` });
    }

    res.json({'data': employee});
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}