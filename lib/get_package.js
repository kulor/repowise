import {packagesRef} from './firebase'
import md5 from 'md5'

export default async (id) => {
  const item = await packagesRef
    .child(md5(id))
    .once('value')

  const val = item.val()
  if (val) return val
  return null
}
