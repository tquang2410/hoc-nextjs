'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container } from 'react-bootstrap'

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">BeerApp</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <Container className="mt-4">
            {children}
        </Container>
        </body>
        </html>
    )
}