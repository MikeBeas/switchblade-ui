import Stack from 'Stack';
import styles from 'styles/Table.module.css';

const Table = ({ rows, columns, empty }) => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              className={styles.th}
              key={JSON.stringify(col)}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>

      {rows.length > 0 && (
        <tbody>
          {rows.map((row) => (
            <tr className={styles.tr} key={JSON.stringify(row)}>
              {columns.map((col) => (
                <td className={styles.td} key={col.key ?? col.dataIndex}>
                  {col.render ? col.render(row[col.dataIndex ?? col.key] ?? row, row) : row[col.dataIndex ?? col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      )}
    </table>

    {rows.length === 0 && (
      <Stack style={{ padding: 70, backgroundColor: 'white', color: 'grey' }}>
        {empty}
      </Stack>
    )}
  </div>
)

Table.defaultProps = {
  rows: [],
  columns: [],
  empty: "No Data"
}

export default Table;