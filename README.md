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

### **`Amazon's URL`**
- **Description**: URL to Amazon's website.  
- **Required**: No.  
- **Type**: String.

Provide the URL to Amazon's website, to overwrite the default "amazon.com".

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

To run the tests locally, add --headed if you wish to run the tests headed, they will run headlessly be default:

```bash
npx playwright test --reporter=html
```

To open HTML reports on a local browser, after local runs:

```bash
npx playwright show-report
```


To run the docker container, go to the root of the repo and run:

```bash
docker compose up --build
```
To see the HTML report of the tests ran in docker go to http://localhost:9323 on your favorate browser. Docker container remains running until you kill the process using for instance Ctrl+C.
