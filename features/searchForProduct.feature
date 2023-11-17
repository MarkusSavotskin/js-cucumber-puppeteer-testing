Feature: Search for a product in AliExpress

  Scenario: Open first search result on AliExpress
    Given User visits AliExpress website
    When Users searches by product name
    Then Get title of first result