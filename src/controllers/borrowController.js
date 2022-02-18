const Borrow= require('../models/borrowModel');


exports.borrowBook = async (req, res) => {
    try {
        let borrow = new Borrow ({
            Student: {
                Std_id: req.body.Student.Std_id,
                Std_name: req.body.Student.Std_name
            },
            Book:{
                Book_id:req.body.Book.Book_id,
                Book_name:req.body.Book.Book_name
            }, 
            Lender:{
                Staff_id:req.body.Lender.Staff_id,
                Staff_name:req.body.Lender.Staff_name
            }
        });

        // บักทึกข้อมูล ตาม borrow ด้านบน ซึ่งยังไม่มีวันกำหนดคืน
        let createdBorrow = await borrow.save();

        // ไปหยิบวันยืมมาจาก createdBorrow ซึ่งการจะเข้าไปเอาวันที่ยืมนั้น ต้องเข้าไปที่ createdBorrow.borrowDate ไปเก็บไว้ใน dDate
        let dDate = new Date(createdBorrow.borrowDate) 
        // สร้างโครงส้รางสำหรับเก็บ datetoretrun 
        let dataDate = {
            // daatatoreturn = วันยืมปัจจุบัน + 7 วัน 
            datetoreturn: dDate.setDate(dDate.getDate() + 7)
        }
            Borrow.findByIdAndUpdate(createdBorrow._id, dataDate).exec((err, result)=>{
                Borrow.findById(createdBorrow._id)
                    .exec((err, result)=>{
                        res.status(200).json({
                            msg: "Borrow savedeeeeeeeee",
                            data: result
                        });
                    });
            });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
        
    }
}
    

exports.getBorrowById = async (req,res)=>{
    Borrow.findById(req.params.id)   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.deleteBorrow = async (req,res)=>{
    Borrow.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DELETE MEMBER"
        });
    });
};


exports.getBorrow = async (req, res)=>{
    Borrow.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.returnBook = async(req, res) => {
    let data = { 
        datetoreturn : new Date(),
        Receiver: {
                Staff_id: req.body.Receiver.Staff_id,
                Staff_name: req.body.Receiver.Staff_name,
            }
        }; 
        console.log(data);
    Borrow.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Borrow.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return book saved",
                        data: result
                    });
                });
        });
};



exports.getBorrowByStdId = async (req, res)=>{
    console.log(req.params.id);
    Borrow.find({"Student.Std_id":req.params.id})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getBorrowByBookId = async (req, res)=>{
    console.log(req.params.id);
    Borrow.find({"Book.Book_id":req.params.id})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};


