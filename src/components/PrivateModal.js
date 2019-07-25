import React from 'react';
import { Redirect } from 'react-router-dom';
import Auth from './Auth';

const PrivateModal = ({ component: Component, ...rest }) => (
  Auth.isAuthenticated === true
    ? <Component {...rest}/>
    : <Redirect to={'/'} />
)

export default PrivateModal;