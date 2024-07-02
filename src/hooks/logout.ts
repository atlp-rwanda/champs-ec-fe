import { showToast } from '@/helpers/toast';
import request from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

const Logout = () => {
  const mutation = useMutation({
    mutationFn: () => {
      return request.post('/users/logout', {});
    },
    onError: (error) => console.log(error),
    onSuccess: () => {
      localStorage.clear();
      showToast('SuccesFully signed out', 'success');
      window.location.href = '/auth/login';
    },
  });
  const mutate = mutation.mutate;
  const pending = mutation.isPending;
  return {
    mutate,
    pending,
  };
};

export default Logout;
