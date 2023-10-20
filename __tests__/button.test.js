import React from 'react';
import renderer from 'react-test-renderer';
import FlatButton from '../components/UI/AuthFlatButton';

describe('FlatButton Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FlatButton onPress={() => {}}>Hello</FlatButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls the onPress function when pressed', () => {
    const onPressMock = jest.fn();
    const component = renderer.create(<FlatButton onPress={onPressMock}>Press Me</FlatButton>);
    const pressable = component.root.findByType(FlatButton);

    // Simulate a button press by calling the onPress prop
    pressable.props.onPress();

    expect(onPressMock).toHaveBeenCalled();
  });
});
