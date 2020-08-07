import Employee from '../model/employee.model.js';
class EmployeeController {

    async get(req, res) {
        let data = undefined;
        try {
            data = await Employee.find({});
            if (data) {
                res.json({ status: "success", data: data }).status(200);
            } else {
                res.json({ status: "success", data: data }).status(203);
            }
        } catch (error) {
            res.json({ status: "error", message: error.message }).status(500);
        }
    }

    post(req, res) {
        const reqData = req.body;
        Employee.create(reqData).then(data => {
            res.json({ status: "success", data: data }).status(200);
        }).catch(error => {
            res.json({ status: "error", message: error.message }).status(500);
        })
    }

    put(req, res) {
        const id = req.params.employeeId;
        const reqObj = req.body;
        Employee.findByIdAndUpdate(id, reqObj).then(resp => {
            console.log(resp)
            if (resp) {
                res.json({ status: "success", message: 'Successfully Updated' }).status(200);
            } else {
                res.json({ status: "success", message: 'Employee Not Found' }).status(404);
            }
        }).catch(error => {
            res.json({ status: "error", message: error.message }).status(500);
        })
    }

    delete(req, res) {
        const employeeId = req.params.employeeId;
        Employee.findByIdAndRemove(employeeId).then(resp => {
            if (resp) {
                res.json({ status: "success", message: 'Successfully Deleted' }).status(200);
            } else {
                res.json({ status: "success", message: 'Employee Not Found' }).status(404);
            }
        }).catch(error => {
            res.json({ status: "error", message: error.message }).status(500);
        })
    }
}

export default EmployeeController;