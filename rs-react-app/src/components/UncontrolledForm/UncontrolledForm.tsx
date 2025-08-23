import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import s from './UncontrolledForm.module.scss';

export function UncontrolledForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (const value of formData.values()) {
      console.log(value);
    }
  };

  return (
    <form action="" onSubmit={handleSubmit} className={s.form}>
      <Input type="text" name="name" children="Name" />
      <Input type="text" name="age" children="Age" />
      <Input type="email" name="email" children="Email" />
      <Input type="password" name="password" children="Password" />
      <div>
        <Input
          id="female"
          type="radio"
          name="gender"
          htmlFor="female"
          children="Female"
        />
        <Input
          id="male"
          type="radio"
          name="gender"
          htmlFor="male"
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
      />
      <div>
        <Input
          id="country"
          type="text"
          name="image"
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
