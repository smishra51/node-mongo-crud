import bcrypt from 'bcryptjs'
import Employee from '../model/employee.model.js'
import jwt from 'jsonwebtoken';

class UserController {

    register(req, res) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const reqData = {
            name: req.body.name,
            contact_no: req.body.contact_no,
            age: req.body.age,
            password: hashedPassword
        }
        Employee.create(reqData).then(user => {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
            res.json({ status: "success", token: token }).status(200);
        }).catch(error => {
            res.json({ status: "error", message: error.message }).status(500);
        })
    }

    authenticateJWT(req, res, next) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}
export default UserController;