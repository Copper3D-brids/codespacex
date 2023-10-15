# FHIR Patient Resource

## Background
 Meet John Thompson. He is a 36 year old (date of birth is 08-02-1982) man from `Philadelphia`. He is thinking of visiting our clinical center because of some health problems. John calls our center and asks if he can visit us.

 Let's check if he has visited our center before.

## Setup environment

### Import libraries

For the beginning we should import libraries `fhirpy` and `os`.

Also We use our customise `pprint` to dhisplay some resource's structures.

```python
import os
from fhirpy import AsyncFHIRClient

def pprint(d):
    from json import dump
    import sys

    dump(d, sys.stdout, indent=2)
```

### Create an instance of connection
- Before this task, the T-01 initial FHIR data should be completed.
- To load data from FHIR server we should initate `FHIRClient` class from `fhirpy` package.
- We pass `url` and `authorization` arguments from environment.

```python
client = AsyncFHIRClient(
  url='http://localhost:8080/fhir/',
  authorization='Bearer TOKEN',
)
```

Now, we are able to operate with FHIR resources using `client`.

## Load resources' data from HAPI FHIR server
### Load list of patients

The `Patient` resource covers data about patients and animals involved in a wide range of health-related activities, including:

- Theurapeutic activities
- Psychiatric care
- Social services
- Pregnancy care
- Nursing and assisted living
- Dietary services
- Tracking of personal health and exercise data

The data in the Resource cover the "who" information about the patient: its attributes are focused on the demographic information necessary to support the administrative, finacial and logistic procedures. A `Patient` record is generally created and maintained by each organization providing care for a patient.

Let's try to fetch all patients in the database using `resources` method.

This method returns a `lazy object` (an instance of `FHIRSearchSet`), which provides some helpful methods for building queries. The most important method which we are going to use is `fetch()`. Using it, we can execute built queries and load all records suitable for our query. 

- `async .fetch()`: makes query to the server and returns a list of `Resource` filtered by resource type.
- `async .fetch_all()`: makes query to the server and returns a full list of `Resource` filtered by resource type. (not recommand)
- `async .fetch_raw()`: makse query to the server and returns a raw Boundle `Resource`. 
- More `FHIRSearchSet` api details visit [fhirpy GitHub](https://github.com/beda-software/fhir-py#asyncfhirsearchset). 