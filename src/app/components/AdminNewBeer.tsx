'use client'

import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useRouter } from 'next/navigation'

const AdminNewBeer: React.FC = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Kiểm tra dữ liệu đầu vào
            if (!name.trim()) {
                throw new Error('Tên beer không được để trống')
            }
            if (!price.trim()) {
                throw new Error('Giá beer không được để trống')
            }

            // Gửi dữ liệu lên API
            const response = await fetch('https://api.sampleapis.com/beers/ale', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price,
                    image: image || 'https://www.totalwine.com/media/sys_master/cmsmedia/hff/h0e/8979036078110.png',
                    rating: {
                        average: 0,
                        reviews: 0
                    }
                }),
            })

            if (!response.ok) {
                throw new Error(`Lỗi khi thêm beer: ${response.status}`)
            }

            // Chuyển hướng về trang danh sách beer
            router.push('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi thêm beer')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên Beer</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên beer"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Giá</Form.Label>
                    <Form.Control
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ví dụ: $10.99"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Đường dẫn hình ảnh (tùy chọn)</Form.Label>
                    <Form.Control
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Nhập URL hình ảnh"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Đang thêm...' : 'Thêm Beer'}
                </Button>
            </Form>
        </div>
    )
}

export default AdminNewBeer