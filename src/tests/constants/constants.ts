require("dotenv").config();
const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;
const BOOK_ENDPOINTS = {
  createBooking: `/booking`,
  getBooking: (id: number) => `/booking/${id}`,
  updateBooking: (id: number) => `/booking/${id}`,
  deleteBooking: (id: number) => `/booking/${id}`,
  createToken: `/auth`,
  healthCheck: `/ping`,
};
const BODY_FORMAT = function (
  firstname: string,
  lastname: string,
  totalprice: number,
  depositpaid: boolean,
  checkin: string,
  checkout: string,
  additionalneeds: string
) {
  return {
    firstname: firstname,
    lastname: lastname,
    totalprice: totalprice,
    depositpaid: depositpaid,
    bookingdates: {
      checkin: checkin,
      checkout: checkout,
    },
    additionalneeds: additionalneeds,
  };
};

export default {
  BOOK_ENDPOINTS,
  BASE_URL,
  BODY_FORMAT,
  TOKEN,
};
