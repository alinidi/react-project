import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Input } from '../Input/Input';
import { CountriesInput } from '../CountriesInput/CountriesInput';
import { Button } from '../Button/Button';
import s from './ReactHookForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../helper/validationSchema';

type Inputs = {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  accept: boolean;
  image: FileList;
  country: string;
};

export function ReactHookForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <Input
        type="text"
        {...register('name', { required: 'Please enter your name' })}
        children="Name"
        errorMessage={errors.name?.message as string}
      />
      <Input
        type="text"
        {...register('age', { required: 'Please enter your age' })}
        children="Age"
        errorMessage={errors.age?.message as string}
      />
      <Input
        type="email"
        {...register('email', { required: 'Please enter your email' })}
        children="Email"
        errorMessage={errors.email?.message as string}
      />
      <Input
        type="password"
        {...register('password', {
          required: true,
          minLength: { value: 6, message: 'Min length is 6' },
        })}
        children="Password"
        errorMessage={errors.password?.message as string}
      />
      <Input
        type="password"
        {...register('confirmPassword', {
          required: true,
          minLength: { value: 6, message: 'Min length is 6' },
        })}
        children="Confirm password"
        errorMessage={errors.confirmPassword?.message as string}
      />
      <div>
        <Input
          id="female"
          type="radio"
          {...register('gender')}
          htmlFor="female"
          value="female"
          children="Female"
          errorMessage={errors.gender?.message}
        />
        <Input
          id="male"
          type="radio"
          {...register('gender')}
          htmlFor="male"
          value="male"
          children="Male"
        />
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <Input
          id="accept"
          type="checkbox"
          {...register('accept', {
            required: 'Please accept T&C',
          })}
          htmlFor="accept"
          children="Accept Terms and Conditions agreement"
          errorMessage={errors.accept?.message as string}
        />
      </div>
      <Input
        type="file"
        {...register('image')}
        htmlFor="image"
        placeholder="Upload image"
        children="Upload image"
        errorMessage={errors.image?.message as string}
      />
      <div>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CountriesInput
              {...field}
              id="country"
              type="text"
              htmlFor="country"
              children="Country"
              errorMessage={errors.country?.message as string}
            />
          )}
        ></Controller>
      </div>
      <Button onClick={() => {}} type="submit">
        Submit
      </Button>
    </form>
  );
}
