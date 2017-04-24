import Link from 'next/link'
import Head from 'next/head'

const getColourForSize = (bytes) => {
  if(bytes >= 200000) return 'red'
  if(bytes >= 60000) return 'orange'
  if(bytes >= 15000) return 'yellow'
  return 'green'
}

const getAssetsForVersion = (pkg, version) => {
  return pkg.assets.filter(asset => {
    return asset.version === version
  })
}

const getAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.version)
  if(!assets[0]) {
    return null
  }

  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.filename
  })

  return asset[0]
}

const getFullAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.version)
  if(!assets[0]) {
    return null
  }

  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.filename.replace('.min', '')
  })

  return asset[0]
}

const getPackageFullSize = (pkg) => {
  const asset = getFullAsset(pkg)
  if(asset) {
    return asset.size.uncompressed
  }
}

const getMinifiedSize = (pkg) => {
  const asset = getAsset(pkg)
  if(asset) {
    return asset.size.uncompressed
  }
}

const getMinifiedAndGzippedSize = (pkg) => {
  const asset = getAsset(pkg)
  if(asset) {
    return asset.size.compressed
  }
}

const formatBytes = (bytes, decimals) => {
   if(bytes == undefined) return '--'
   if(bytes == 0) return '0 Bytes'
   var k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k))
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const VersionFiles = ({pkg}) => (
  <div className="version-files">
    {pkg.assets.map(asset => (
      <div className="version-files" key={asset.version}>
        <h4>{asset.version}</h4>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Compressed</th>
              <th>Full</th>
            </tr>
          </thead>
          <tbody>
            {asset.sizes.map(size => (
              <tr key={size.file}>
                <th><a href={`https://cdnjs.cloudflare.com/ajax/libs/${pkg.name}/${asset.version}/${size.file}`}>{size.file}</a></th>
                <td><span className={`size-colour size-colour-${getColourForSize(size.size.compressed)}`}>{formatBytes(size.size.compressed, 0)}</span></td>
                <td>{formatBytes(size.size.uncompressed, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))}
  </div>
)


export default ({ pkg, withVersions=false }) => (
  <div className="card">
    <h3>
      <Link href={`/pkg?id=${pkg.name}`} as={`/package/${pkg.name}`}>
        <a>{pkg.name}</a>
      </Link>
      <span className="card-version" title="Version of package when sizes snapshot was taken">{pkg.version}</span>
    </h3>
    <p>{pkg.description}</p>

    <table className="size-summary-table">
      <thead>
        <tr>
          <th>Min + Gzip</th>
          <th>Min</th>
          <th>Full</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td><span className={`size-colour size-colour-${getColourForSize(getMinifiedAndGzippedSize(pkg))}`}>{formatBytes(getMinifiedAndGzippedSize(pkg), 0)}</span></td>
          <td>{formatBytes(getMinifiedSize(pkg), 0)}</td>
          <td>{formatBytes(getPackageFullSize(pkg), 0)}</td>
        </tr>
      </tbody>
    </table>

    {withVersions && <VersionFiles pkg={pkg} />}
  </div>
)
