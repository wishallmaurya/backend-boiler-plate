import * as Yup from "yup";

export const userValidSchema = Yup.object({
  // phone: Yup.string().matches(
  //   /^([+]\d{2})?\d{10}$/,"Invalid Phone Number").required(),
  email:Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null],"Password not Matched"),

});


export const loginValidSchema = Yup.object({
  // phone: Yup.string().matches(
  //   /^([+]\d{2})?\d{10}$/,"Invalid Phone Number").required(),
  email:Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export const editProfileValidSchema = Yup.object({
  name:Yup.string().min(3).notRequired(),
  username:Yup.string().min(3).notRequired(),
  bio:Yup.string().notRequired(),
  city:Yup.string().notRequired(),
  isBusiness:Yup.boolean().notRequired(),
  email:Yup.string().email().notRequired(),
  phone: Yup.string().matches(
    /^([+]\d{2})?\d{10}$/,"Invalid Phone Number").notRequired(),
  gender:Yup.mixed().oneOf(['male', 'female','others']).notRequired(),
  interest:Yup.string().notRequired(),
  hobbies:Yup.string().notRequired(),
});
export const changePasswordValidSchema = Yup.object({
  oldPassword: Yup.string().min(6).required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null],"Password not Matched"),
});
export const profilePhotoValidSchema = Yup.object({
  profilePhoto: Yup.string().url().required(),
});


// export const privacyValidSchema = Yup.object({
//   pollType:Yup.mixed().oneOf(['everyone', 'friends']).notRequired(),
//   messageType:Yup.mixed().oneOf(['everyone', 'friends']).notRequired(),
//   commentType:Yup.mixed().oneOf(['everyone', 'friends']).notRequired(),
//   storyType:Yup.mixed().oneOf(['everyone', 'friends']).notRequired(),
// });











