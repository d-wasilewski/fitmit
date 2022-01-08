const UserSchema = require("../models/UserSchema");
const router = require("express").Router();
const auth = require("../middleware/auth");
const { cloudinary } = require('../utils/cloudinary');

module.exports = router;

router.post("/uploadImage", async (req, res) => {
  
  const user = await UserSchema.findById(req.body.userId)
 
  if(user.profilePicture.url != "") {
    try {
      await cloudinary.uploader.destroy(user.profilePicture.public_id)
    } catch (e) {
    }
  }

  try {
    const uploadedResponse = await cloudinary.uploader.upload(req.body.profilePicture, {
      upload_preset: 'dev_setups'
    });

    const userAfterUpdate = await UserSchema.findByIdAndUpdate(req.body.userId, {    
      profilePicture: {
        url : uploadedResponse.secure_url,
        public_id : uploadedResponse.public_id
      }
    }, {new: true})

    return res.status(201).json(userAfterUpdate)
    
  } catch (e) {
    return res.status(500).json(e)
  }
})



//update user
router.put("/:id", async (req, res) => {
  console.log(req.body.userId, req.params.id);
  if (req.body.userId === req.params.id) {
    try {
        const user = await UserSchema.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        })
        
        res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your account");
  }
});

// delete user (nie wiadomo czy bedzie)

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const { password, date, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a friend (?)
