jest.useFakeTimers();
import 'react-native-gesture-handler';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

describe('<App />', () => {
  const tree = renderer.create(<App />).toJSON();

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});
