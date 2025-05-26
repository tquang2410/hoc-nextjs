import React from 'react'
import AdminBeersList from "@/app/components/AdminBeersList";
import { Button } from "react-bootstrap";

const AdminPage: React.FC = () => (
    <div>
        <h1 className="mb-4">Quản lý Beer</h1>
        <Button href="/admin/new" className="mb-3">
            Thêm mới
        </Button>
        <AdminBeersList />
    </div>
)
export default AdminPage