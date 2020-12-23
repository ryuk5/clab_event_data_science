import React from "react";
import Input from "./Input";
import useRegister from "./useRegister";
import { useState } from 'react';

import api from "../api";
import axios from 'axios';

const Register = () => {
  const { handleChange, values } = useRegister();
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const registerUser = async (payload) =>{
    return await api.post("/", payload)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values)
    axios.post('/api/users', values)
      // Server raja3 response 200 => ya3ni jawék béhi
      .then(res => {
        setSuccess("Registration is done successfully")
        setError(null)
      })
      // Server raja3lék error
      .catch(err => {
        setError(err.response.data)
        setSuccess(null)
      })
    // const response = registerUser(values);
    // console.log(response);
    // document.getElementById("button").click();
  }

  return (
    <form
      className="animate__animated animate__fadeInUp"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Full Name"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <button type="submit" className="fa fa-paper-plane-o submit"></button>
      <Input
        placeholder="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />

      { error ? (<h5 style={{ color: 'red', fontSize: "30px" }}>{error.msg}</h5>) :
        (<h5 style={{ color: 'green', fontSize: "30px" }}>{success}</h5>) }
    </form>
  );
};

export default Register;
