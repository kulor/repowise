const getColourForSize = (bytes) => {
  if (bytes >= 200000) return 'red'
  if (bytes >= 60000) return 'orange'
  if (bytes >= 15000) return 'yellow'
  return 'green'
}

const getAssetsForVersion = (pkg, version) => {
  return pkg.assets.filter(asset => {
    return asset.version === version
  })
}

const getAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.version)
  if (!assets[0]) {
    return null
  }

  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.filename
  })

  return asset[0]
}

const getFullAsset = pkg => {
  const assets = getAssetsForVersion(pkg, pkg.version)
  if (!assets[0]) {
    return null
  }

  const asset = assets[0].sizes.filter((size) => {
    return size.file === pkg.filename.replace('.min', '')
  })

  return asset[0]
}

const getPackageFullSize = (pkg) => {
  const asset = getFullAsset(pkg)
  if (asset) {
    return asset.size.uncompressed
  }
}

const getMinifiedSize = (pkg) => {
  const asset = getAsset(pkg)
  if (asset) {
    return asset.size.uncompressed
  }
}

const getMinifiedAndGzippedSize = (pkg) => {
  const asset = getAsset(pkg)
  if (asset) {
    return asset.size.compressed
  }
}

const formatBytes = (bytes, decimals) => {
  if (bytes == undefined) return '--'
  if (bytes == 0) return '0 Bytes'
  var k = 1000,
    dm = decimals + 1 || 3,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export {
  getColourForSize,
  getAssetsForVersion,
  getAsset,
  getFullAsset,
  getPackageFullSize,
  getMinifiedSize,
  getMinifiedAndGzippedSize,
  formatBytes
}
