#!/bin/bash

# Run Playwright tests
npx playwright test --reporter=html

# Show the test report
npx playwright show-report --host 0.0.0.0 --port 9323

# Keep the container running
tail -f /dev/null