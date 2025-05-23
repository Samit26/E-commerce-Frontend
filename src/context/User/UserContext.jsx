import React from 'react'

const CategoriesContextProvider = ({ children }) => {
  const data = "Hello"
  return (
    <div>
      <CategoriesContext.Provider value={data}>
        {children}
      </CategoriesContext.Provider>
    </div>
  )
}

export default CategoriesContextProvider
