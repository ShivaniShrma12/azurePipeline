@AIEngine @Login
Feature: Verify Login functionality

  @ECOM_LoginTC_207
  Scenario Outline: Test to verify if providing valid username and password allows user to login to the application
    Given Read the test data "<TestData>" from Excel file
    When Navigate to the AI Engine url
    And Click on "Login" option from Account and list dropdown
    And Enter Username and Password AI Engine
    And Click on "Login" button
    Then Verify user is successfully logged in
    Examples:
      | TestData  |
      | TestCase1 |


  @ECOM_LoginTC_231
  Scenario Outline: Test to check the Log in with both email and password invalid
    Given Read the test data "<TestData>" from Excel file
    When Navigate to the AI Engine url
    And Click on "Login" option from Account and list dropdown
    And Enter Username and Password AI Engine
    And Click on "Login" button
    And Verify that "To Login you need to signUp first" toast message should be displayed
    Examples:
      | TestData  |
      | TestCase2 |

  @ECOM_LoginTC_239
  Scenario Outline: Test to check the Log in with both email and password invalid
    Given Read the test data "<TestData>" from Excel file
    When Navigate to the AI Engine url
    And Click on "Login" option from Account and list dropdown
    And Enter invalid username and press tab
    Then Verify "email must be a valid email" error message should be displayed
    Examples:
      | TestData  |
      | TestCase4 |