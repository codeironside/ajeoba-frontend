import call from '../../API';
import { PASSWORD_ENCRYPTION_SECRET } from '../../Constant/AppConstant';
import { DASHBOARD } from '../../Routes/Routes';
import { encrypt } from '../../Services/localStorageService';
import { showToast } from '../../Services/toast';
export const adminSignIn = (data, navigate) => {
  return (dispatch) => {
    call({
      method: 'post',
      endpoint: 'api/public/users/login',
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast('Signed in successfully', 'success');
          localStorage.setItem('token', res.headers.authorization);
          const stringData = JSON.stringify(res.body.data);
          localStorage.setItem(
            'user',
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          navigate(DASHBOARD);
        }
      })
      .catch((err) => {
        showToast(err.message, 'error');
      });
  };
};
