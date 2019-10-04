# planner

A simple app to create lists of tasks to be done through different periods of the day, and with different recurrencies.

## Technologies

- `react-native`
- `styled-components`
- `moment`
- `ramda`

## State management

State management implementation is done in a custom way. To avoid complex code, I decided to use a hook approach, using Containers, with API ~stolen from~ inspired by [unstated](https://github.com/jamiebuilds/unstated), however, with no need for context.

- The implementation for the logic can be seen on `./src/hooks/useContainer/index.ts`;
- The implementation of a container can be seen on `./src/data/tasks/container.ts`;
- The usage of such container can be seen, for example, on `./src/screens/Today/index.tsx`;

## Components structure

The structure created inside `./src/components/` folder is an experience I'm doing, based on the [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) concept. The main idea is that the components under `atoms` folder are 100% self contained and extremely simple, while components under `particles` can render components under `atoms` and/or consist on a larger part of UI.

## Remarks

For the purpose of moving forward with development in a fast pace and without depending on any backend services (for the time being), the solution found for storing the tasks was to simply stringify the tasks objects and store it into `AsyncStorage`. I'm not particularly proud of it, but it allows me to focus only on the UI pertinent parts of the logic (filters, sorts, selectors, etc).

## Icons

- https://www.flaticon.com/packs/essential-set-2/1
