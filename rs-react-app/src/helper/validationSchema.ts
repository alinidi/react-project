import * as yup from 'yup';

export const validationSchema = yup
  .object({
    name: yup.string().required(),
    age: yup
      .number()
      .max(100, 'Please enter your real age')
      .positive()
      .integer()
      .required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, 'Min length at least 6 characters')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match'),
    gender: yup.string().required('Please select your gender'),
    accept: yup.boolean().oneOf([true], 'Please accept T&C'),
    image: yup.mixed().required('Please upload an image'),
    country: yup.string().required('Please enter a country'),
  })
  .required();
