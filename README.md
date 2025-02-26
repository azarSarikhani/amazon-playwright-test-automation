# Amazon product tester
This Amazon product tester, utilizes playwright test automating tool to run an end to end test on Amazon.com. Looking for Nikon on the front page search bar,
and sorting the serach result from price High to low, the test expects that the second result in the search item to have the text "Nikon D3X" in product detail section.

## **Features**

- Searches for "Nikon" and sorts the results from highest to lowest price.
- Selects the second product and clicks on it for more details.
- In the product details, verifies (using assert) that the product title includes the text "Nikon D3X".
- Utilizes Playwright test framework.
- Implements the webpage opening step such that the URL is a configurable parameter.


---

## **Requirements**

- Node has to be installed on the machine that runs this test. Node.js can be installed via commandline. For installation instruction see [**Node.js official website**](https://nodejs.org/en/download)


---

## **Inputs**

### **`Base URL`**
- **Description**: URL to the website that is to be tested.  
- **Required**: No.  
- **Type**: String.

Provide the URL to, for instance Amazon.co.uk website, to overwrite the default "amazon.com".

---

## **Outputs**

### **`Test results`**
- **Description**: Result of tests ran on different browsers.

---

## **Environments to Run**

- The tests can be run locally as a headless or headed test on local machines. 
- The tests can be run using docker. The docker tests send test reports to port 9323 of the docker container that is maped to port 9323 of the host. 
- The tests could be run using Github runners. The Github action CI pipeline runs the tests and publishes the test results as an artifact.


## **Usage**

To run the tests locally, clone the repo. Go to the root of the repo. We need to install playwright and dependancies using npm first. To do so run:

```bash
npm install
npx playwright install --with-deps
```

To run the tests locally, remove --headed if you wish to run the tests headless, they will run headlessly be default:

```bash
npx playwright test --headed
```

To open HTML reports on a local browser, after local runs:

```bash
npx playwright show-report
```

To change the base url either modify it's value in playwright.config.ts or pass a value for it when running the test:

```bash
BASE_URL="https://www.amazon.co.uk/" npx playwright test
```

To run the docker container, go to the root of the repo and run:

```bash
docker compose up --build
```
To see the HTML report of the tests ran in docker go to http://localhost:9323 on your favorate browser. Docker container remains running until you kill the process using for instance Ctrl+C.

## **Issues**
The tests would not run successfully on GitHub action CI pipelines. The search box element times out and never becomes visible. This could be due to one of the reasons bellow:

1. Playwright’s browsers are being blocked by Amazon, preventing search box from ever being visible or enabled.
2. Amazon is continuously making network requests (ads, tracking, etc.), preventing "networkidle" from ever happening. This is not necessarily an issue because we don't need network idle. Search box could be filled without network being idle. 
3. The page takes too long to load due to network issues .
4. Different DOM structures – Amazon may have different versions of its website served based on region, browser type, or OS. This could be the main reason tests run on local and container runs conducted from machines inside Finland, but they wouldn't run on GitHub runners that could be anywhere.
5. Dynamic Element Loading – The search bar could be loaded dynamically, causing a timing issue. This is one reason we need to invest in making runners/ test agents that are costumized to our test environment criterias. 
6. Personalization – Some versions of Amazon may have different element IDs depending on the browser and machine that is sending requests to them.

## **Roadmap**
While this is a proof of concept or an example of what could be tested using Playwright, there is a great deal of room for improvement that both the POC and the final test set could get. Here are some of the potential additions for the future.

1. Add GitHub annotation to show all of the warning and errors in the tests in the form of annotations so that there will be no need for the artefact to be downloaded to see the test results and there would be no need to go through pipeline logs.
2. Add a step that would trigger a warning for critical tests, for example for nightly runs on main branch all test fails should be reported by sending a message to alert channel in the teams.
3. Add test cases that would test NIKON, and nikon and the likes as well as Nikon. Since the end to end tests are meant to mimic end user behaviors many more test cases could be added to cover a wider range of end user behavior.
