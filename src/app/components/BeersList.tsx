'use client'

import useSWR from 'swr'
import React from 'react'
import { Card, Row, Col, Spinner } from 'react-bootstrap'

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Beer {
    id: number
    name: string
    image: string
    price: string
    rating: {
        average: number
        reviews: number
    }
}

const BeersList: React.FC = () => {
    const { data, error, isLoading } = useSWR<Beer[]>('https://api.sampleapis.com/beers/ale', fetcher)

    if (isLoading) {
        return <Spinner animation="border" variant="primary" />
    }
    if (error) {
        return <p>Error loading beers.</p>
    }
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {data!.map(beer => (
                <Col key={beer.id}>
                    <Card>
                        {beer.image && (
                            <Card.Img
                                variant="top"
                                src={beer.image}
                                style={{ height: 200, objectFit: 'cover' }}
                            />
                        )}
                        <Card.Body>
                            <Card.Title>{beer.name}</Card.Title>
                            <Card.Text><strong>Price:</strong> {beer.price}</Card.Text>
                            <Card.Text>
                                <strong>Rating:</strong> {beer.rating.average}{' '}
                                ({beer.rating.reviews} reviews)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default BeersList