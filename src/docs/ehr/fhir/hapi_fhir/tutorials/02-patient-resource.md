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
- To load data from FHIR server we should initate `FHIRClient` class from `fhirpy` package.
- We pass `url` and `authorization` arguments from environment.

```python
client = AsyncFHIRClient(
  url='http://localhost:8080/fhir/',
  authorization='Bearer TOKEN',
)
```