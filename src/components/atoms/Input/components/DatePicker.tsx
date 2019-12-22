import DateTimePicker, { DatePickerOptions } from '@react-native-community/datetimepicker'
import * as React from 'react'
import { View } from 'react-native'
import { InputType } from '../types'

export interface DatePickerInterface extends DatePickerOptions {
  type: InputType.DATE_PICKER
}

export const DatePicker: React.FC<DatePickerOptions> = ({ value, onChange }) => {
  return (
    <View style={{ transform: [{ scale: 0.75 }] }}>
      <DateTimePicker
        style={{}}
        mode="time"
        value={value}
        onChange={onChange}
        is24Hour
        minuteInterval={15}
      />
    </View>
  )
}
