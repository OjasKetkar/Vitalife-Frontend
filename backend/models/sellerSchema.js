//User Schema is basically a document that describes how exactly the overall file is going to look like
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')


const sellerSchema = new mongoose.Schema({
    id : {
        type : String
    },
    name:{
        type : String,
        required : true, 
    },
    email:{
        type : String,
        required : true, 
    },
    phone:{
        type : Number,
        required : true, 
    },
    password:{
        type : String,
        required : true, 
    },
    cpassword:{
        type : String,
        required : true, 
    },
    products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'PRODUCTS', // Reference the Product model
        },
      ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


// password hashing
// sellerSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 15);
//         this.cpassword = await bcrypt.hash(this.cpassword, 15);
//     }
//     next();
// })

//generation of token
//here usersChema is an instance which we want to work with a method we defined
sellerSchema.methods.generateAuthToken = async function() {
    try{
        //let token = jwt.sign({payload},secret key,LOLGOUT TIME)
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY)    //generating tokens
        this.tokens = this.tokens.concat({token:token}) //adding them to the upper obj-aray
        await this.save();      //saving them to the array
        return token
    }
    catch(err){
        console.log(err)
    }
}


const Seller = mongoose.model('SELLERS',sellerSchema)
module.exports = Seller;