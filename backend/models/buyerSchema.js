//User Schema is basically a document that describes how exactly the overall file is going to look like
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')


const buyerSchema = new mongoose.Schema({
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
    purchasedProducts: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PRODUCTS'
          },
          quantity: {
            type: Number,
          },
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
// buyerSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password = await bcrypt.hash(this.password, 15);
//         this.cpassword = await bcrypt.hash(this.cpassword, 15);
//     }
//     next();
// })

//generation of token
//here usersChema is an instance which we want to work with a method we defined
buyerSchema.methods.generateAuthToken = async function() {
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


const Buyer = mongoose.model('BUYERS',buyerSchema)
module.exports = Buyer;