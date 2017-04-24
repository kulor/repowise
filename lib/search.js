import algoliasearch from 'algoliasearch'
import algoliaConfig from '../config/algolia'
const client = algoliasearch(algoliaConfig.APP_ID, algoliaConfig.API_KEY)
const index = client.initIndex('packages4')

const search = (query, cb) => {
  return index.search(query, cb)
}

export default search
