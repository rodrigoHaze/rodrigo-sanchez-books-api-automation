import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ApiController } from "../../utils/utils";
import constants from "../constants/constants";
let booking: Array<number> = new Array<number>();
let controller = new ApiController();
let lastCreated: number;
let lastStatusInfo: any;
let id: number;
let authBody: any;

Given("I have valid booking details", async function () {
  const response = await controller.getMethodWithoutParams(
    constants.BOOK_ENDPOINTS.createBooking,
    constants.BASE_URL!
  );
  const jsonResponse = await response.json();
  jsonResponse.forEach((element: any) => {
    booking.push(element.bookingid);
    return;
  });

  //console.log(controller.getRandomElementFromArray(jsonResponse));
  expect(response.status()).toBe(200);
  expect(jsonResponse.length).toBeGreaterThan(1);
  expect(controller.areAllElementsNumbers(booking)).toBe(true);
  expect(jsonResponse.length).toStrictEqual(booking.length);
});

When(
  "I send a POST request to {string} with these details",
  async function (string) {
    const body = constants.BODY_FORMAT(
      "Testing QA Chile",
      "By Qr1",
      999,
      true,
      "2023-12-24",
      "2023-12-29",
      "Gym"
    );
    const response = await controller.postNewObjectNoToken(
      body,
      constants.BOOK_ENDPOINTS.createBooking,
      constants.BASE_URL!
    );
    const jsonResponse = await response.json();
    lastCreated = jsonResponse.bookingid;
    lastStatusInfo = {
      code: response.status(),
      text: response.statusText(),
    };

    expect(jsonResponse.booking.firstname).toEqual(body.firstname);
    expect(jsonResponse.booking.lastname).toEqual(body.lastname);
    expect(jsonResponse.booking.totalprice).toEqual(body.totalprice);
    expect(jsonResponse.booking.depositpaid).toEqual(body.depositpaid);
    expect(jsonResponse.booking.bookingdates).toEqual(body.bookingdates);
    expect(jsonResponse.booking.additionalneeds).toEqual(body.additionalneeds);
  }
);

Then(
  "I should receive a successful status code and a booking id",
  async function () {
    expect(lastStatusInfo.code).toBe(200);
    expect(lastStatusInfo.text).toBe("OK");
    expect(lastCreated).not.toBeNaN();
    expect(lastCreated).toBeGreaterThanOrEqual(10);
  }
);

Given("I have incomplete or invalid booking details", async function () {});

When(
  "I send a POST request to {string} with  negative details",
  async function (string) {
    let body;
    const response = await controller.postNewObjectNoToken(
      body,
      constants.BOOK_ENDPOINTS.createBooking,
      constants.BASE_URL!
    );
    lastStatusInfo = {
      code: response.status(),
      text: response.statusText(),
    };
  }
);

Then(
  "I should receive an error code and a message indicating what was wrong",
  async function () {
    expect(lastStatusInfo.code).toBe(500);
    expect(lastStatusInfo.text).toBe("Internal Server Error");
  }
);
Given("a booking with a known id exists get book by id", async function () {
  id = controller.getRandomElementFromArray(booking);
});
When("I send a GET request to {string}", async function (string) {
  const ids = controller.getRandomElementFromArray(booking);
  const response = await controller.getMethodWithoutParams(
    constants.BOOK_ENDPOINTS.getBooking(ids),
    constants.BASE_URL!
  );
  lastStatusInfo = {
    code: response.status(),
    text: response.statusText(),
  };
});
Given("a booking with a known id exists", async function () {});

Then(
  "I should receive a successful status code and the booking details get",
  async function () {
    expect(lastStatusInfo.code).toBe(200);
    expect(lastStatusInfo.text).toBe("OK");
  }
);

Given("a booking with a known id does not exist", async function () {
  id = 999999999999999;
});

When("I send a GET request to {string} with wrong id", async function (string) {
  const response = await controller.getMethodWithoutParams(
    constants.BOOK_ENDPOINTS.getBooking(id),
    constants.BASE_URL!
  );
  lastStatusInfo = {
    code: response.status(),
    text: response.statusText(),
  };
});

Then("I should receive a not found status code", async function () {
  expect(lastStatusInfo.code).toBe(404);
  expect(lastStatusInfo.text).toBe("Not Found");
});

Given(
  "a booking with a known id exists and I have valid new booking details",
  async function () {
    console.log(lastCreated);
  }
);

When(
  "I send a PUT request to {string} with the new details",
  async function (string) {
    const body = {
      firstname: "Juan",
      lastname: "Pedro",
      totalprice: 888,
      depositpaid: true,
      bookingdates: {
        checkin: "2024-01-01",
        checkout: "2023-01-01",
      },
      additionalneeds: "Breakfast",
    };
    const response = await controller.putEditObjectWithToken(
      body,
      constants.BOOK_ENDPOINTS.updateBooking(lastCreated),
      constants.BASE_URL!,
      constants.TOKEN!
    );
    lastStatusInfo = {
      code: response.status(),
      text: response.statusText(),
    };
    const jsonResponse = await response.json();
    expect(jsonResponse.firstname).toEqual(body.firstname);
    expect(jsonResponse.lastname).toEqual(body.lastname);
    expect(jsonResponse.totalprice).toEqual(body.totalprice);
    expect(jsonResponse.depositpaid).toEqual(body.depositpaid);
    expect(jsonResponse.bookingdates.checkin).toEqual(
      body.bookingdates.checkin
    );
    expect(jsonResponse.additionalneeds).toEqual(body.additionalneeds);
  }
);

Then(
  "I should receive a successful status code and the updated booking details",
  async function () {
    expect(lastStatusInfo.code).toBe(200);
    expect(lastStatusInfo.text).toBe("OK");
  }
);

When("I send a PUT request to {string} wrong id", async function (string) {
  let ide = 999999999999999;
  const body = {
    firstname: "Juan",
    lastname: "Pedro",
    totalprice: 888,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2023-01-01",
    },
    additionalneeds: "Breakfast",
  };
  const response = await controller.putEditObjectWithToken(
    body,
    constants.BOOK_ENDPOINTS.updateBooking(ide),
    constants.BASE_URL!,
    constants.TOKEN!
  );
  lastStatusInfo = {
    code: response.status(),
    text: response.statusText(),
  };
});
Then("I should receive a Method Not Allowed status code", async function () {
  expect(lastStatusInfo.code).toBe(405);
  expect(lastStatusInfo.text).toBe("Method Not Allowed");
});
When(
  "a booking with a known id exists THEN send a DELETE request to {string}",
  async function (string) {
    const response = await controller.deleteObjectWithToken(
      constants.BOOK_ENDPOINTS.deleteBooking(lastCreated),
      constants.BASE_URL!,
      constants.TOKEN!
    );
    lastStatusInfo = {
      code: response.status(),
      text: response.statusText(),
    };
  }
);

Then(
  "I should receive a successful status code indicating the booking was deleted",
  async function () {
    expect(lastStatusInfo.code).toBe(201);
    expect(lastStatusInfo.text).toBe("Created");
  }
);

Given("I have valid credentials", async function () {
  authBody = {
    username: "admin",
    password: "password123",
  };
});

When("I use them to authenticate for a secured endpoint", async function () {
  const response = await controller.postNewObjectNoToken(
    authBody,
    constants.BOOK_ENDPOINTS.createToken,
    constants.BASE_URL!
  );
  const jsonResponse = await response.json();
  lastStatusInfo = {
    code: response.status(),
    text: response.statusText(),
  };
  expect(jsonResponse.token).not.toBeNull();
  expect(jsonResponse.token).not.toBeUndefined();
  expect(jsonResponse.token).not.toBeNaN();
});

Then(
  "I should receive a token and access the secured functionality",
  async function () {
    expect(lastStatusInfo.code).toBe(200);
    expect(lastStatusInfo.text).toBe("OK");
  }
);

Then("send request to check health", async function () {
  const response = await controller.getMethodWithoutParams(
    constants.BOOK_ENDPOINTS.healthCheck,
    constants.BASE_URL!
  );
  expect(response.status()).toBe(201);
  //expect(response.text()).toBe("Created");
});
