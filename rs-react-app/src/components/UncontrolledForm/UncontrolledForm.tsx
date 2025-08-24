import { useDispatch } from 'react-redux';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import s from './UncontrolledForm.module.scss';
import { formSlice, type InitialState } from '../../app/formSlice';
import { fileReader } from '../../helper/fileReader';
import { CountriesInput } from '../CountriesInput/CountriesInput';

type UncontrolledFormProps = {
  onSubmitSuccess: () => void;
};

export function UncontrolledForm({ onSubmitSuccess }: UncontrolledFormProps) {
  const dispatch = useDispatch();
  const setFormData = formSlice.actions.setFormData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const filtered: InitialState = {
      name: '',
      age: 0,
      email: '',
      gender: '',
      accept: false,
      image: null,
      country: '',
    };

    filtered.name = (formData.get('name') as string) || '';
    filtered.age = Number(formData.get('age') || 0);
    filtered.email = (formData.get('email') as string) || '';
    filtered.gender = (formData.get('gender') as string) || '';
    filtered.accept = formData.get('accept') === 'on';
    filtered.country = (formData.get('country') as string) || '';

    const fileInput = formData.get('image');
    filtered.image =
      fileInput instanceof File ? await fileReader(fileInput) : null;

    dispatch(setFormData(filtered));
    onSubmitSuccess();
  };

  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      className={s.form}
    >
      <Input type="text" name="name" children="Name" />
      <Input type="text" name="age" children="Age" />
      <Input type="email" name="email" children="Email" />
      <Input type="password" name="password" children="Password" />
      <Input
        type="password"
        name="confirmPassword"
        children="Confirm password"
      />
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
