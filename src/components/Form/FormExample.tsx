import React, { useState } from 'react';
import { z } from 'zod';

const formDataSchema = z.object({
  name: z.string().nonempty().min(3).max(50),
  email: z.string().nonempty().email(),
  phone: z.string().nonempty().regex(/^\d+$/).min(10).max(10),
});

type FormData = z.infer<typeof formDataSchema>;

const initialFormState: FormData = {
  name: '',
  email: '',
  phone: '',
};

const Form = () => {
  const [userFormData, setUserFormData] = useState<Partial<FormData>>({});
  const [isError, setIsError] = useState(false);

  const serverData = {
    name: 'John',
    email: 'john@example.com',
    phone: '1234567890',
  };

  const formData = {
    ...initialFormState,
    ...serverData,
    ...userFormData,
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    if (errors) {
      setIsError(true);
      return;
    }

    console.log(formData);
  };

  const validate = () => {
    const res = formDataSchema.safeParse(formData);

    if (res.success) {
      return undefined;
    }

    return res.error.format();
  };

  const errors = isError ? validate() : undefined;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            value={formData.name}
            onChange={(e) => setUserFormData((data) => ({ ...data, name: e.target.value }))}
          />
          <div style={{ color: 'red' }}>{errors?.name?._errors.join(',')}</div>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            value={formData.email}
            onChange={(e) => setUserFormData((data) => ({ ...data, email: e.target.value }))}
          />
          <div style={{ color: 'red' }}>{errors?.email?._errors.join(',')}</div>
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={(e) => setUserFormData((data) => ({ ...data, phone: e.target.value }))}
          />
          <div style={{ color: 'red' }}>{errors?.phone?._errors.join(',')}</div>
        </div>
        <button type="submit" disabled={!!errors}>
          999
        </button>
      </form>
    </div>
  );
};

export default Form;
