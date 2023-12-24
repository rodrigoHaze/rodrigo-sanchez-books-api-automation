import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { ApiController } from "../../utils/utils";
import constants from "../constants/constants";
let booking: Array<number> = new Array<number>();
let controller = new ApiController();
let lastCreated: number;
let lastStatusInfo: any;

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
  const id = controller.getRandomElementFromArray(booking);
  const response = await controller.getMethodWithoutParams(
    constants.BOOK_ENDPOINTS.getBooking(id),
    constants.BASE_URL!
  );
  console.log(await response.json());
});
Given("a booking with a known id exists", async function () {});

When("I send a GET request to {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "I should receive a successful status code and the booking details",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Given("a booking with a known id does not exist", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I send a GET request to {string} with wrong id", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("I should receive a not found status code", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Given(
  "a booking with a known id exists and I have valid new booking details",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

When(
  "I send a PUT request to {string} with the new details",
  async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Then(
  "I should receive a successful status code and the updated booking details",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Given(
  "a booking with a known id does not exist and I have valid new booking details",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

When("I send a PUT request to {string} wrong id", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I send a DELETE request to {string}", async function (string) {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "I should receive a successful status code indicating the booking was deleted",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Given("I have valid credentials", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I use them to authenticate for a secured endpoint", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then(
  "I should receive a token and access the secured functionality",
  async function () {
    // Write code here that turns the phrase above into concrete actions
    return "pending";
  }
);

Given("the server is down or unreachable", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

When("I try to access any endpoint", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});

Then("I should receive a server error status code", async function () {
  // Write code here that turns the phrase above into concrete actions
  return "pending";
});
