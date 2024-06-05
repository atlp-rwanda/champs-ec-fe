import {
  welcomeSlice,
  welcomeReducer,
  setWelcomeState,
  IAuthState,
} from '@/redux/slices/welcomeSlice';

describe('welcome slice test', () => {
  const initialstate: IAuthState = {
    message: 'welcome to champs Redux setup',
  };
  it('should return initial state', () => {
    expect(welcomeReducer(undefined, { type: 'unknown' })).toEqual(
      initialstate,
    );
  });
  it('set new state',()=>{
    const newstate=welcomeReducer(initialstate,setWelcomeState("new welcome message"))
    expect(newstate.message).toEqual('new welcome message')
  })
});
