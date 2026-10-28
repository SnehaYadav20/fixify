const {z}=require("zod");

const serviceLoginSchema=z.object({
    email:z
    .string({required_error:"Name is required"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{message:"Email must contain at least of 3 characters"})
    .max(255,{message:"Email must be not be more than 255 characters"}),
    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(8,{message:"Password must contain at least of 8 characters"})
    .max(1024,{message:"Password must be not be more than 1024 characters"}),
})


const serviceSignupSchema=serviceLoginSchema.extend({
    name:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must contain at least of 3 characters"}),
    aadhar:z
    .string({required_error:"Aadhar Number is required"})
    .trim()
    .min(14,{message:"Aadhar must be at least of 14 digits"})
    .max(14,{message:"Aadhar must be at least of 14 digits"}),
    jobType:z
    .string({required_error:"Job is required"}),
    phone:z
    .string({required_error:"Phone Number is required"})
    .trim()
    .min(10,{message:"Phone Number must be at least of 10 digits"})
    .max(10,{message:"Phone Number must be at least of 10 digits"}),

})

module.exports={serviceSignupSchema,serviceLoginSchema};