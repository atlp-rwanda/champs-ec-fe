import { showToast } from '@/helpers/toast';
import request from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
const Logout = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => {
      return request.post('/users/logout', {});
    },
    onError: (error) => console.log(error),
    onSuccess: () => {
      localStorage.clear();
      showToast('Successfully Logged out', 'success');
      router.push('/auth/login');
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
