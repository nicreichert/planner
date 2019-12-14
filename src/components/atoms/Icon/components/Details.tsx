import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { colors } from '~planner/constants'
import { BaseProps } from '../types'

export const Details = ({ width = 50, size, height = 50, color = colors.black }: BaseProps) => (
  <Svg width={size || width} height={size || height} viewBox="0 0 503 503">
    <G fill={color}>
      <Path d="m25.664062 503.605469h318.949219c13.910157 0 25.183594-11.273438 25.183594-25.179688v-33.574219c0-4.632812-3.757813-8.390624-8.394531-8.390624-4.636719 0-8.394532 3.757812-8.394532 8.390624v33.574219c0 4.636719-3.757812 8.394531-8.394531 8.394531h-318.949219c-4.636718 0-8.394531-3.757812-8.394531-8.394531v-453.246093c0-4.636719 3.757813-8.394532 8.394531-8.394532 13.90625 0 25.179688 11.273438 25.179688 25.183594v25.179688c0 9.269531 7.515625 16.785156 16.789062 16.785156h285.375v50.363281c0 4.632813 3.757813 8.390625 8.394532 8.390625 4.636718 0 8.394531-3.757812 8.394531-8.390625v-50.363281h33.570313c9.273437 0 16.789062-7.515625 16.789062-16.785156v-25.179688c-.027344-23.167969-18.800781-41.9414062-41.96875-41.96875h-352.523438c-13.90625 0-25.179687 11.273438-25.179687 25.179688v453.246093c0 13.90625 11.273437 25.179688 25.179687 25.179688zm352.523438-486.820313c13.90625 0 25.179688 11.273438 25.179688 25.183594v25.179688h-335.734376v-25.179688c-.03125-9.113281-3.058593-17.960938-8.613281-25.183594zm0 0" />
      <Path d="m151.566406 159.476562c4.636719 0 8.394532-3.757812 8.394532-8.394531v-16.785156c0-13.910156-11.277344-25.183594-25.183594-25.183594h-67.144532c-13.910156 0-25.183593 11.273438-25.183593 25.183594v67.144531c0 13.90625 11.273437 25.179688 25.183593 25.179688h41.964844c4.636719 0 8.394532-3.757813 8.394532-8.390625 0-4.636719-3.757813-8.394531-8.394532-8.394531h-41.964844c-4.636718 0-8.394531-3.757813-8.394531-8.394532v-67.144531c0-4.636719 3.757813-8.394531 8.394531-8.394531h67.144532c4.636718 0 8.394531 3.757812 8.394531 8.394531v16.785156c0 4.636719 3.757813 8.394531 8.394531 8.394531zm0 0" />
      <Path d="m50.84375 268.589844h58.753906c4.636719 0 8.394532-3.757813 8.394532-8.394532 0-4.632812-3.757813-8.390624-8.394532-8.390624h-58.753906c-4.636719 0-8.394531 3.757812-8.394531 8.390624 0 4.636719 3.757812 8.394532 8.394531 8.394532zm0 0" />
      <Path d="m50.84375 302.164062h58.753906c4.636719 0 8.394532-3.757812 8.394532-8.394531 0-4.632812-3.757813-8.390625-8.394532-8.390625h-58.753906c-4.636719 0-8.394531 3.757813-8.394531 8.390625 0 4.636719 3.757812 8.394531 8.394531 8.394531zm0 0" />
      <Path d="m50.84375 335.738281h58.753906c4.636719 0 8.394532-3.757812 8.394532-8.394531s-3.757813-8.394531-8.394532-8.394531h-58.753906c-4.636719 0-8.394531 3.757812-8.394531 8.394531s3.757812 8.394531 8.394531 8.394531zm0 0" />
      <Path d="m50.84375 369.3125h83.933594c4.636718 0 8.394531-3.757812 8.394531-8.394531s-3.757813-8.394531-8.394531-8.394531h-83.933594c-4.636719 0-8.394531 3.757812-8.394531 8.394531s3.757812 8.394531 8.394531 8.394531zm0 0" />
      <Path d="m134.777344 394.492188c0 4.636718 3.757812 8.394531 8.394531 8.394531h33.574219c4.636718 0 8.394531-3.757813 8.394531-8.394531 0-4.636719-3.757813-8.394532-8.394531-8.394532h-33.574219c-4.636719 0-8.394531 3.757813-8.394531 8.394532zm0 0" />
      <Path d="m50.84375 402.886719h58.753906c4.636719 0 8.394532-3.757813 8.394532-8.394531 0-4.636719-3.757813-8.394532-8.394532-8.394532h-58.753906c-4.636719 0-8.394531 3.757813-8.394531 8.394532 0 4.636718 3.757812 8.394531 8.394531 8.394531zm0 0" />
      <Path d="m50.84375 436.460938h268.589844c4.636718 0 8.394531-3.761719 8.394531-8.394532 0-4.636718-3.757813-8.394531-8.394531-8.394531h-268.589844c-4.636719 0-8.394531 3.757813-8.394531 8.394531 0 4.632813 3.757812 8.394532 8.394531 8.394532zm0 0" />
      <Path d="m338.539062 190.714844c-39.691406-39.652344-103.660156-40.738282-144.671874-2.457032-41.015626 38.285157-44.332032 102.175782-7.503907 144.5 1.4375 1.679688 3.058594 3.425782 4.851563 5.3125 40.746094 40.527344 106.578125 40.527344 147.324218 0 40.542969-40.75 40.542969-106.601562 0-147.355468zm-11.859374 135.480468c-34.113282 33.960938-89.238282 34.035157-123.445313.167969-1.390625-1.476562-2.792969-2.957031-4.136719-4.542969-31.210937-35.777343-28.128906-89.933593 6.9375-121.945312 35.066406-32.007812 89.277344-30.148438 122.070313 4.183594 32.792969 34.335937 32.160156 88.578125-1.425781 122.136718zm0 0" />
      <Path d="m401.691406 364.738281-22.09375-22.09375c36.292969-53.105469 31.34375-124.191406-11.960937-171.753906-1.441407-1.613281-2.96875-3.230469-4.496094-4.757813-54.304687-54.183593-142.222656-54.183593-196.527344 0-8.738281 8.675782-16.242187 18.515626-22.300781 29.242188-3.195312 5.507812-6 11.230469-8.390625 17.128906-20.753906 51.6875-8.664063 110.773438 30.726563 150.152344l1.277343 1.316406c1.054688 1.089844 2.097657 2.175782 3.195313 3.140625 22.921875 20.839844 52.148437 33.429688 83.039062 35.773438 3.558594.316406 7.160156.476562 10.742188.476562 3.585937 0 7.101562-.160156 10.59375-.46875 23.929687-1.78125 46.984375-9.757812 66.894531-23.148437l22.257813 23.785156c-.882813 5.074219.582031 10.273438 3.980468 14.144531l63.882813 72.402344c7.519531 8.484375 18.195312 13.507813 29.527343 13.890625h1.277344c17.082032-.023438 32.371094-10.597656 38.417969-26.574219 6.042969-15.976562 1.582031-34.027343-11.207031-45.351562l-72.394532-63.882813c-4.5-3.949218-10.742187-5.25-16.441406-3.421875zm-27.347656 24.523438-18.539062-19.808594c2.515624-2.207031 5.035156-4.457031 7.34375-6.796875 2.105468-2.097656 4.136718-4.28125 6.152343-6.574219l19.101563 19.105469zm-100.234375-3.164063c-6.191406.542969-12.417969.542969-18.609375 0-27.222656-2.035156-52.984375-13.113281-73.1875-31.476562-.839844-.738282-1.570312-1.527344-2.335938-2.304688l-1.511718-1.554687c-34.621094-34.617188-45.257813-86.546875-27.035156-131.988281 2.125-5.203126 4.613281-10.25 7.445312-15.105469 5.320312-9.425781 11.914062-18.070313 19.589844-25.695313 47.75-47.625 125.039062-47.625 172.789062 0 1.308594 1.320313 2.617188 2.714844 3.871094 4.097656l.058594.066407c39.753906 43.601562 42.652344 109.386719 6.882812 156.3125-3.34375 4.324219-6.957031 8.4375-10.8125 12.3125-3.855468 3.839843-7.945312 7.433593-12.253906 10.761719-18.78125 14.324218-41.332031 22.863281-64.890625 24.574218zm213.503906 75.960938c.285157 10.226562-5.855469 19.542968-15.367187 23.3125-9.511719 3.765625-20.367188 1.183594-27.160156-6.464844l-63.875-72.832031 25.792968-25.371094 72.394532 63.878906c5.074218 4.425781 8.0625 10.777344 8.230468 17.511719zm0 0" />
      <Path d="m264.15625 202.199219c-2.03125-.921875-4.34375-.992188-6.425781-.207031-2.085938.789062-3.773438 2.371093-4.6875 4.402343l-41.96875 92.328125c-1.320313 2.742188-1.054688 5.984375.695312 8.472656 1.75 2.492188 4.710938 3.839844 7.738281 3.523438 3.027344-.316406 5.644532-2.25 6.84375-5.046875l41.96875-92.328125c.929688-2.027344 1.015626-4.34375.234376-6.4375s-2.367188-3.785156-4.398438-4.707031zm0 0" />
      <Path d="m230.859375 202.324219c-1.992187-.996094-4.300781-1.160157-6.410156-.453125-2.113281.703125-3.859375 2.21875-4.855469 4.214844l-25.179688 50.359374c-2.070312 4.148438-.386718 9.191407 3.761719 11.261719 4.148438 2.074219 9.191407.390625 11.261719-3.757812l25.179688-50.359375c.996093-1.992188 1.160156-4.300782.457031-6.414063-.707031-2.113281-2.222657-3.859375-4.214844-4.851562zm0 0" />
    </G>
  </Svg>
)
