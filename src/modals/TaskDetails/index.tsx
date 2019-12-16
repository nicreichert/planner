import { Moment } from 'moment'
import * as React from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import {
  BaseText,
  DayButton,
  Icon,
  IconType,
  MediumText,
  ModalWrapper,
  Row,
  ScreenWrapper,
  SmallText,
} from '~planner/components'
import { colors, weekDays } from '~planner/constants'
import { taskContainer } from '~planner/data'
import { useContainer } from '~planner/hooks'
import { DayOfWeek, Navigation, RecurrencyType, Task } from '~planner/types'
import { EU_FORMAT } from '~planner/utils'

export const TaskDetails: React.FC<Navigation> = ({ navigation }) => {
  const tasks = useContainer(taskContainer)
  const taskId = navigation.getParam('taskId') as string
  const activeDay = navigation.getParam('activeDay') as Moment
  const task = tasks.getTask(taskId) as Task

  const handleDelete = () => {
    Alert.alert('Are you sure you want to delete?', 'This action is not reversible.', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          tasks.removeTask(task.id)
          navigation.goBack()
        },
      },
    ])
  }

  const handleEdit = () => {
    navigation.navigate('CreateTaskModal', { taskId, activeDay: task.date })
  }

  return (
    <ModalWrapper title={task.name}>
      <ScreenWrapper>
        <Row mt={20} alignItems="center">
          <MediumText>{task.description}</MediumText>
          <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }} onPress={handleDelete}>
            <Icon type={IconType.TRASH} size={25} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <Icon type={IconType.EDIT} size={25} color={colors.primary} />
          </TouchableOpacity>
        </Row>

        {task.recurrencyType !== RecurrencyType.NONE ? (
          <MediumText my={20}>Recurrency:</MediumText>
        ) : null}

        {task.recurrencyType === RecurrencyType.WEEK_DAYS ? (
          <Row justifyContent="flex-start">
            {weekDays.map(day => {
              const dayOfWeek = day.substring(0, 3) as DayOfWeek
              const selected = (task.recurrency as DayOfWeek[]).includes(dayOfWeek)
              return (task.recurrency as DayOfWeek[]).includes(day.substring(0, 3) as DayOfWeek) ? (
                <DayButton key={dayOfWeek} alt={selected} mr={10} disabled>
                  <BaseText alt={selected}>{dayOfWeek}</BaseText>
                </DayButton>
              ) : null
            })}
          </Row>
        ) : task.recurrencyType === RecurrencyType.TIMES_PER_WEEK ? (
          <MediumText>{task.recurrency} times per week</MediumText>
        ) : null}

        <Row my={20} justifyContent="space-between">
          <MediumText>Notes for {activeDay.format(EU_FORMAT)}:</MediumText>
          <TouchableOpacity onPress={() => tasks.addNote(taskId, 'Test note', activeDay)}>
            <Icon type={IconType.PLUS} size={25} color={colors.primary} />
          </TouchableOpacity>
        </Row>

        {task.notes
          .filter(note => note.date.isSame(activeDay, 'day'))
          .map(note => (
            <Row my={'5px'} key={note.id} justifyContent="space-between">
              <SmallText>{note.text}</SmallText>

              <TouchableOpacity style={{ marginLeft: 'auto', marginRight: 10 }}>
                <Icon type={IconType.TRASH} size={25} color={colors.primary} />
              </TouchableOpacity>
            </Row>
          ))}
      </ScreenWrapper>
    </ModalWrapper>
  )
}
