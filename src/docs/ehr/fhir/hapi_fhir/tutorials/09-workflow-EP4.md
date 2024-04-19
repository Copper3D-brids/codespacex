# Tutorial - Workflow in FHIR

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- workflowOperator.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/workflowOperator.py).


## Background

### Scenario

Recently, our researcher Jiali launch a study. This study is about convert a SDS format dataset into a FHIR format, and she also need to create a workflow and run the workflow for each individules. What's more, she also need to manange the workflow results for each patient. Then, she also provides some basic information for us:
- **SDS dataset**:
![image](/fhir/01-fhir-resources/09-workflow/09-dataset.png)
Here you can find out under SDS dataset primary folder, there are two patient subjects, after we deal with the dataset, we can get the above information: 1. Patients' name: Aniyah, and Linman Zhang. 2. Their EHR data - age and body temperature. 3. The identifiers for both of them. 
So, which FHIR resources that we can choose for storing these EHR data? Obviously, the [Patient](https://hl7.org/fhir/R4/patient.html) and [Observation](https://hl7.org/fhir/R4/observation.html) are our first choice.

- **Workflow discription**:
![image](/fhir/01-fhir-resources/09-workflow/09-workflow-detail.png)

Obviously, the workflow description has aleady given a very detailed information: identifier, target, and actions. So we can choose [PlanDefinition](https://hl7.org/fhir/R4/plandefinition.html) resource to store these informations.

- **Researcher detail**:
![image](/fhir/01-fhir-resources/09-workflow/09-researcher.png)

As for the researchers, their information we can store in the FHIR [Practitioner](https://hl7.org/fhir/R4/practitioner.html) resource.

With these nice information above, we can draw a FHIR resources relationship/structure dragram for how can we organize the data in FHIR server.

![image](/fhir/01-fhir-resources/09-workflow/09-resource-relationship.png)

The basic ideas for this relationship diagram are:

1. The Practitioner (researcher) and PlanDefinition (workflow) are independent. 
2. All Patient resources are managed by Practioner.
3. The [Task](https://hl7.org/fhir/R4/task.html) (workflow process) is core resource related to Patient, Practioner, and PlanDefinition. A PlanDefinition/Practitioner/Patient can run multiple Task, but for each Task only can relate to one specific PlanDefinition/Practitioner/Patient.
4. All the results of the workflow process are stored in Observation, and none of Patient resource is refer to them, all of them are refer to a [Composition](https://hl7.org/fhir/R4/composition.html) resource which is managed by a specific Task (workflow process).

Now, with this nice diagram, we can start the implementaion for this scienario.

## Setup environment

- Same to Tutorial 02

## Introduction

### Import library

At the beginning we need to import libraries `fhirpy` and `os`.

Also, we re-use the customise function `pprint` from Tutorial-02. We'll use it to display some Observation resource data structures.

```py
import os
from fhirpy import AsyncFHIRClient
from pathlib import Path
import pydicom
from datetime import datetime
import uuid
```

### Create an instance of connection

To load data from FHIR server we should instaniate `FHIRClient` class from `fhirpy AsyncFHIRClient` method.

Let's pass `url` and `authorization` arguments from environment.

```py
client = AsyncFHIRClient(
        url='http://localhost:8080/fhir/',
        authorization='Bearer TOKEN',
    )
```

Now, we are able to operate with FHIR resources using `client`.

## The **Sequence Diagram** for runing a workflow

Based on the scenario information, we can draw a sequence diagram for researcher Jiali when she run a workflow for a specific patient (Linman).

![image](/fhir/01-fhir-resources/09-workflow/09-sequence-diagram.png)


## Implemention

### Register a research role

Based on the research information above, we need to store the research data into `Practitioner` resource. The key idea here is we need to store the `identifier` for the researcher, this is a way for us to aviod the duplication resource instances and enable search funtion more easily.

- Check if there is a duplicate Practitioner resource

```py
async def is_resource_exist(client, identifier, resource):
    workflows = await search_resource(client, identifier=identifier, resource=resource)
    if len(workflows) > 0:
        print(f"the {resource} already exist! identifier: {identifier}")
        return True
    return False

result = await is_resource_exist(client, identifier, "Practitioner")
if result:
    return
```

- Create a Practitioner resource for researcher

```py
new_practitioner = create_resource(client, 'Practitioner', identifier)
new_practitioner['name'] = [
    {
        'given': ['Jiali'],
        'family': 'Thompson',
        'use': 'official',
    }
]

# format year-month-day
new_practitioner['brithDate'] = '1975-09-20'

await new_practitioner.save()
```

- As for we can eaily create a resource with `Identifier`, we can create a common function `create_resource`:

```py
def create_resource(client, resource_type, resource_identifier):
    resource = client.resource(resource_type)

    resource['identifier'] = [
        {
            "use": "official",
            "system": "http://sparc.sds.dataset",
            "value": resource_identifier
        }
    ]

    return resource
```

## Load dataset

In this part, we don't to load a real dataset, what we can do is using a mock data. For example, we have a SDS dataset, and under the dataset primary folder we can two patients' subjects - which includes the patient's basic information (name, brithdate, contact), some EHR data (age, body temperature), or Dicom Images. So let's create our mock data:

```json
[
    {
        "givenname": "Aniyah",
        "familyname": '',
        "identifier": "sparc-patient-yyds-001",
        "brithDate": "1994-04-11",
        "Observation": [
            {
                "identifier": "sparc-patient-yyds-001-observation-001",
                "loinc-code": "8310-5",
                "value": 96.8,
                "unit-code": "degF"
            },
            {
                "identifier": "sparc-patient-yyds-001-observation-002",
                "loinc-code": "30525-0",
                "value": 30,
                "unit-code": "years"
            }
        ]
    },
    {
        "givenname": "Linman",
        "familyname": "Zhang",
        "identifier": "sparc-patient-yyds-002",
        "brithDate": "1993-04-10",
        "Observation": [
            {
                "identifier": "sparc-patient-yyds-002-observation-001",
                "loinc-code": "8310-5",
                "value": 93.8,
                "unit-code": "degF"
            },
            {
                "identifier": "sparc-patient-yyds-002-observation-002",
                "loinc-code": "30525-0",
                "value": 31,
                "unit-code": "years"
            }
        ]
    }
]
```

Now with these mock data, we can very easily create the `Patient` and `Observation` resources.

- Create all Patients.





## Search ImagingStudy Resource


## Summary

In this tutorial the following topics were covered:

- `Patient`, `ImagingStudy` and `Observation` resources.
- How to use `pydicom` to get dicom file tags information.
- How to search `ImagingStudy Resource` for specific identifier and speciality.
- Search specific observation resource via ImagingStudy.
