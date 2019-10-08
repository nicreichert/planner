import {
  BaseText,
  Button,
  DayButton,
  Icon,
  IconType,
  Input,
  InputType,
  Row,
  ScreenWrapper,
  SmallText,
  Tabs,
} from '@planner/components';
import { colors, weekDays } from '@planner/constants';
import { taskContainer } from '@planner/data/tasks';
import { useContainer } from '@planner/hooks';
import { DayOfWeek, Navigation, RecurrencyType, Shift } from '@planner/types';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import uuid from 'uuid';

export const CreateTaskModal: React.FC<Navigation> = ({ navigation }) => {
  const activeDay = navigation.getParam('activeDay') as Moment;

  const tasksContainer = useContainer(taskContainer);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [repetitions, setRepetitions] = React.useState(1);
  const [shift, setShift] = React.useState<Shift>(Shift.MORNING);
  const [date, setDate] = React.useState(activeDay || moment());
  const [recurrency, setRecurrency] = React.useState(0);
  const [daysRecurrency, setDaysRecurrency] = React.useState([] as DayOfWeek[]);
  const [recurrencyType, setRecurrencyType] = React.useState(RecurrencyType.NONE);

  const onSubmit = () => {
    if (!name) {
      return;
    }

    tasksContainer
      .addTask({
        id: uuid(),
        completed: [],
        name,
        notes: [],
        description,
        repetitions,
        completedRepetitions: 0,
        shift,
        date,
        recurrencyType,
        recurrency: recurrencyType === RecurrencyType.WEEK_DAYS ? daysRecurrency : recurrency,
      })
      .then(() => navigation.goBack());
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => navigation.goBack()}>
        <Icon type={IconType.CLOSE} size={30} color={colors.primary} />
      </TouchableOpacity>

      <Input type={InputType.TEXT} label={'Task'} value={name} onChangeText={setName} />

      <Input
        type={InputType.TEXT}
        label={'Description'}
        value={description}
        onChangeText={setDescription}
      />

      <Input
        type={InputType.NUMBER}
        label={'Repetitions'}
        keyboardType="number-pad"
        value={repetitions.toString()}
        onChangeNumber={setRepetitions}
      />

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

      <SmallText mb={10}>Recurrency</SmallText>
      <Tabs<RecurrencyType>
        tabs={[
          {
            label: 'None',
            value: RecurrencyType.NONE,
            onSelected: () => setRecurrency(0),
            children: null,
          },
          {
            label: 'Times Per Week',
            value: RecurrencyType.TIMES_PER_WEEK,
            onSelected: () => setRecurrency(0),
            children: (
              <Input
                mt={10}
                type={InputType.NUMBER}
                label="Amount of times"
                value={typeof recurrency === 'number' ? recurrency.toString() : '0'}
                onChangeNumber={t => setRecurrency(t)}
              />
            ),
          },
          {
            label: 'Week Days',
            value: RecurrencyType.WEEK_DAYS,
            onSelected: () => setDaysRecurrency([]),
            children: (
              <Row justifyContent="space-between">
                {weekDays.map(day => {
                  const dayOfWeek = day.substring(0, 3) as DayOfWeek;
                  const selected = daysRecurrency.includes(dayOfWeek);
                  return (
                    <DayButton
                      key={dayOfWeek}
                      onPress={() =>
                        setDaysRecurrency(r =>
                          selected ? r.filter(d => d !== dayOfWeek) : [...r, dayOfWeek]
                        )
                      }
                      alt={selected}
                    >
                      <BaseText alt={selected}>{dayOfWeek}</BaseText>
                    </DayButton>
                  );
                })}
              </Row>
            ),
          },
        ]}
        activeTab={recurrencyType}
        onChange={setRecurrencyType}
      />
      <Button mt={20} label={'Create Task'} onPress={onSubmit} />
    </ScreenWrapper>
  );
};
