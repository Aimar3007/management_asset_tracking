import React, { useState } from 'react'
import { CFormInput, CButton, CFormSelect, CFormTextarea, CForm } from '@coreui/react'
import './add-electronic-assets.style.scss'
import { assetName, conditionAssets, ramType, storageType } from '../electronic-assets.static'
import { useNavigate } from 'react-router-dom'

const AddElectronicAssets = () => {
  const navigate = useNavigate()
  const [content, setContent] = useState('general')
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    serialNumber: '',
    purchaseDate: '',
    condition: '',
    city: '',
    user: '',
    previousUser: '',
    lastDateOfRepair: '',
    note: '',
    storageType: '',
    storageSize: '',
    storageConfiguration: '',
    ramType: '',
    ramSize: '',
    ramConfiguration: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('kehit kah?')

    // // Kirim data ke API menggunakan metode seperti fetch atau axios
    // fetch('https://url-api-anda.com/endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log('Response dari API:', data)
    //     // Tambahkan logika atau tindakan lain setelah mendapatkan respons dari API
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error)
    //     // Tindakan jika terjadi error dalam pengiriman data
    //   })
  }

  const generalForm = () => {
    return (
      <div className="row">
        <div className="col">
          <CFormSelect
            options={assetName}
            label="Name"
            value={formData?.name}
            name="name"
            onChange={handleChange}
            required
          />
          <CFormInput
            type="text"
            placeholder="Input Description"
            label="Description"
            value={formData?.description}
            onChange={handleChange}
            name="description"
          />
          <CFormInput
            type="text"
            placeholder="Input Brand"
            label="Brand"
            value={formData?.brand}
            name="brand"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input Serial Number"
            label="Serial Number"
            value={formData?.serialNumber}
            name="serialNumber"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input Purchase Date"
            label="Purchase Date"
            value={formData?.purchaseDate}
            name="purchaseDate"
            onChange={handleChange}
          />
          <CFormSelect
            options={conditionAssets}
            label="Condition"
            value={formData?.condition}
            name="condition"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <CFormInput
            type="text"
            placeholder="Input City"
            label="City"
            value={formData?.city}
            name="city"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input User"
            label="User"
            value={formData?.user}
            name="user"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input Previous User"
            label="Previous User"
            value={formData?.previousUser}
            name="previousUser"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input Date"
            label="Last Date of Repair"
            value={formData?.lastDateOfRepair}
            name="lastDateOfRepair"
            onChange={handleChange}
          />
          <CFormTextarea
            label="Note"
            rows={4}
            value={formData?.note}
            name="note"
            onChange={handleChange}
          />
        </div>
      </div>
    )
  }

  const detailsForm = () => {
    return (
      <div className="row">
        <div className="col">
          <CFormSelect
            options={storageType}
            label="Storage Type"
            value={formData?.storageType}
            name="storageType"
            onChange={handleChange}
            required
          />
          <CFormInput
            type="text"
            placeholder="Input Storage Size"
            label="Storage Size"
            value={formData?.storageSize}
            onChange={handleChange}
            name="storageSize"
          />
          <CFormInput
            type="text"
            placeholder="Input Storage Configuration"
            label="Storage Configuration"
            value={formData?.storageConfiguration}
            onChange={handleChange}
            name="storageConfiguration"
          />
        </div>
        <div className="col">
          <CFormSelect
            options={ramType}
            label="Ram Type"
            value={formData?.ramType}
            name="ramType"
            onChange={handleChange}
          />
          <CFormInput
            type="text"
            placeholder="Input Ram Size"
            label="Ram Size"
            value={formData?.ramSize}
            onChange={handleChange}
            name="ramSize"
          />
          <CFormInput
            type="text"
            placeholder="Input Ram Configuration"
            label="Ram Configuration"
            value={formData?.ramConfiguration}
            onChange={handleChange}
            name="ramConfiguration"
          />
        </div>
      </div>
    )
  }

  return (
    <CForm
      className="card add-electronic-assets"
      style={{ height: 'calc(100vh-250px)' }}
      onSubmit={handleSubmit}
    >
      <h4 className="px-4 pb-1 pt-3">Create Assets</h4>
      <div className="border"></div>
      <div className="px-4 pb-3">{content == 'general' ? generalForm() : detailsForm()}</div>
      <div className="border"></div>
      <div className="d-flex justify-content-between px-4 py-2">
        <CButton
          color="primary"
          variant="outline"
          onClick={() => {
            navigate('/electronic-assets')
          }}
          className="text-end"
        >
          Cancel
        </CButton>
        <div>
          {content !== 'general' && (
            <CButton
              color="primary"
              type="button"
              variant="outline"
              onClick={() => {
                setContent('general')
              }}
              className="text-end me-3"
            >
              Previous Step
            </CButton>
          )}
          {content == 'general' && formData.name == 'laptop' ? (
            <CButton
              color="primary"
              variant="outline"
              type="button"
              onClick={() => {
                setContent('details')
              }}
              className="text-end"
            >
              Next Step
            </CButton>
          ) : (
            <CButton color="primary" type="submit" variant="outline" className="text-end">
              Add Assets
            </CButton>
          )}
        </div>
      </div>
    </CForm>
  )
}

export default AddElectronicAssets
