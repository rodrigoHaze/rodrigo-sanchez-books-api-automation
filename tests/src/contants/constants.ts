require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const BOOK_ENDPOINTS={
    
    createBooking: `${BASE_URL}/booking`,
    getBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    updateBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    deleteBooking: (id: number) => `${BASE_URL}/booking/${id}`,
  
    // Authentication endpoint, replace if different
    createToken: `${BASE_URL}/auth`,
  
    // Any other endpoints as listed in the documentation
    // e.g., partialUpdateBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    // e.g., getBookingIds: `${BASE_URL}/booking`,
  
    // Health check endpoint, replace if different
    healthCheck: `${BASE_URL}/ping`,
}


export default{
    BOOK_ENDPOINTS
}