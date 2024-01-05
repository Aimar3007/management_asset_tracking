import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dataElectronic } from '../electronic-assets.dummy'
import { CButton, CCol, CNav, CNavItem, CNavLink, CRow } from '@coreui/react'
import {
  electronicAssetsDetailsHeader,
  electronicAssetsGeneralHeader,
  eletronicAssetsDetailTabsHeader,
} from '../electronic-assets.static'

const ElectronicAssetsDetail = () => {
  const { id } = useParams()
  const [data] = useState(dataElectronic.find((item) => item.id == id))
  const [active, setActive] = useState(0)
  const content = [electronicAssetsGeneralHeader, electronicAssetsDetailsHeader]
  const navigate = useNavigate()
  return (
    <div className="card">
      <div className="p-3">
        <CRow>
          <CCol>
            <img
              src="https://www.jktgadget.com/wp-content/uploads/2023/07/LENOVO-LEGION-PRO-5-1.jpg"
              alt=""
              height="450px"
            />
          </CCol>
          <CCol>
            <h4>{data.description}</h4>
            <CNav variant="tabs">
              <CNavItem className="d-flex">
                {eletronicAssetsDetailTabsHeader.map((item, idx) => (
                  <CNavLink key={idx} active={active === idx} onClick={() => setActive(idx)}>
                    {item.label}
                  </CNavLink>
                ))}
              </CNavItem>
            </CNav>
            {content[active].map((item, idx) => (
              <div key={idx} className="mt-2">
                {item.label}: {data[item.accessor] || '-'}
              </div>
            ))}
          </CCol>
        </CRow>
      </div>
      <div className="border-top"></div>
      <div className="p-3 d-flex justify-content-between">
        <CButton color="primary" variant="outline" onClick={() => navigate('/electronic-assets')}>
          Back
        </CButton>
        <div>
          <CButton color="primary" variant="outline" className="me-4">
            Remove
          </CButton>
          <CButton color="primary" variant="outline">
            Update
          </CButton>
        </div>
      </div>
    </div>
  )
}

export default ElectronicAssetsDetail
