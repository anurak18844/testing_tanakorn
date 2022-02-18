const Staff = require('../models/staffModel');
exports.addStaff = async (req, res) =>{
    
    
    try {
        let staff = new Staff ({
            Staff_id: req.body.Staff_id,
            Staff_name: req.body.Staff_name,
            Address: req.body.Address,
            Tel: req.body.Tel,

        });
        staff.Password = await staff.hashPassword(req.body.Password);
        let createdStaff = await staff.save();
        res.status(200).json({
            msg: "New user created",
            data: createdStaff
        })



    } catch (err) {

        console.log(err);
        res.status(500).json({
            error: err
        });
        
    }
}

exports.getStaff = async (req,res)=>{
    Staff.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getStaffById = async (req,res)=>{
    Staff.findById(req.params.id)   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getStaffByIdstaff = async (req,res)=>{
    Staff.findOne({staff_id:req.params.id})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.editWholeStaff = async (req,res)=>{
    // req.params.id = id ของ product 
    // req.body = ข้อมูล product ที่จะ update
    let staff = {
        Staff_id: req.body.Staff_id,
        Staff_name: req.body.Staff_name,
        Address: req.body.Address,
        Tel: req.body.Tel,
    };
    Staff.findByIdAndUpdate(req.params.id,staff)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Staff.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.deleteStaff = async (req,res)=>{
    Staff.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DELETE STAFF"
        });
    });
};

exports.login = async (req, res)=>{
    const login = {
        Staff_id: req.body.Staff_id,
        Password: req.body.Password
    }
    // console.log(login)
    try {
        let staff = await Staff.findOne({
            Staff_id: login.Staff_id
        });
        // console.log(user);
        //check if user exit
        if (!staff) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }

        let match = await staff.compareUserPassword(login.Password, staff.Password);
        if (match) {
            let token = await staff.generateJwtToken({
                staff
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: staff
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
};
