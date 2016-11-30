import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Login from '../../../client/components/Auth/LogIn';
import TextField from 'material-ui/TextField';

describe('Login form', () => {
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
    onLogin: () => Promise.resolve(),
    onChange: () => Promise.resolve(),
    onBlur: () => Promise.resolve(),
    reset: () => Promise.resolve(),
  };
  it('renders two text fields', () => {
    const wrapper = shallow(<Login {...props}/>);
    expect(wrapper.find(TextField)).to.have.length(2);
  });
  it('renders a email text field', () => {
    const wrapper = shallow(<Login {...props}/>);
    expect(wrapper.find('.email')).to.have.length(1);
  });

  it('renders a password field', () => {
    const wrapper = shallow(<Login {...props}/>);
    expect(wrapper.find('.password')).to.have.length(1);
  });

  it('renders a log in button', () => {
    const wrapper = shallow(<Login {...props}/>);
    expect(wrapper.find('.loginButton')).to.have.length(1);
  });
});
