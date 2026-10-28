const Customer=require("../Models/customerModel")
const ServiceProvider=require("../Models/serviceProviderModel")
const Contacts=require("../Models/contactModel")

const getAllUserC=async(req,res,next)=>{
    try {
        const customers=await Customer.find({},{password:0})
        if(!customers|| customers.length===0){
            return res.status(404).json({message:"No Customer Found"})
        }
        return res.status(200).json(customers)
        
    } catch (error) {
        next(error)
    }
}

const getAllUserS=async(req,res,next)=>{
    try {
        const serviceProviders=await ServiceProvider.find({},{password:0})
        if(!serviceProviders|| serviceProviders.length===0){
            return res.status(404).json({message:"No Service Provider Found"})
        }
        return res.status(200).json(serviceProviders)
        
    } catch (error) {
        next(error)
    }
}

const getUserC = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await Customer.findOne({ _id: id }, { password: 0 });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  const getUserS = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await ServiceProvider.findOne({ _id: id }, { password: 0 });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  const updateUserC= async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedUserData = req.body;
  
      const updatedData = await Customer.updateOne(
        { _id: id },
        {
          $set: updatedUserData,
        }
      );
      return res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  };

  const updateUserS = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedUserData = req.body;
  
      const updatedData = await ServiceProvider.updateOne(
        { _id: id },
        {
          $set: updatedUserData,
        }
      );
      return res.status(200).json(updatedData);
    } catch (error) {
      next(error);
    }
  };

const deleteUserC= async (req, res, next) => {
    try {
      const id = req.params.id;
      await Customer.deleteOne({ _id: id });
      return res.status(200).json({ message: "Customer Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };

  const deleteUserS= async (req, res, next) => {
    try {
      const id = req.params.id;
      await ServiceProvider.deleteOne({ _id: id });
      return res.status(200).json({ message: "ServiceProvider Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };

const getAllContacts=async(req,res,next)=>{
    try {
        const contact=await Contacts.find()
        if(!contact|| contact.length===0){
            return res.status(404).json({message:"No Contacts Found"})
        }
        return res.status(200).json(contact)
        
    } catch (error) {
        next(error)
    }
  }

  const deleteContact= async (req, res, next) => {
    try {
      const id = req.params.id;
      await Contacts.deleteOne({ _id: id });
      return res.status(200).json({ message: "Contact Deleted Successfully" });
    } catch (error) {
      next(error);
    }
  };


module.exports={getAllUserC, getAllUserS, getUserC, getUserS, updateUserC, updateUserS, deleteUserC, deleteUserS, getAllContacts, deleteContact}