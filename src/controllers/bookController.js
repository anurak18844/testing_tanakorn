const Book = require('../models/bookModel');
exports.addBook = async (req, res) =>{
    
    
    try {
        let book = new Book ({
            Book_id: req.body.Book_id,
            name: req.body.name,
            publisher: req.body.publisher,
            author: req.body.author,
            price: req.body.price,
            day_std: req.body.day_std,
            day_tch: req.body.day_tch
        });

        let createdBook = await book.save(); //asynchronous
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdBook
        });

        console.log(book);
    } catch (err) {

        console.log(err);
        res.status(500).json({
            error: err
        });
        
    }
}

exports.getBooks = async (req, res)=>{
    Book.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getBooksByIdbook = async (req,res)=>{
    Book.findOne({Book_id:req.params.id})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getBooksById = async (req,res)=>{
    Book.findById(req.params.id)   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.deleteBook = async (req,res)=>{
    Book.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: "DELETE BOOK"
        });
    });
};

exports.editWholeBook = async (req,res)=>{
    // req.params.id = id ของ product 
    // req.body = ข้อมูล product ที่จะ update
    let book = {
        Book_id: req.body.Book_id,
        name: req.body.name,
        publisher: req.body.publisher,
        author: req.body.author,
        price: req.body.price,
        day_std: req.body.day_std,
        day_tch: req.body.day_tch
    };
    Book.findByIdAndUpdate(req.params.id,book)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Book.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};