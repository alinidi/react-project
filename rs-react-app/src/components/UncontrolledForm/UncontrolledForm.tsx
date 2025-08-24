import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import s from './UncontrolledForm.module.scss';
import { formSlice, type InitialState } from '../../app/formSlice';
import { fileReader } from '../../helper/fileReader';
import { CountriesInput } from '../CountriesInput/CountriesInput';

export function UncontrolledForm() {
  const dispatch = useDispatch();
  const setFormData = formSlice.actions.setFormData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const filtered: InitialState = {
      name: '',
      age: 0,
      email: '',
      gender: '',
      accept: false,
      image: null,
      country: '',
    };

    for (const key of Object.keys(values) as (keyof InitialState)[]) {
      const val = values[key];
      if (key === 'accept') {
        filtered[key] = val === 'on';
      } else if (key === 'image') {
        filtered[key] = val instanceof File ? await fileReader(val) : null;
      } else if (key === 'gender') {
        const gender = formData.get('gender');
        filtered.gender = gender ? (gender as string) : '';
      } else if (key === 'age') {
        filtered.age = Number(val);
      } else {
        filtered[key] = val as string;
      }
    }

    dispatch(setFormData(filtered));
  };

  return (
    <form
      action=""
      onSubmit={(e) => async () => {
        e.preventDefault();
        await handleSubmit(e);
      }}
      className={s.form}
    >
      <Input type="text" name="name" children="Name" />
      <Input type="text" name="age" children="Age" />
      <Input type="email" name="email" children="Email" />
      <Input type="password" name="password" children="Password" />
      <Input type="password" name="password" children="Confirm password" />
      <div>
        <Input
          id="female"
          type="radio"
          name="gender"
          htmlFor="female"
          value="female"
          children="Female"
        />
        <Input
          id="male"
          type="radio"
          name="gender"
          htmlFor="male"
          value="male"
          children="Male"
        />
      </div>
      <div>
        <Input
          id="accept"
          type="checkbox"
          name="accept"
          htmlFor="accept"
          children="Accept Terms and Conditions agreement"
        />
      </div>
      <Input
        type="file"
        name="image"
        htmlFor="accept"
        placeholder="Upload image"
        children="Upload image"
      />
      <div>
        <CountriesInput
          id="country"
          type="text"
          name="country"
          htmlFor="country"
          children="Country"
        />
      </div>
      <Button onClick={() => {}} type="submit">
        Submit
      </Button>
    </form>
  );
}
