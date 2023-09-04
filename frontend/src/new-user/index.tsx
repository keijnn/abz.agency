import { useState } from "react";



export function CreateNewUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    image: null,
  });

  const [answer, setAnswer] = useState('')

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('position_id', formData.position_id);
    // @ts-ignore
    formDataToSend.append('image', formData.image);


    try {
      const getToken = await fetch(process.env.REACT_APP_URL + '/token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }})
      const token = await getToken.text()
      const response = await fetch(process.env.REACT_APP_URL + '/auth', {
        method: 'POST',
        headers: {
          'token': token
        },
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setAnswer('Good!')
      } else {
        console.error('Form submission failed');
        setAnswer('Bad!')
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setAnswer('Error!')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="position_id">Position ID:</label>
        <input
          type="number"
          id="position_id"
          name="position_id"
          value={formData.position_id}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      <h1>Status: {answer}</h1>
    </form>
  );
}