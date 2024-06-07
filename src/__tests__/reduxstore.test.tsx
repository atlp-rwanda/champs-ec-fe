import { useAppSelector, store, RootState } from '@/redux/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
const TestComponent = () => {
  const state = useAppSelector((state: RootState) => state.auth);
  return <div data-testid="auth-state">{JSON.stringify(state)}</div>;
};

describe('the store redux test', () => {
  it('connected succefull', () => {
    const stor = store.getState();
    expect(stor).toBeDefined();
  });
});

describe('testing useAppSelector', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <TestComponent />
    </Provider>,
  );

  const authState = getByTestId('auth-state');
  expect(authState).toBeDefined();
});
