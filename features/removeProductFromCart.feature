Feature: Add and then remove product from the cart

  Scenario: User does not wants to remove added product from the cart
    Given User thought they wanted to buy something from AliExpress
    When Users looks for a product
    Then User opens the product page
    And User adds the product to the cart
    Then User navigates to the cart
    And User removes the product from the cart
