import moment, { Moment } from 'moment'
import * as React from 'react'
import { View } from 'react-native'
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
import { DayOfWeek, Navigation, RecurrencyType, Task } from '~planner/types'
import { getShiftForTime, times } from '~planner/utils'

export const CreateTaskModal: React.FC<Navigation> = ({ navigation }) => {
  const activeDay = navigation.getParam('activeDay') as Moment
  const tasksContainer = useContainer(taskContainer)
  const taskId = navigation.getParam('taskId') as string
  const task = taskId ? (tasksContainer.getTask(taskId) as Task) : ({} as Task)

  const [name, setName] = React.useState(task.name || '')
  const [description, setDescription] = React.useState(task.description || '')
  const [repetitions, setRepetitions] = React.useState(task.repetitions || 1)
  const [startTime, setStartTime] = React.useState<Date | undefined>(new Date())
  const [endTime, setEndTime] = React.useState<Date | undefined>(new Date())
  const [date] = React.useState(activeDay || moment())
  const [recurrency, setRecurrency] = React.useState(
    task.recurrencyType === RecurrencyType.TIMES_PER_WEEK ? task.recurrency : 0
  )
  const [daysRecurrency, setDaysRecurrency] = React.useState(
    (task.recurrencyType === RecurrencyType.WEEK_DAYS ? task.recurrency : []) as DayOfWeek[]
  )
  const [monthlyRecurrency, setMonthlyRecurrency] = React.useState(
    (task.recurrencyType === RecurrencyType.MONTHLY ? task.recurrency : []) as number[]
  )
  const [recurrencyType, setRecurrencyType] = React.useState(
    task.recurrencyType || RecurrencyType.NONE
  )

  const getRecurrency = () => {
    if (recurrencyType === RecurrencyType.WEEK_DAYS) {
      return daysRecurrency
    } else if (task.recurrencyType === RecurrencyType.MONTHLY) {
      return monthlyRecurrency
    }
    return recurrency
  }

  const onSubmit = () => {
    if (!name || moment(endTime).diff(moment(startTime), 'minutes') < 15) {
      return
    }

    const baseTask = {
      name,
      description,
      repetitions,
      shift: getShiftForTime(moment(startTime)),
      date,
      startTime: moment(startTime),
      endTime: moment(endTime),
      recurrencyType,
      recurrency: getRecurrency(),
    }

    if (taskId) {
      tasksContainer.updateTask(task.id, { ...task, ...baseTask }).then(() => navigation.goBack())
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
          label={'Start Time'}
          type={InputType.DATE_PICKER}
          value={startTime as Date}
          onChange={(_, time) => setStartTime(time)}
        />

        <Input
          label={'End Time'}
          type={InputType.DATE_PICKER}
          value={endTime as Date}
          onChange={(_, time) => setEndTime(time)}
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
              label: 'Times/Week',
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
            {
              label: 'Monthly',
              value: RecurrencyType.MONTHLY,
              onSelected: () => setMonthlyRecurrency([] as number[]),
              children: (
                <Row justifyContent="flex-start" flexWrap="wrap">
                  {times(31, index => {
                    const day = index + 1
                    const selected = monthlyRecurrency.includes(day)
                    return (
                      <DayButton
                        key={day}
                        m="3px"
                        onPress={() =>
                          setMonthlyRecurrency(r =>
                            selected ? r.filter(d => d !== day) : [...r, day]
                          )
                        }
                        alt={selected}
                      >
                        <BaseText alt={selected}>{day}</BaseText>
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

        <View style={{ height: 50 }} />
      </ScreenWrapper>
    </ModalWrapper>
  )
}
