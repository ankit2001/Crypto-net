const express = require('express');
const router = express.Router();
var fs = require('fs');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
let multer = require('multer');
let fileUpload = require('../models/file');
// Welcome Page

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'upload')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })
router.post('/upload', upload.single('myfile'), async (req, res) => {
    if (!req.file) {
      res.send('error');
    }
    const file = req.file.path;
    var file_name = req.file.originalname.split('.')[1];
    console.log(file_name);
    var target_path = 'upload/' +'.' + file_name;
    var file1=new fileUpload();
    console.log(req.file.path)
    file1.file=fs.readFileSync(req.file.path);
    file1.email=req.file.originalname;
    file.name=req.file.originalname;
    file1.save();
    res.send('done');
   // res.send('done');
});

router.get('/dashboard', ensureAuthenticated, (req, res) =>{
  

  fileUpload.find()
    .then((docs)=>{
      console.log(docs)
    res.render('dashboard', {
      user: req.user, 
      docs:docs
      })
    })
  }
    

);

router.get('/download',(req, res) =>{
  
  console.log(req.query.filename)
  fileUpload.find({email:req.query.filename})
    .then((docs)=>{
      console.log(docs);
      res.send(docs[0].file);
    })
  }
    

);


router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));


module.exports = router;
