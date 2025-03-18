import { useState } from "react"
import { Table, Button, Form, Pagination, Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const ListPaymentHotel = () => {
  // Sample data
  const initialHotels = [
    {
      id: 1,
      hotelName: "ManagerMent Bussiness Hotel Fashion",
      ownerName: "Lê Kim Hoang Nguyen",
      month: 12,
      year: 2025,
      date: "12:00:30 12/03/2024",
      status: "PAID",
    },

    {
        id: 2,
        hotelName: "ManagerMent Bussiness Hotel Fashion",
        ownerName: "Lê Kim Hoang Nguyen",
        month: 6,
        year: 2024,
        date: "",
        status: "PENDING",
      },
  ]

  const [hotels, setHotels] = useState(initialHotels)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [entriesPerPage, setEntriesPerPage] = useState(10)

  // Filter hotels based on search term
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination logic
  const indexOfLastHotel = currentPage * entriesPerPage
  const indexOfFirstHotel = indexOfLastHotel - entriesPerPage
  const currentHotels = filteredHotels.slice(indexOfFirstHotel, indexOfLastHotel)
  const totalPages = Math.ceil(filteredHotels.length / entriesPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container>
      <h2 style={styles.title}>Hotel Partners</h2>

      <div style={styles.controls}>
        <div style={styles.showEntries}>
          <span>Filter:</span>
          <Form.Select
            style={styles.entriesSelect}
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number.parseInt(e.target.value))}
          >
            <option value="10">All Status</option>
            <option value="25">PAID</option>
            <option value="50">PENDING</option>
          </Form.Select>
        </div>

        <div style={styles.search}>
          <span>Search:</span>
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            placeholder={"Enter you hotel name or owner name"}
          />
        </div>
      </div>

      <Table bordered style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Hotel Name</th>
            <th style={styles.tableHeader}>Owner Name</th>
            <th style={styles.tableHeader}>Month/Year</th>
            <th style={styles.tableHeader}>Date Payment</th>
            <th style={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentHotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.hotelName}</td>
              <td>{hotel.ownerName}</td>
              <td>{hotel.month}/{hotel.year}</td>
              <td>{hotel.date != '' ? hotel.date : '-'}</td>
              <td>
                {hotel.status == "PENDING" 
                    ? <Button variant="warning" style={{width: '100px', marginRight: '10px'}}>{hotel.status}</Button> 
                    :  <Button variant="primary" style={{width: '100px', marginRight: '10px'}} disabled>{hotel.status}</Button> }
                <Button variant="success" style={{width: '100px', marginRight: '10px'}}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={styles.paginationContainer}>
        <div style={styles.paginationInfo}>
          Showing {indexOfFirstHotel + 1} to {Math.min(indexOfLastHotel, filteredHotels.length)} of{" "}
          {filteredHotels.length} entries
        </div>

        <Pagination style={styles.pagination}>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Pagination.Prev>

          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
              style={i + 1 === currentPage ? styles.activePage : {}}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Pagination.Next>
        </Pagination>
      </div>
    </Container>
  )
}

// Direct CSS styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#4285f4",
    marginBottom: "20px",
    fontWeight: "normal",
    fontSize: "24px",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  showEntries: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  entriesSelect: {
    width: "auto",
    display: "inline-block",
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  searchInput: {
    width: "400px",
    height: "100",
    borderRadius: 5,
  },
  table: {
    backgroundColor: "white",
    marginBottom: "20px",
  },
  tableHeader: {
    backgroundColor: "#f8f9fa",
    color: "#6c757d",
  },
  partnerStatus: {
    color: "#4285f4",
  },
  actionButtons: {
    display: "flex",
    gap: "5px",
  },
  viewButton: {
    backgroundColor: "#4285f4",
    borderColor: "#4285f4",
  },
  lockButton: {
    backgroundColor: "#f44336",
    borderColor: "#f44336",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationInfo: {
    color: "#6c757d",
  },
  pagination: {
    margin: 0,
  },
  activePage: {
    backgroundColor: "#4285f4",
    borderColor: "#4285f4",
  },
}

export default ListPaymentHotel

