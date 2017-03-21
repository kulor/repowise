
import db from './db'

export default async (id) => {
  const item = await db
    .child(id)
    .once('value')
  const val = item.val()
  if (val) {
    return val
  } else {
    return null
  }
}