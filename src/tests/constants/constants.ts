require('dotenv').config();
const BASE_URL = process.env.BASE_URL;
const BOOK_ENDPOINTS={
    
    createBooking: `${BASE_URL}/booking`,
    getBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    updateBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    deleteBooking: (id: number) => `${BASE_URL}/booking/${id}`,
    createToken: `${BASE_URL}/auth`,
    healthCheck: `${BASE_URL}/ping`,
}


export default{
    BOOK_ENDPOINTS
}