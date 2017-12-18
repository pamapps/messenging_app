Feature: Messaging App Tests

  Scenario: Tests for Logging into Messaging App
    Given  I log into messaging app
    When   I see the chat page and can send a hello message
    Then   I see the message in the chat
