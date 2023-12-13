import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Pagination from '../pagination/pagination.component'

const Table = ({ data, header }) => {
  return (
    <div className="px-2">
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            {header.map((data, idx) => {
              return <CTableHeaderCell key={idx}>{data.label}</CTableHeaderCell>
            })}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item, idx) => (
            <CTableRow key={idx}>
              {header.map((item2, idx2) => (
                <CTableDataCell key={idx2}>
                  {item[item2.accessor] === null ||
                  item[item2.accessor] === undefined ||
                  item[item2.accessor] === ''
                    ? '-'
                    : item[item2.accessor]}
                </CTableDataCell>
              ))}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <Pagination />
    </div>
  )
}

export default Table
