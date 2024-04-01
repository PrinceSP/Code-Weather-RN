import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import {Checkbox} from '../../../components';

describe('CheckBox Component',()=>{
  const updateFunction = jest.fn();
  const mockLabel = "Passed"
  const mockBoolean = true
  const eventData = {
    personal_feeling:false,
    own_station:false,
    local_weather:false,
    global_weather:false,
    other:false
  }

  it('renders correctly when checked',()=>{
    const component = render(
      <Checkbox label={mockLabel} onChange={updateFunction} checked={mockBoolean}/>
    )
    expect(screen.getByText(mockLabel)).toBeTruthy();
    expect(component).toMatchSnapshot()
  })

  it('renders correctly when unchecked',()=>{
    const component = render(
      <Checkbox label={mockLabel} onChange={()=>{}} checked={false}/>
    )
    expect(screen.getByText(mockLabel)).toBeTruthy();
    expect(component).toMatchSnapshot()
  })

  it('invokes onChange when pressed',()=>{
    const component = render(
      <Checkbox label={mockLabel} onChange={updateFunction} checked={mockBoolean}/>
    )
    fireEvent.press(screen.getByText(mockLabel),eventData)
    expect(updateFunction).toHaveBeenCalledWith(eventData)
  })

})
