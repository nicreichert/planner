export const taskSchema = {
  title: 'task schema',
  version: 0,
  description: 'describes a task',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    completed: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    date: {
      type: 'string',
      format: 'date-time',
    },
    groupId: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    notes: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    recurrencyType: {
      type: 'string',
    },
    recurrency: {
      type: ['number', 'array'],
      items: {
        type: 'string',
      },
    },
    repetitions: {
      type: 'number',
    },
    completedRepetitions: {
      type: 'number',
    },
    shift: {
      type: 'string',
    },
  },
  required: ['name', 'date'],
}
