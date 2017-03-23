import Link from 'next/link'

export default ({ pkg }) => (
  <div className="card">
    <style>{`
      .card {
        background: #fff;
        border-radius: 5px;
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
        font-size: 20px;
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
    `}</style>

    <h3><Link href={`/pkg?id=${pkg.name}`} as={`/pkg/${pkg.name}`}><a>{pkg.name}</a></Link></h3>
    <Link href={`/pkg?id=${pkg.name}`} as={`/pkg/${pkg.name}`}>
      <a><img className="card-stat-icon" src={`/badge/${pkg.name}`} /></a>
    </Link>
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
          <td><strong>{pkg.fullSize}</strong></td>
          <td>{pkg.minifiedSize}</td>
          <td>{pkg.minifiedAndGzippedSize}</td>
        </tr>
      </tbody>
    </table>
  </div>
)