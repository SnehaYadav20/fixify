const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");

const CustomerSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    role:
    {
        type:String,
        default:"customer"
    },
    isAdmin:
    {
        type:Boolean,
        default:false
    }

})


CustomerSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password, this.password);
}

CustomerSchema.pre('save',async function(next){
    const Customer=this;
    if(!Customer.isModified("password"))
    {return next();}
    try{
        const saltRound=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(Customer.password, saltRound);
        Customer.password=hashpassword

    }
    catch(error){
        next(error);
    }
})

CustomerSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            customerId:this._id.toString(),
            email:this.email,
            role:this.role,
            isAdmin:this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:"1d",
        }
    );
    }catch(error){
        console.error(error);
    }
};


const Customer=new mongoose.model("Customer", CustomerSchema);

module.exports=Customer