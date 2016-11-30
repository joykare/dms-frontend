import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import SignUp from '../../../client/components/Auth/SignUp';
import TextField from 'material-ui/TextField';

describe('Signup form', () => {
  const props = {
    auth: {
      isAuthenticated: true,
      isFetching: false,
      credentials: {
        email: 'jwarugu@gmail.com',
        password: 'password'
      },
      validations: {
        isValid: true,
        errorMessage: {}
      },
      error: {}
    },
    onSignup: () => Promise.resolve(),
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve()
  };
  it('renders four text fields', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find(TextField)).to.have.length(4);
  });
  it('renders a username text field', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find('.username')).to.have.length(1);
  });

  it('renders a email field', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find('.email')).to.have.length(1);
  });

  it('renders a password text field', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find('.password')).to.have.length(1);
  });

  it('renders a confirmPassword field', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find('.confirmPassword')).to.have.length(1);
  });

  it('renders a sign up button', () => {
    const wrapper = shallow(<SignUp {...props}/>);
    expect(wrapper.find('.signupButton')).to.have.length(1);
  });
});
