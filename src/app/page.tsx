import React from 'react'
import BeersList from './components/BeersList'

const HomePage: React.FC = () => (
    <div>
      <h1 className="mb-4">Danh sách Beer</h1>
      <BeersList />
    </div>
)

export default HomePage