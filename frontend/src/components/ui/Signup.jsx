import React from 'react';
import { Label } from './label';
import { Input } from './input';

const Signup = () => {
  return (
    <div>
      <form action="">
        <div>
          <Label>Full Name</Label>
          <Input type="text" name="fullname" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" />
        </div>    
      </form>
    </div>
  );
}

export default Signup;
