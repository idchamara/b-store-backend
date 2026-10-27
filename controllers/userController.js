import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user ===================================================
export function saveUser(req, res) {
    // check the admin for, If user create an admin account
    if (req.body.role == "admin") {
        if (req.user == null) {
            res.status(403).json({
                message: "Please login as an admin, Before creating an admin account!"
            });
            return;
        }
        if (req.user.role != "admin") {
            res.status(403).json({
                message: "You are not authorized to create an admin account!"
            });
            return;
        }
    }
    const hashPassword = bcrypt.hashSync(req.body.password, 10)

    const user = new User(
        {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hashPassword,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role
        }
    )
    user.save().then(
        () => {
            res.json(
                {
                    message: "User saved successfully!"
                }
            )
        }
    ).catch(
        () => {
            res.status(500).json(
                {
                    message: "User not saved!"
                }
            )
        }
    )
};

// login user ===================================================
export function loginUser(req, res) {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;

    User.findOne(
        {
            email: loginEmail
        }
    ).then(
        (user) => {
            if (user == null) {
                res.status(404).json(
                    {
                        message: "Invalid Email"
                    }
                )
            } else {
                const isPasswordCorrect = bcrypt.compareSync(loginPassword, user.password)
                if (isPasswordCorrect) {

                    const userData = {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        phoneNumber: user.phoneNumber,
                        isDisabled: user.isDisabled,
                        isEmailVerified: user.isEmailVerified
                    }
                    // crating a token
                    const token = jwt.sign(userData, "random456");

                    res.json(
                        {
                            message: "Login Successful",
                            token: token
                        }
                    )
                } else {
                    res.status(403).json(
                        {
                            message: "Invalid Password"
                        }
                    )
                };
            }
        }
    )
};