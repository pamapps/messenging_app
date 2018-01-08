Feature: Messaging App Tests

#********************************Successful Login**************************************

  Scenario: Tests for Logging into Messaging App
    Given  I log into messaging app
    When   I see the chat page and can send a hello message
    Then   I see the message in the chat

#**********************************Failed Login****************************************

  Scenario Outline: Tests for Failed Logging into Messaging App
    Given  I log into messaging app with "<username>" and "<password>"
    When   He clicks login
    Then   the login fails
    Examples:
      |  username | password |
      | test-user | kdjlkjlk |
      | kjlkjlkjlk| password |
      | kjlkjlkj  | jlkjlkj  |