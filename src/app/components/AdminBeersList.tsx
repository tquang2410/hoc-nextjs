'use client'

import React from 'react'
import useSWR, { mutate } from 'swr'
import { Table, Button, Spinner } from 'react-bootstrap'

const fetcher = (url: string) => fetch(url).then(res => res.json())
interface Beer {
    id: number
    name: string
    price: string
    rating: {
        average: number
        reviews: number
    }
}
const AdminBeersList: React.FC = () => {
    const {data, error, isLoading} = useSWR<Beer[]>('https://api.sampleapis.com/beers/ale', fetcher)
    const handleDelete = async (id: number) => {
        if (!confirm(`Xác nhận xoá sản phẩm này? (id = ${id})`)) return
        await fetch(`https://api.sampleapis.com/beers/ale/${id}`, {method: 'DELETE'})
        // Xoá cache sau khi xoá thành công
        mutate('https://api.sampleapis.com/beers/ale')
    }
        if (isLoading) return <Spinner animation="border"/>

        if (error) return <p className="text-danger">Lỗi khi tải dữ liệu.</p>

        return (
            <Table bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Đánh giá</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {data!.map(beer => (
                    <tr key={beer.id}>
                        <td>{beer.id}</td>
                        <td>{beer.name}</td>
                        <td>{beer.price}</td>
                        <td>
                            {beer.rating.average} ({beer.rating.reviews} reviews)
                        </td>
                        <Button   variant="warning"
                                  size="sm"
                                  href={`/admin/edit/${beer.id}`}
                                  className="me-2"
                        >
                            Sửa
                        </Button>
                        <td>
                            <Button variant="danger"
                                    onClick={() => handleDelete(beer.id)}>
                                Xoá
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )

}
export default AdminBeersList