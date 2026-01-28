import {User} from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id); // i chaned res.user to req.user
    if(req.user.role !== "Admin") {
        return next(
         new ErrorHandler(
            `${req.user.role} You are not authorized to access this resource`, 403));
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not Authenticated", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);
    if(req.user.role !== "Patient") {
        return next(new ErrorHandler( `${req.user.role} You are not authorized to access this resource`, 403));
    }
    next();
});
