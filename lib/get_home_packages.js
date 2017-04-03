import {packages2} from './db'

export default async (id) => {
  const item = await packages2
    // .orderByChild('featured')
    // .startAt(true).endAt(true)
    .orderByChild("version")
    .limitToFirst(50)
    .once('value')
  const val = item.val()
  if (val) {
    return val
  } else {
    return null
  }
}
