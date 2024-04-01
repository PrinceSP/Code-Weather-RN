import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {SearchHeader} from '../../../components';

describe('SearchHeader',()=>{
  const updateFunction = jest.fn();
  const mockTitle = "Search"

  it('renders correctly', () => {
    const componentRender = render(
      <SearchHeader updateModal={updateFunction} updateQuery={updateFunction} />
    );
    expect(componentRender).toMatchSnapshot();
  });

  it('should update query correctly when typing in TextInput', () => {
    const { getByPlaceholderText } = render(
      <SearchHeader updateModal={() => {}} updateQuery={updateFunction} />
    );
    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'test query');
    expect(updateFunction).toHaveBeenCalledWith('test query');
  });
})
