import moment, { Moment } from 'moment'
import * as React from 'react'
import {
  BaseText,
  Button,
  DayButton,
  Input,
  InputType,
  ModalWrapper,
  Row,
  ScreenWrapper,
  SmallText,
  Tabs,
} from '~planner/components'
import { weekDays } from '~planner/constants'
import { taskContainer } from '~planner/data/tasks'
import { useContainer } from '~planner/hooks'
import { DayOfWeek, Navigation, RecurrencyType, Shift, Task } from '~planner/types'

export const CreateTaskModal: React.FC<Navigation> = ({ navigation }) => {
  const activeDay = navigation.getParam('activeDay') as Moment
  const tasksContainer = useContainer(taskContainer)
  const taskId = navigation.getParam('taskId') as string
  const task = taskId ? (tasksContainer.getTask(taskId) as Task) : ({} as Task)

  const [name, setName] = React.useState(task.name || '')
  const [description, setDescription] = React.useState(task.description || '')
  const [repetitions, setRepetitions] = React.useState(task.repetitions || 1)
  const [shift, setShift] = React.useState<Shift>(task.shift || Shift.MORNING)
  const [date, setDate] = React.useState(activeDay || moment())
  const [recurrency, setRecurrency] = React.useState(
    task.recurrencyType === RecurrencyType.TIMES_PER_WEEK ? task.recurrency : 0
  )
  const [daysRecurrency, setDaysRecurrency] = React.useState(
    (task.recurrencyType === RecurrencyType.WEEK_DAYS ? task.recurrency : []) as DayOfWeek[]
  )
  const [recurrencyType, setRecurrencyType] = React.useState(
    task.recurrencyType || RecurrencyType.NONE
  )

  const onSubmit = () => {
    if (!name) {
      return
    }

    const baseTask = {
      name,
      description,
      repetitions,
      shift,
      date,
      recurrencyType,
      recurrency: recurrencyType === RecurrencyType.WEEK_DAYS ? daysRecurrency : recurrency,
    }

    if (taskId) {
      tasksContainer.updateTask(task.id, baseTask).then(() => navigation.goBack())
    } else {
      tasksContainer.addTask(baseTask).then(() => navigation.goBack())
    }
  }

  return (
    <ModalWrapper title={taskId ? 'Edit Task' : 'Create Task'}>
      <ScreenWrapper>
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
              onSelected: () => setDaysRecurrency([] as DayOfWeek[]),
              children: (
                <Row justifyContent="space-between">
                  {weekDays.map(day => {
                    const dayOfWeek = day.substring(0, 3) as DayOfWeek
                    const selected = daysRecurrency.includes(dayOfWeek)
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
                    )
                  })}
                </Row>
              ),
            },
          ]}
          activeTab={recurrencyType}
          onChange={setRecurrencyType}
        />
        <Button mt={20} label={'Save'} onPress={onSubmit} />
      </ScreenWrapper>
    </ModalWrapper>
  )
}
