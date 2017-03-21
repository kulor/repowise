import Package from './package'
export default ({ pkgList }) => (
  <div className='list'>
    <ul>
      {pkgList.map((pkg, key)=> {
        return (
          <li key={key}>
            <Package pkg={pkg} />
          </li>
        )
      })}
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