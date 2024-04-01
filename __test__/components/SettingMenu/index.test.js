import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import {SettingMenu} from '../../../components';

describe('SettingMenu', () => {
  const mockNavigation = jest.fn();
  const mockScreen = 'MockScreen';
  const mockTitle = 'Mock Title';

  it('renders correctly', () => {
    const { getByText } = render(
      <SettingMenu navigation={{ navigate: mockNavigation }} screen={mockScreen} title={mockTitle} />
    );
    expect(getByText(mockTitle)).toBeTruthy();
  });

  it('navigates when pressed', () => {
    const { getByText } = render(
      <SettingMenu navigation={{ navigate: mockNavigation }} screen={mockScreen} title={mockTitle} />
    );
    fireEvent.press(getByText(mockTitle));
    expect(mockNavigation).toHaveBeenCalledWith(mockScreen);
  });
});
