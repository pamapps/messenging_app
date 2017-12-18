**Cucumber Automation - Messaging App**

This is the Cucumber Automation for the Messaging App.  It uses cucumber-js and selenium-webdriver to run the tests in a browser.

It runs the tests in Chrome and you will need to have Chromedriver executable on your path.  You will need at least version 2.33 for the tests to run.
All the JavaScript is linted using jshint before the tests are run (using options specified in the Gruntfile). After the tests are finished Cucumber shuts down the Webdriver instance.

**RUNNING TESTS**

To run the tests, open a Terminal window, and type 'grunt'.

There is 1 feature file, 'messageapp.feature' with 3 directory folders, 'pages', 'step_definitions', and 'support'.

**FEATURE FILE**

The 'feature' files describe behaviours that are written in Gherkin "Given", "When" and "Then".   

**PAGE OBJECTS**

The 'pages' directory folder contains a page model for the Login Page.    

**Note this is another way to implement the tests. I didn't go further on this, but wanted to show you how using the Page Model function to create Page objects, that contain elements found in the DOM.
These pages also contain methods that can interact with the page elements. The test steps call these methods.  This is a good way to organize, because when elements in the UI changes, you will only need to edit the Page Objects.


**STEP-DEFINITIONS**

The messagingapp-steps.js steps file contains the steps that implement the steps in the feature file.

**Created "messageapp-steps.js" file to show how we can call the Page Objects from the steps file.  Note this has not been implemented.
