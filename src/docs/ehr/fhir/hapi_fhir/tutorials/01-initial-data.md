# HAPI FHIR Tutorial - Data initialzation

These toturials are using fhirpy to connect HAPI FHIR server.
The HAPI FHIR server is running at local docker container with `http://localhost:8080`. 

- environment
  - [hapi-fhir-jpaserver](https://github.com/hapifhir/hapi-fhir-jpaserver-starter)
  - [fhirpy](https://pypi.org/project/fhirpy/) v1.4.2
  - docker
  - python 3.9+
- data
  - synthea_sample_data_fhir_r4


## Import Library

```python
import os
import sys
import json
from fhirpy import AsyncFHIRClient
```

## Create a FHIR server connection

```python

client = AsyncFHIRClient(
  url='http://localhost:8080/fhir/',
  authorization='Bearer TOKEN',
)
```

## Initialize

- Run the next command to import prepared dataset

```python
dataset_path = './dataset'
await import_dataset(client, dataset_path)
```

- Functions for load FHIR json files to FHIR server

```python
async def import_dataset(client, dataset_path):
  sys.stdout.write("Import progress: 0%   \r")

  filenames = [
    filename for filename in os.listdir(dataset_path)
    if filename.endswith('.json')
  ]

  total_count = len(filenames)
  for index, filename in enumerate(filename):
    await import_bundle(client, os.path.join(dataset_path, filename))
    progress = int(float(index + 1) / float(total_count)*100)
    sys.stdout.write("Import progress: %d%%   \r" % progress)
    sys.stdout.flush()

  sys.stdout.write("Import progress: 100%\n")
  sys.stdout.write("{0} bundles imported".format(total_count))

async def import_bundle(client, filename):
  with open(filename, encoding='utf-8') as fd:
    patient_json = json.load(fd)
  
  boundle = client.resource('Bundle')
  bundle['type'] = 'transcation'
  bundle['entry'] = patient_json['entry']
  await bundle.save()
```

## Check resources

Now, we should load 27 patient resources, we can run below code to check it:

```python
resources = client.resources('Patient')
print(await resources.count())
``` 

## Summary

From this toturial we learned how to:

- upload synthea FHIR R4 patients `Bundle` resources to the HAPI fhir server.
- check the loaded resources count.