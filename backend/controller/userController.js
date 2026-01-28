import { catchAsyncErrors } from  "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email,phone, password,gender,dob,nic,role} = req.body;
    if(!firstName || !lastName ||  !email || !phone || !password || !gender || !dob ||  !nic || !role){
        return next(new ErrorHandler("Please fill full form", 400));

    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already Registered", 400));
    }
    user = await User.create({firstName, lastName, email,phone, password,gender,dob,nic,role});
    generateToken(user, "User Registered Successfully", 200, res);

});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if(!email || !password  || !confirmPassword || !role) {
        return next(new ErrorHandler("Please fill full form", 400));
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400));
    }
    const  user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if (role !== user.role) {
        return next(new ErrorHandler("Invalid role", 400));
    }
    generateToken(user, "User Login Successfully!", 200, res);
    

});

//add new admin 
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
const{
    firstName, lastName, email,phone, password,gender,dob,nic
} = req.body;
if(!firstName || !lastName ||  !email || !phone || !password || !gender || !dob ||  !nic ){
    return next(new ErrorHandler("Please fill full form", 400));

}
const isRegistered = await User.findOne({ email });
 // Check if the user is already registered
 if (isRegistered) {
    const role = isRegistered.role || "Unknown";
    return next(new ErrorHandler(`${role} Admin already Registered`, 400));
}

const admin = await User.create({ firstName, lastName, email,phone, password,gender,dob,nic, role: "Admin", }); // new admin creation
 res.status(200).json({
    success: true,
    message: "Admin Created Successfully",
   admin,

 });
// return next(new ErrorHandler(admin,"Admin Created Successfully", 200));
   
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    if (!doctors) {
        return next(new ErrorHandler("No doctors found", 404));
    }
    res.status(200).json({
        success: true,
        message: "Doctors fetched successfully",
        doctors,
    });
});


export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user; //i chaned res.user to req.user
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        user,
    });
});

/// Logout Admin 
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => { 
    res.cookie("adminToken", null, {  ////code change from me 
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Admin Logout Successfully",
    });
});

/// Logout Patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => { 
    res.cookie("patientToken", null, {  ////code change from me 
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "User Logout Successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {    
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Please upload a file", 400));
    }
    const  {docAvatar} = req.files;
    const allowedFormats = ["image/jpg", "image/jpeg", "image/png", "image/webp","image/avif"];
    if(!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported", 400));
    }
    const {firstName, lastName, email,phone, password,gender,dob,nic,doctorDepartment} = req.body;
    if(!firstName || !lastName ||  !email || !phone || !password || !gender || !dob ||  !nic || !doctorDepartment){
        return next(new ErrorHandler("Please Provide Full Details", 400));
    }
    const isRegistered = await User.findOne({ email });
    if(isRegistered){
    return next (new ErrorHandler( `${isRegistered.role} Already registered with thi email`, 400));
    }
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);  //// code change from me
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown cloudinary error");
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartment,
        role:"Doctor",
        docAvatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).json({
        success: true,
        message: " New Doctor Registered Successfully!",
        doctor,
    });

});