const {z}=require("zod");
const customerLoginSchema=z.object({
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

const customerSignupSchema=customerLoginSchema.extend({
    name:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must contain at least of 3 characters"}),
    
    phone:z
    .string({required_error:"Phone Number is required"})
    .trim()
    .min(10,{message:"Phone Number must be at least of 10 digits"})
    .max(13,{message:"Phone Number must be at least of 10 digits"}),

})

module.exports={customerSignupSchema,customerLoginSchema};