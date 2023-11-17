Feature: Add a product to cart in AliExpress

  Scenario: User adds a product to their cart
    Given User wants to buy something on AliExpress
    When Users searches for product
    Then User clicks on product
    And User adds the product to their cart
