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
const EXCEL_HEADERS: string[] = [
  "id",
  "featureName",
  "name",
  "uri",
  "tags",
  "steps",
  "status",
  "duration(nanoseconds)",
  "retried",
  "failure",
];
const EXCEL_FILE_NAME = "ExcelReport";

export default {
  BOOK_ENDPOINTS,
  BASE_URL,
  BODY_FORMAT,
  TOKEN,
  EXCEL_HEADERS,
  EXCEL_FILE_NAME,
};
