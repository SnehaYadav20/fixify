const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");

const ServiceProviderSchema=new mongoose.Schema({
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
    aadhar:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    jobType: 
    {
        type: String,
        required: true
    },
    role:
    {
        type:String,
        default:"service_provider"
    },
    isAdmin:
    {
        type:Boolean,
        default:false
    }

})

ServiceProviderSchema.pre('save',async function(next){
    const ServiceProvider=this;
    if(!ServiceProvider.isModified("password"))
    {return next();}
    try{
        const saltRound=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(ServiceProvider.password, saltRound);
        ServiceProvider.password=hashpassword

    }
    catch(error){
        next(error);
    }
})


ServiceProviderSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password, this.password);
}

ServiceProviderSchema.methods.generateToken=async function(){
    try{
        return jwt.sign({
            serviceProviderId:this._id.toString(),
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

const ServiceProvider=new mongoose.model("ServiceProvider", ServiceProviderSchema);

module.exports=ServiceProvider