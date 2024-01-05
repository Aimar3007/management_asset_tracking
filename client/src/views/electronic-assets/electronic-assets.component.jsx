import React from 'react'
import AutoCompleteSelect from '../components/auto-complete-select/auto-complete-select.component'
import {
  optionsName,
  optionsBrand,
  optionsUsers,
  dataElectronic,
  dataHeaderElectronic,
} from './electronic-assets.dummy'
import { CFormInput } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import Table from '../components/table/table.component'
import { useNavigate } from 'react-router-dom'

const ElectronicAssetsPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="card px-3" style={{ height: '65px' }}>
        <div className="mt-3" style={{ display: 'flex', flexDirection: 'row' }}>
          <AutoCompleteSelect options={optionsName} placeholder={'Name'} className="me-3" />
          <AutoCompleteSelect options={optionsBrand} placeholder={'Brand'} className="me-3" />
          <AutoCompleteSelect options={optionsUsers} placeholder={'User'} className="me-3" />
          <div className="me-3" style={{ width: '530px' }}>
            <CFormInput
              type="text"
              placeholder="Default input"
              aria-label="default input example"
            />
          </div>
          <div className="mt-1">
            <CIcon icon={cilSearch} size="xl" />
          </div>
        </div>
      </div>
      <div className="card mt-2">
        <Table
          data={dataElectronic}
          header={dataHeaderElectronic}
          rowOnclick={(data) => {
            const id = data.id
            navigate('/electronic-assets-detail/' + id)
          }}
        />
      </div>
    </div>
  )
}

export default ElectronicAssetsPage
