import Package from './package'
export default ({ pkgList }) => (
  <div className='list'>
    <ul>
      {pkgList.map(pkg => (
        <li key={pkg.name}>
          <Package pkg={pkg} />
        </li>
      ))}
    </ul>

    <style>{`
      ul,
      li
      {
        list-style: none;
        margin:0;
        padding:0;
      }

      li {
        margin-bottom: 30px;
      }

    `}</style>
  </div>
)
