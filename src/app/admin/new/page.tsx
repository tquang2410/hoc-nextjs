'use client'

import React from 'react'
import AdminNewBeer from "@/app/components/AdminNewBeer";

const NewBeerPage: React.FC = () => (
    <div>
        <h1 className="mb-4">Thêm Beer mới</h1>
        <AdminNewBeer />
    </div>
)
export default NewBeerPage