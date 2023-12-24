Feature: Restful Booker API Testing

  Scenario: Create Booking - Positive Test
    Given I have valid booking details 
    When I send a POST request to '/booking' with these details
    Then I should receive a successful status code and a booking id

  Scenario: Create Booking - Negative Test (Invalid Details)
    Given I have incomplete or invalid booking details
    When I send a POST request to '/booking' with  negative details
    Then I should receive an error code and a message indicating what was wrong

  Scenario: Retrieve Booking - Positive Test
    Given a booking with a known id exists get book by id
    When I send a GET request to '/booking/{id}' 
    Then I should receive a successful status code and the booking details

  Scenario: Retrieve Booking - Negative Test (Non-existent ID)
    Given a booking with a known id does not exist
    When I send a GET request to '/booking/{id}' with wrong id
    Then I should receive a not found status code

  Scenario: Update Booking - Positive Test
    Given a booking with a known id exists and I have valid new booking details
    When I send a PUT request to '/booking/{id}' with the new details
    Then I should receive a successful status code and the updated booking details

  Scenario: Update Booking - Negative Test (Non-existent ID)
    Given a booking with a known id does not exist and I have valid new booking details
    When I send a PUT request to '/booking/{id}' wrong id
    Then I should receive a not found status code

  Scenario: Delete Booking - Positive Test
    Given a booking with a known id exists
    When I send a DELETE request to '/booking/{id}' 
    Then I should receive a successful status code indicating the booking was deleted

  Scenario: Authentication - Positive Test
    Given I have valid credentials
    When I use them to authenticate for a secured endpoint
    Then I should receive a token and access the secured functionality

  Scenario: General Server Down Test
    Given the server is down or unreachable
    When I try to access any endpoint
    Then I should receive a server error status code
