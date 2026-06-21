const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()
const db = require('./Confing')
const nodemail = require('nodemailer')
const bcrypt = require('bcrypt')
const path = require('path')
const jwt = require('jsonwebtoken');


app.use(cors());
app.use(express.json())

let jwtSecret="myintershipProject"

app.use('/upload', express.static(path.join(__dirname, 'upload')))


let Otpstorage = {}
const saltRounds = 10;

const transporter = nodemail.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})
app.get('/', (req, res) => {
    res.send
        ("rukmai")
})

let findexstingemail = (useremail, callback) => {
    let sql = "select * from users where email=?"
    db.query(sql, [useremail], callback)
}

app.post('/userData', (req, res) => {
    const { Firstname, Lastname, Email, Password, cityid } = req.body
    findexstingemail(Email, async (err, result) => {
        if (result.length > 0) {
            return res.status(400).json({ message: "User aleready exsting" })
        }
        else {
            let otp = Math.floor(Math.random() * 900000)
            console.log(otp)
            Otpstorage[Email] = { otp: otp, expiers: Date.now() + 2 * 60 * 1000, userdetails: { Firstname, Lastname, Email, Password, cityid } }
            let Emailoption = {
                from: process.env.EMAIL_USER,
                to: Email,
                subject: "Your OTP code",
                text: `Your OTP is ${otp}.It is valid for 2 minutes.`
            };
            await transporter.sendMail(Emailoption)
            return res.status(200).json({ message: " OTP sent successfully" })
        }
    })
})

app.post('/OtpVerify', (req, res) => {
    const { otp, useremail } = req.body

    if (!Otpstorage[useremail]) {
        return res.status(400).json({ message: "otp not required" })
    }
    if (Otpstorage[useremail].expiers < Date.now()) {
        delete Otpstorage[useremail]
        return res.status(400).json({ message: "otp expired" })
    }
    if (Otpstorage[useremail].otp != otp) {
        return res.status(400).json({ message: "Invalid otp" })
    }
    else {
        const { Firstname, Lastname, Email, Password, cityid } = Otpstorage[useremail].userdetails
        const sql = "insert into users(firstname, lastname, email, password, cityid)values(?,?,?,?,?)"
        bcrypt.hash(Password, saltRounds, function (err, hash) {
            if (err) return res.status(500).json({ message: "Error hashing password" })
            db.query(sql, [Firstname, Lastname, Email, hash, cityid], (err) => {
                console.log(err)
                if (err) return res.status(500).json({ message: "Database error" })
                delete Otpstorage[useremail]
                res.status(200).json({ message: "User Register Sucessfuly" })
            })

        });
    }
})

app.get('/cityData', (req, res) => {
    db.query("select * from city", (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "database error" })
        }
        else {
            return res.status(200).json(result)
        }
    })
})


app.get('/category', (req, res) => {
    let sql = "select * from category"
    db.query(sql, (err, result) => {
        console.log(err)
        if (err) return res.status(500).json({ message: "database error" })
        else
            return res.status(200).json(result)
    })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const stringval = "ecompro_images"
        const extension = path.extname(file.originalname);
        const datetime = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 14);
        const randomNum = Math.floor(Math.random() * 1000000);
        const uniqueFilename = `${stringval}_${datetime}_${randomNum}${extension}`;
        cb(null, uniqueFilename)
    }
})
console.log(storage)
const upload = multer({ storage: storage })


app.post('/addproduct', upload.array("images"), (req, res) => {
    const { ProductName, Price, Description, catid } = req.body
    const images = req.files.map(file => file.filename)
    let sql = "insert into products(productname, price, description, catid)values(?,?,?,?)"
    db.query(sql, [ProductName, Price, Description, catid], (err, result) => {
        if (err) console.log(err)
        else {
            const imgsql = "insert into pimage(imagepath, pid)value(?,?)"
            images.map(imagepath => {
                db.query(imgsql, [imagepath, result.insertId], (err) => {
                    if (err) console.log(err)
                    else console.log("image Inserted")
                })
            })
        }
    })
})

app.get('/displayProducts', (req, res) => {
    let sql = `select p.*,imgid.img_id,pimage.imagepath from products as p inner join
    (SELECT pid,min(imgid) as img_id FROM pimage group by pid)
    as imgid on imgid.pid=p.productid inner join pimage on pimage.imgid=imgid.img_id;`

    db.query(sql,(err,result)=>{
        console.log(err)
        if(err)
            return res.status(500).json({message:"database error"})
        else return res.status(200).json(result)
    })
})

app.post('/userLogin',(req,res)=>{
const{Email,Password}=req.body
 findexstingemail(Email,async(err,result)=>{
    if(err)
        return res.status(500).json({message:"database error"})
    else{
      if(result.length>0){
        let passwordresult=await bcrypt.compare(Password, result[0].password)
        {
            if (passwordresult==true){
                let userID=result[0].userid;
                let role=result[0].role
                let token=genrateToken(userID,role)
                console.log(token)
                return res.status(200).json({token:token,role:role})
            }
            else{
                return res.status(401).json({message:"Wrong Password"})
            }
        }
      }
      else{
        return res.status(404).json({message:"Not found"})
      }
    }
 })

})

let genrateToken=(userid,role)=>{
    console.log(userid,role)
    return jwt.sign({userid,role},jwtSecret,{expiresIn:'1h'})
}


let verifyToken=(req,res,next)=>{
let token=req.headers.authorization.split(" ")[1]
if(!token) return res.status(401).json({message:"Unthorized"})
jwt.verify(token,jwtSecret,(err,decode)=>{
    req.user=decode
    next()
})
}

app.get('/userDetails',verifyToken,(req,res)=>{
    console.log("hello")
    console.log(req.user)
    let sql="select * from users where userid=?"
    db.query(sql,[req.user.userid],(err,result)=>{
        if(err)
            return res.status(500).json({message:"database issues"})
        else return res.status(200).json(result)
    })
})

app.post('/adminiLogin',(req, res) => {
    const {email, Password } = req.body
    const sql = "select * from admin where email=? and password=?"
    db.query(sql, [email, Password], (err,result) => {
        if (err) 
            return res.status(500).json({ message: "database error" })
        if(result.length==0)return res.status(404).json({message:"user not found"})
        else {
           let adminId=result[0].adminid
            let role=result[0].role
           let token=genrateToken(adminId,role)
           console.log("token",token)
           res.status(200).json({token:token,role:role})
        }

    })

})

app.put("/saveData",(req,res)=>{
    const{userid, firstname, lastname, email }=req.body
    console.log(req.body)
      let sql = "UPDATE users SET firstname=?, lastname=?, email=? WHERE userid=?"
    db.query(sql,[firstname, lastname, email,userid],(err)=>{
        if(err) {
            return res.status(500).json({message:"Database error"})
        }
        else{
        return res.status(200).json({message:"Update Sucessfuly"})
        }
    })
})


app.post('/addtoCart',verifyToken,(req,res)=>{
    // const{productid}=req.body
    let values=req.body.map(product=>([product.productid,product.quentity,req.user.userid]))
    let sql="insert into cartitems(productid,quentity,userid)values ?"
    db.query(sql,[values],(err,result)=>{
        if(err)return res.status(500).json({message:"database error"})
    else
        return res.status(200).json({message:"Cart Items Updates"})
        
    })
})

app.post('/CartItems',verifyToken,(req,res)=>{
let sql=`SELECT c.*, p.*, imgid.img_id, pimage.imagepath FROM cartitems AS c
INNER JOIN products AS p ON c.productid = p.productid
INNER JOIN ( SELECT pid,MIN(imgid) AS img_id FROM pimage
GROUP BY pid) AS imgid ON imgid.pid = c.productid
INNER JOIN pimage ON pimage.imgid = imgid.img_id
WHERE c.userid = ?`
 db.query(sql, [req.user.userid], (err, result) => {
        if (err) return res.status(500).json({ message: "Database Error" })
        else return res.status(200).json(result)
    })
})

app.put('/UpdateCart', verifyToken, (req, res) => {
    let { quantity, cartid } = req.body
    let sql = `UPDATE cartitems SET quentity = ? WHERE cartid = ? AND userid = ?`
    db.query(sql, [quantity, cartid, req.user.userid], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" })
        }
        return res.status(200).json({ message: "Cart Updated Successfully"})
    })
})

app.delete('/removeCartItems/:id',verifyToken,(req,res)=>{
const cid=req.params.id
const sql="delete from cartitems where cartid=?"
db.query(sql,[cid],(err)=>{
    if(err){
        console.log(err)
        return res.status(500).json({message:"Database error"})
    }
    else{
        return res.status(200).json({message:"CartItem Remove"})
    }
})
})


app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});