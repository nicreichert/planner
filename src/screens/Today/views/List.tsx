import { Moment } from 'moment'
import * as React from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { TaskList } from '~planner/components'
import { selectTasksForDay } from '~planner/data'
import { Task } from '~planner/types'
import { createSections } from '../helpers'

interface Props {
  activeDay: Moment
  tasks: Task[]
}

export const List = ({ activeDay, tasks }: Props) => {
  const { navigate } = useNavigation()
  return (
    <TaskList
      onOpenTaskDetails={(task: Task) =>
        navigate('TaskDetailsModal', { taskId: task.id, activeDay })
      }
      sections={createSections(selectTasksForDay(tasks, activeDay), activeDay)}
    />
  )
}
