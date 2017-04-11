import Link from 'next/link'

const getColourForSize = (bytes) => {
  if(bytes >= 200000) return 'red';
  if(bytes >= 60000) return 'orange';
  if(bytes >= 15000) return 'yellow';
  return 'green';
}

const getPackageFullSize = (pkg) => {
  const pkgVersion = pkg.version;
  const pkgName = pkg.name;
  const asset = pkg.assets[0].sizes.filter((size) => {
    return size.file === pkg.filename.replace('.min', '')
  });
  if(asset[0]) {
    return asset[0].size;
    if(asset[0].size == undefined) {
      console.log('not number', asset[0], pkg);
    }
  }
}

const getMinifiedSize = (pkg) => {
  const pkgVersion = pkg.version;
  const pkgName = pkg.name;
  const asset = pkg.assets[0].sizes.filter((size) => {
    return size.file === pkg.filename
  });
  if(asset[0]) {
    return asset[0].size;
  }
}
const getMinifiedAndGzippedSize = (pkg) => {
  const pkgVersion = pkg.version;
  const pkgName = pkg.name;
  const asset = pkg.assets[0].sizes.filter((size) => {
    return size.file === `${pkg.filename}.gz`
  });
  if(asset[0]) {
    return asset[0].size;
  }
}

const formatBytes = (bytes,decimals) => {
   if(bytes == undefined) return '0 Bytes';
   if(bytes == 0) return '0 Bytes';
   var k = 1000,
       dm = decimals + 1 || 3,
       sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
       i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default ({ pkg }) => (
  <div className="card">
    <h3>
      <Link href={`/pkg?id=${pkg.name}`} as={`/package/${pkg.name}`}>
        <a>{pkg.name}</a>
      </Link>
      <span className="card-version" title="Version of package when sizes snapshot was taken">{pkg.version}</span>
    </h3>
    <p>{pkg.description}</p>

    <table>
      <thead>
        <tr>
          <th>Size</th>
          <th>Minified</th>
          <th>Minified + Gzipped</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatBytes(getPackageFullSize(pkg), 0)}</td>
          <td><span className={`size-colour size-colour-${getColourForSize(getMinifiedSize(pkg))}`}>{formatBytes(getMinifiedSize(pkg), 0)}</span></td>
          <td>{formatBytes(getMinifiedAndGzippedSize(pkg), 0)}</td>
        </tr>
      </tbody>
    </table>

    <style>{`
      .card {
        background: #fff;
        border-radius: 3px;
        color: #2f395a;
        position: relative;
        overflow: hidden;
        padding: 20px;
      }

      @media (min-width: 400px) {
        .card {
          padding: 30px;
        }
      }

      @media (min-width: 400px) {
        .card-stat-icon {
          position: absolute;
          right: 30px;
          top: 35px;
        }
      }

      .card table {
        border: none;
        font-size: 13px;
        text-align: left;
        border-collapse: collapse;
        margin: 10px 0;
      }

      .card table th,
      .card table td {
        padding: 2px 5px;
      }

      @media (min-width: 400px) {
        .card table th,
        .card table td {
          padding: 2px 10px;
        }
      }

      .card table th {
        width: 33.333%;
        color: #9c5479;
        font-weight: normal;
        font-size: 12px;
        border-bottom: none;
        vertical-align: bottom;
      }

      .card th:first-child,
      .card td:first-child {
        padding-left:0;
      }

      .card th:last-child,
      .card td:last-child {
        padding-right:0;
      }

      @media (min-width: 400px) {
        .card table th {
          font-size: 15px;
        }
      }

      .card table td {
        font-size: 16px;
      }

      @media (min-width: 400px) {
        .card table td {
          font-size: 26px;
        }
      }

      @media (min-width: 400px) {
        .card table {
          font-size: 18px;
        }
      }

      .card h3 {
        padding: 0;
        margin: 0;
        font-size: 25px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        padding-bottom: 20px;
      }

      .card h3 a {
        color: #2f395a;
        text-decoration: none;
      }

      .card h3 a:hover {
        text-decoration: underline;
      }

      .card-version {
        font-size: 70%;
        opacity: 0.8;
        font-weight: 500;
        text-decoration:none;
        margin-left: 0.5em;
      }

      .card .size-colour:before {
        content: "";
        background: green;
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 5px;
        margin-bottom: 2px;
      }

      @media (min-width: 400px) {
        .card .size-colour:before {
          width: 12px;
          height: 12px;
          margin-right: 10px;
          margin-bottom: 3px;
        }
      }

      .card .size-colour-red:before {
        background: #e05d44;
      }
      .card .size-colour-orange:before {
        background: #fe7d37;
      }
      .card .size-colour-yellow:before {
        background: #dfb317;
      }
      .card .size-colour-green:before {
        background: #4c1;
      }
    `}</style>
  </div>
)
