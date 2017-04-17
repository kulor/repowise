import Link from 'next/link'
import Head from 'next/head'

const getColourForSize = (bits) => {
  const bytes = bits * 0.125
  if(bytes >= 200000) return 'red';
  if(bytes >= 60000) return 'orange';
  if(bytes >= 15000) return 'yellow';
  return 'green';
}

const getAssetsForVersion = (pkg, version) => {
  return pkg.assets.filter(asset => {
    return asset.version === version
  })
}

const getAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.lastversion)
  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.mainfile
  })

  return asset[0]
}

const getFullAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.lastversion)

  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.mainfile.replace('.min', '')
  })

  return asset[0]
}

const getPackageFullSize = (pkg) => {
  const asset = getFullAsset(pkg)
  if(asset) {
    return asset.size.uncompressed;
  }
}

const getMinifiedSize = (pkg) => {
  const asset = getAsset(pkg)
  if(asset) {
    return asset.size.uncompressed;
  }
}

const getMinifiedAndGzippedSize = (pkg) => {
  const asset = getAsset(pkg)
  if(asset) {
    return asset.size.compressed;
  }
}

const formatBytes = (bytes, decimals) => {
   if(bytes == undefined) return '--';
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
/*

  */
export default ({ pkg }) => (
  <div className="card">
    <Head>
      <link href="/static/card.css" media="all" rel="stylesheet" />
    </Head>
    <h3>
      <Link href={`/pkg?id=${pkg.name}`} as={`/package/${pkg.name}`}>
        <a>{pkg.name}</a>
      </Link>
      <span className="card-version" title="Version of package when sizes snapshot was taken">{pkg.lastversion}</span>
    </h3>
    <p>{pkg.description}</p>

    <table>
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
  </div>
)
