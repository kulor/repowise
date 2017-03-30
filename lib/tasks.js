import {queueTasksDb} from './db'

export const requestPackage = (packageName) => {
  queueTasksDb.push({'package': packageName});
}
