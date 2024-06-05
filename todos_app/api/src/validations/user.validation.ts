import Joi from 'joi';

export const signinSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({
        tlds: { allow: true } // This will validate top-level domains
      }).required() // Use .required() if the email is a mandatory field
});

export const signupSchema = Joi.object({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().email({
        tlds: { allow: true } // This will validate top-level domains
      }).required() // Use .required() if the email is a mandatory field
});