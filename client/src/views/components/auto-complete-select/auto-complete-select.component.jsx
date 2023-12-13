import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'

// const options = ['aimar', 'anca', 'dony', 'alif', 'ijay', 'hanjar']
const AutocompleteComponent = ({ options, placeholder, className }) => {
  const [value, setValue] = useState('')
  const [items] = useState(options)

  const handleChange = (event) => {
    setValue(event.target.value)
    // Filter options based on user input
    // setItems(filteredItems)
  }

  const handleClick = () => {
    setValue('') // Mengosongkan nilai saat input diklik
  }

  return (
    <Autocomplete
      value={value}
      items={items}
      getItemValue={(item) => item}
      shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
      renderInput={(props) => (
        <input
          {...props}
          type="text"
          placeholder={placeholder}
          onClick={handleClick}
          onChange={handleChange}
          className={className}
        />
      )}
      renderItem={(item, isHighlighted) => (
        <div key={item} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item}
        </div>
      )}
      onSelect={(value) => setValue(value)}
      renderMenu={(children, value, style) => (
        <div style={{ ...style }} key={value}>
          {children}
        </div>
      )}
    />
  )
}

export default AutocompleteComponent
