import db from './db'

export default async (id) => {
  const item = await db
    .orderByChild('featured')
    .startAt(true).endAt(true)
    .once('value')
  const val = item.val()
  if (val) {
    return val
  } else {
    return null
  }
}