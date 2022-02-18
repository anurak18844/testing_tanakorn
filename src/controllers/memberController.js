const Member = require('../models/memberModel');
exports.addMember = async (req, res) =>{
    
    
    try {
        let member = new Member ({
            Std_id: req.body.Std_id,
            Std_name: req.body.Std_name,
            Group_Learn: req.body.Group_Learn,
            Category: req.body.Category,
            Tel: req.body.Tel,
            Address: req.body.Address,
        });

        let createdMember = await member.save(); //asynchronous
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdMember
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({
            error: err
        });
        
    }
}
exports.getMembers = async (req, res)=>{
    Member.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.editWholeMember = async (req,res)=>{
    // req.params.id = id ของ product 
    // req.body = ข้อมูล product ที่จะ update
    let member = {
        Std_id: req.body.Std_id,
        Std_name: req.body.Std_name,
        Group_Learn: req.body.Group_Learn,
        Category: req.body.Category,
        Tel: req.body.Tel,
        Address: req.body.Address,
    };
    Member.findByIdAndUpdate(req.params.id,member)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Member.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.getMemberById = async (req,res)=>{
    Member.findById(req.params.id)   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.deleteMember = async (req,res)=>{
    Member.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DELETE MEMBER"
        });
    });
};

exports.getMemberByIdmember = async (req,res)=>{
    Member.findOne({Std_id:req.params.id})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};