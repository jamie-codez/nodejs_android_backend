//Validation
const Joi = require('@hapi/joi');

//register validation
const registrationValidation = (data) => {
    const schema = Joi.object( {
        name:Joi.string().min(6).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
        imageUrl:Joi.string().min(6).required()
    });
    return schema.validate(data);
};
//login validation
const loginValidation = (data) =>  {
    const schema = Joi.object( {
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    });
    return schema.validate(data);
};
//post validation
const postValidation = (data) => {
    const  schema = Joi.Object({
        title:Joi.string().min(6).required(),
        description:Joi.string().min(6).required(),
        mediaUrl:Joi.string()
    });
    return schema.validate(data);
};
const notificationValidation = (data) => {
    const schema = Joi.Object({
        title:Joi.string().min(6).required(),
        description:Joi.string().required().min(6),
        notify:Joi.boolean().required(),
        notificationDate:Joi.string().required(),
        notificationTime:Joi.string().required()
    });
}


module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.notificationValidation = notificationValidation;

