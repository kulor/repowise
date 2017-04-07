import {packages2} from './db'
import md5 from 'md5'

export default async (id) => {
  const item = await packages2
    .child(md5(id))
    .once('value')
  const val = item.val()
  if (val) {
    return val
  } else {
    return null
  }
}
