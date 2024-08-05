Steps to make it work:

1. Clone repo using command: `git clone git@github.com:janogarcia79/playvox_api.git`
2. Execute command `cd playvox_api`
3. Execute command `npm run test` and let the magic works :)

NOTES:

- Test result may shows an error from time to time due to the test hit a record that is not available (on purpose), and a new test case should cover that scenario.
- In the meantime, scenarios covered here are:
  - PUT for creating a new record
  - GET to retieve the new record created
