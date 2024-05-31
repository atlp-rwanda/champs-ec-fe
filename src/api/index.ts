import request, { api_base_url } from './axios';

export const googleLogin = () => {
  window.location.href = `${api_base_url}/users/google`;
};
