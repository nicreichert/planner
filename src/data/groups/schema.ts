export const groupSchema = {
  title: 'group schema',
  version: 0,
  description: 'describes a group',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
  },
  required: ['name'],
}
