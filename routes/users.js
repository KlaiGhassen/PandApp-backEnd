var express = require("express");
const User = require("../models/user");
var router = express.Router();
const multer = require("multer");
var request = require('request');   // install request module by - 'npm install request'
var fs = require('fs')
const ocr = require("../routes/ocr");
const { POINT_CONVERSION_COMPRESSED } = require("constants");

const picsPath = require("path").resolve(__dirname, "../uploads");







const form_data = {
  file: fs.createReadStream('test.jpg'),
}

const options = {
    url : "https://app.nanonets.com/api/v2/OCR/Model/e9a95cc3-6ef9-4ac1-9754-e058086ccdbd/LabelFile/?async=false",
    formData: form_data,
    headers: {
        'Authorization' : 'Basic ' + Buffer.from('4vPcRHbXU1RZ4f6IWkKktZ5QTgnIa0pt' + ':').toString('base64')
    }
}
request.post(options, function(err, httpResponse, body) {
    console.log(body);
});





router.get("/download/:nom", function(req, res) {
    let nom = req.params.nom;
    const file = picsPath + "/" + nom;
    console.log(file, "hy");
    res.sendFile(file); // Set disposition and send it.
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        var filetype = "";
        var fileExtension = "";
        if (file.mimetype === "image/gif") {
            filetype = "image-";
            fileExtension = "gif";
        }
        if (file.mimetype === "image/png") {
            filetype = "image-";
            fileExtension = "png";
        }
        if (file.mimetype === "image/jpeg") {
            filetype = "image-";
            fileExtension = "jpeg";
        }
        if (file.mimetype === "image/jpg") {
            filetype = "image-";
            fileExtension = "jpg";
        }

        cb(null, filetype + Date.now() + "." + fileExtension);
        h = cb;
    },
});
var upload = multer({
    storage: storage,
});
// download picture to the server
/**
 * @swagger
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user/file:
 *  post:
 *    tags: [User]
 *    summary: Uploads a file.
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: file
 *        in: formData   # <-----
 *        description: The uploaded file data
 *        required: true
 *        type: file     # <-----
 * 
 * 
 */

router.post("/file", upload.single("file"), function(req, res, next) {
    if (!req.file) {
        res.status(500);
        return next(err);
    }
    res.json({
        img: req.file.filename,
    });
});

/* GET users listing. */

//get all users
/**
 * @swagger
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user:
 *  get:
 *    tags: [User]
 *    description: Use to request all Users
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.get("/", async(req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get one user

/**
 * @swagger
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user/{email}:
 *  get:
 *   tags: [User]
 *   summary: this Api used to get one user from database
 *   description: this api is used to get one user from database
 *   parameters:
 *     - in: path
 *       name: email
 *       description: Must provide  email 
 *       schema:
 *        type: string
 *   responses:
 *     '200':
 *        description: A successful response
 */
router.get("/:email", getUser, (req, res) => {
    console.log(res.user)
    res.json(res.user);
});



router.get("/userByEmail/:email", async(req, res, next) => {
    try {
        const user = await User.find({ email: req.params.email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add User

/**
 * @swagger 
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user:
 *  post:
 *   tags: [User]
 *   summary: Creates a new user.
 *   requestBody:
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             identifant:
 *              type: string
 *             email:
 *              type: string
 *             password:
 *              type: string
 *             phoneNumber:
 *              type: number
 *             profilePicture:
 *              type: string
 *             FirstName:
 *              type: string
 *             LastName:
 *              type: string
 *             verified:
 *              type: boolean
 *             className:
 *              type: string
 *             social:
 *              type: boolean
 *             role:
 *              type: string
 *             description:
 *              type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.post("/", async(req, res, next) => {
    console.log(req.body);
    const user = new User({
        identifant: req.body.identifant,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        verified: req.body.verified,
        className: req.body.className,
        social: req.body.social,
        role: req.body.role,
        description: req.body.description,
    });
    try {
        const newUser = await user.save();

        res.status(201).json({ newUser });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.json({ isemail: true });
        }
    }
});


//delet one user

/**
 * @swagger
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user/{email}:
 *  delete:
 *   tags: [User]
 *   summary: this Api used to delete user from database
 *   description: this api is used to delete  users from database
 *   parameters:
 *     - in: path
 *       name: email
 *       description: Must provide  email 
 *       schema:
 *        type: string
 *   responses:
 *     200:
 *        description: A successful response
 */

router.delete("/:email", getUser, async(req, res) => {
    console.log(res.usery)
    try {
        await res.user.remove();
        res.status(200).json({ message: "deleted user" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/**
 * @swagger 
 * tags:
 *  name: User
 *  description: This is for the main User
 * /user/{email}:
 *  patch:
 *   tags: [User]
 *   summary: Creates a new user
 *   parameters:
 *       - in: path
 *         name: email
 *         description: email of user to change.
 *   requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              identifant:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *              phoneNumber:
 *               type: number
 *              profilePicture:
 *               type: string
 *              FirstName:
 *               type: string
 *              LastName:
 *               type: string
 *              verified:
 *               type: boolean
 *              className:
 *               type: string
 *              social:
 *               type: boolean
 *              role:
 *               type: string
 *              description:
 *               type: string
 *  responses:
 *      201:
 *         description: Created
 */

router.patch("/:email", getUser, async(req, res) => {
    console.log(req.params)
    console.log("req",req.body)
    if (req.body.identifant != null) {
        res.user.identifant = req.body.identifant;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.phoneNumber != null) {
        res.user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.profilePicture != null) {
        res.user.profilePicture = req.body.profilePicture;
    }
    if (req.body.FirstName != null) {
        res.user.FirstName = req.body.FirstName;
    }
    if (req.body.LastName != null) {
        res.user.LastName = req.body.LastName;
    }
    if (req.body.verified != null) {
        res.user.verified = req.body.verified;
    }
    if (req.body.social != null) {
        res.user.social = req.body.social;
    }
    if (req.body.role != null) {
        res.user.role = req.body.role;
    }
    if (req.body.description != null) {
        res.user.description = req.body.description;
    }
    if (req.body.className != null) {
        res.user.className = req.body.className;
    }

    try {
        res.user.save().then((updateduser) => {
            res.json(updateduser);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

async function getUser(req, res, next) {
    console.log(req.params.email)
    try {
        user = await User.find({ email: req.params.email });
        if (user == null) {
            return res.status(404).json({ message: "cannot find user" });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user[0];
    next();
}



router.post('/signup/google', async (req, res) => {
    
    const user = new User({
        identifant: req.body.identifant,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        verified: req.body.verified,
        className: req.body.className,
        social: req.body.social,
        role: req.body.role,
        description: req.body.description,
    });

  
    
    try {
       
        const newUser = await user.save();
        //res.status(201).json({ newUser });
        res.json(res.body)
    } catch (error) {
        res.status(400).json({ reponse: error.message })
    }
})



router.post('/signup',  upload.single("file"), async (req, res) => {
    
    const user = new User({
        identifant: req.body.identifant,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        verified: req.body.verified,
        className: req.body.className,
        social: req.body.social,
        role: req.body.role,
        description: req.body.description,
    });

    if (req.file) {
        
        req.file.filename = req.file.filename
        user.profilePicture = req.file.filename
        console.log(user.profilePicture)
        
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",req.file)
    } else{
        cosnole.log("filllllllllllllllle problem")
    }
    
    try {
       
        const newUser = await user.save();
        //res.status(201).json({ newUser });
        res.json(res.body)
    } catch (error) {
        res.status(400).json({ reponse: error.message })
    }
})


// Ocr abaguishagggggggyyyyyyyyy ena li sna3tou el skiiiiiiipe
router.post("/cardocr", upload.single('file') ,async(req, res, next) => {
    try 
   {
       const rr = await ocr.licenseVerification(req.file.path).then((result) => {
         //console.log(result.data.text);
        
         console.log(result.data.text)
         
         var PRENOM = result.data.text.indexOf("PRENOM")
         var CLASSE = result.data.text.indexOf("CLASSE")
         var IDENTIFIANT = result.data.text.indexOf("IDENTIFIANT")
         //-- Nom ---------
         var Nom = result.data.text.indexOf("NOM :")
         console.log(Nom)
         var endNom = result.data.text.indexOf("PRENOM")
         console.log(endNom)
         var finalNom = result.data.text.substring(Nom+6,endNom-5)
         console.log(finalNom) //ZITOUN
         //-- Nom end
         //--Prenom
         console.log(PRENOM)
         var prenomStart = result.data.text.indexOf("PRENOM : ")
         var PrenomEnd = result.data.text.indexOf("CLASSE")
         var finalPreNom = result.data.text.substring(prenomStart+9,PrenomEnd-7)
         console.log(finalPreNom)
         //--Prenom

         //--classe
         console.log(CLASSE)
         var classeStart = result.data.text.indexOf("CLASSE : ")
         var classeEnd = result.data.text.indexOf("IDENTIFIANT")
         var finalclasse = result.data.text.substring(classeStart+9,classeEnd-12)
         console.log(finalclasse)
         //--classe
         //--Identifiant
         console.log(IDENTIFIANT)
         var identifiantStart = result.data.text.indexOf("IDENTIFIANT : ")
         var identifiantEnd = result.data.text.indexOf("//")
         var finalidentifiant = result.data.text.substring(identifiantStart+14,identifiantEnd-4)
         console.log(finalidentifiant)
         const ocrResp = {
             FirstName: finalPreNom,
             LastName : finalNom,
             classe : finalclasse,
             identifiant: finalidentifiant

         }

         
         res.json(ocrResp)
       
     })
     ;
 
 }
   catch (error) {
     res.status(500).json({ message: error.message });
 }

 });




module.exports = router;