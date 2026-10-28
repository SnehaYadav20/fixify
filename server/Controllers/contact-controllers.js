const Contact=require("../Models/contactModel");
const contactForm=async(req,res,next)=>{
    try{
        const {name,email,query}=req.body;
        if(!name || !email || !query){
            return res.status(400).json({message:"Name, email and query are required"});
        }
        await Contact.create({name,email,query});
        return res.status(201).json({message:"Query sent successfully"});
    }catch(error){
        next(error);
    }
};
module.exports=contactForm;
