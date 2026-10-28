const Customer=require("../Models/customerModel")
const ServiceProvider=require("../Models/serviceProviderModel")

//const bcrypt=require("bcryptjs");

//HomePage logic
const home=async(req,res)=>{
    try{
        res.status(200).json({message:"Home Page"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}

//About Page
const about=async(req,res)=>{
    try{
        res.status(200).json({message:"About Us"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}


//Dashboard Page
const dashboard=async(req,res)=>{
    try{
        res.status(200).json({message:"Dashboard"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}

 //signinup Page
const signinup=async(req,res)=>{
    try{
        res.status(200).json({message:"signinup"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}

//Login Customer
const loginC = async (req, res) => {
    try {
        const { email, password } = req.body;
        const customerExist = await Customer.findOne({ email });
        if (!customerExist) {
            return res.status(404).json({ message: "Invalid Login Credential" });
        }
        const isPasswordValid = await customerExist.comparePassword(password);
        if (isPasswordValid) {
            return res.status(200).json({
                message: "Login Successful",
                token: await customerExist.generateToken(),
                customerId: customerExist._id.toString(),
            });
        } else {
            return res.status(401).json({ message: "Invalid Login Credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Internal Server Error" });
    }
}


//Login ServiceMan
const loginS = async (req, res) => {
    try {
        const { email, password } = req.body;
        const ServiceProviderExist = await ServiceProvider.findOne({ email });
        if (!ServiceProviderExist) {
            return res.status(404).json({ message: "Invalid Login Credential" });
        }
        const isPasswordValid = await ServiceProviderExist.comparePassword(password);
        if (isPasswordValid) {
            return res.status(200).json({
                message: "Login Successful",
                token: await ServiceProviderExist.generateToken(),
                ServiceProviderId: ServiceProviderExist._id.toString(),
            });
        } else {
            return res.status(401).json({ message: "Invalid Login Credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Internal Server Error" });
    }
}

//Register Customer
const registerC=async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body;
        const CustomerExist=await Customer.findOne({email:email});
        if(CustomerExist){
            return res.status(404).json({message:"Email already exists"});
        }
        const CustomerCreated=await Customer.create({name,email,phone, password})
        res.status(200).json({
            message:"Registration Successfull", 
            token: await CustomerCreated.generateToken(),
            customerId:CustomerCreated._id.toString(),
        });
    }catch(error)
    { res.status(404).json({message:"Internal Server Error"})}
}

//Register ServiceMan
const registerS=async(req,res)=>{
    try{
        const {name,email,phone,password,aadhar,jobType}=req.body;
        const  ServiceProviderExist= await ServiceProvider.findOne({email});
        if( ServiceProviderExist){
            return res.status(404).json({message:"Email already exists"});
        }
        
        const ServiceProviderCreated = await  ServiceProvider.create({name,email,aadhar,phone, password,jobType})
        res.status(200).json({
            message:"Registration Successfull",
            token: await  ServiceProviderCreated.generateToken(),
            ServiceProviderId: ServiceProviderCreated._id.toString(),
        });
    }catch(error)
    { res.status(404).json({message:"Internal Server Error"})}
}
//MessageBox
const messages=async(req,res)=>{
    try{
        res.status(200).json({message:"Inbox"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}

//Single Meesage
const message=async(req,res)=>{
    try{
        res.status(200).json({message:"Chat"});
    }catch(error)
    { res.status(404).json({message:'Page not found'})}
}

//customer Logic

const user=async(req,res)=>{
    try{
        const userData=req.user
        console.log(userData)
        return res.status(200).json({userData});
    }catch(error)
    { res.status(404).json({message:'error from root'})}
}






module.exports={home,about,dashboard,signinup,loginC,loginS,registerC,registerS,messages,message,user};