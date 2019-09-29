import moment from 'moment';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import uuid from 'uuid';
import { Button, Input, InputType, ScreenWrapper } from '../../components';
import { taskContainer } from '../../data/tasks';
import { useContainer } from '../../hooks';
import { Navigation, Shift } from '../../types';

export const CreateTaskModal: React.FC<Navigation> = ({ navigation }) => {
  const tasksContainer = useContainer(taskContainer);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [repetitions, setRepetitions] = React.useState(1);
  const [shift, setShift] = React.useState<Shift>(Shift.MORNING);
  const [date, setDate] = React.useState(moment());
  const [recurrency, setRecurrency] = React.useState([] as string[]);

  const [disabled, setDisabled] = React.useState(true);

  const onSubmit = () => {
    return;

    tasksContainer
      .addTask({
        completed: false,
        id: uuid(),
        name,
        description,
        repetitions,
        shift,
        date,
        recurrency,
      })
      .then(() => navigation.goBack());
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity
        style={{ position: 'absolute', top: 5, right: 5 }}
        onPress={() => navigation.goBack()}
      >
        <Text>X</Text>
      </TouchableOpacity>

      <Input type={InputType.TEXT} mt={20} label={'Name'} value={name} onChangeText={setName} />
      <Input
        type={InputType.TEXT}
        label={'Description'}
        value={description}
        onChangeText={setDescription}
      />
      {/* <Input
        type={InputType.NUMBER}
        label={'Repetitions'}
        keyboardType="number-pad"
        value={repetitions}
        onChangeText={setRepetitions}
      /> */}
      <Input
        type={InputType.PICKER}
        label={'Shift'}
        items={[
          { label: 'Morning', value: Shift.MORNING },
          { label: 'Afternoon', value: Shift.AFTERNOON },
          { label: 'Evening', value: Shift.EVENING },
        ]}
        value={shift}
        onValueChange={setShift}
      />
      {/* <Input value={date} onChangeText={setDate} />
      <Input value={recurrency} onChangeText={setRecurrency} /> */}
      <Input
        label={'Checkbox'}
        type={InputType.CHECKBOX}
        disabled={disabled}
        onChange={setDisabled}
      />

      <Button mt={20} label={'Create Task'} onPress={onSubmit} />
    </ScreenWrapper>
  );
};
