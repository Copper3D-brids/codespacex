# Tutorial - FHIR Encounter Resource

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- encounter.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/encounter.py).

- Currently, it is a **private** repository, will open source later...

## Background

### Scenario

John Thompson finally arrives at the clinical center and has just started his visit with the practitioner Kelly Smith. He told Kelly abount his concerns about fever and high blood pressure. So, Kelly checked the current temperature and the blood pressure: 96.8 F and 130/80. Kelly diagnosed hypertension and requested some blood tests to diagnose the cause of the fever.

Let's create an Encounter to track the visit.

## Setup environment

- Same to Tutorial 02

## Introduction

### Import library

At the beginning we need to import libraries `fhirpy` and `os`.

Also, we re-use the customise function `pprint` from Tutorial-02. We'll use it to display some Observation resource data structures.

```py
import os
from fhirpy import AsyncFHIRClient
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

## Load related resources

- Before creating `Encounter` resource we need to find the patient -John Thompson.

```py
patient = await client.resources('Patient').search(
    name=['John', 'Thompson']
).first()

pprint(patient)
```

- Next we need to find the parctitioner - Kelly Smith

```py
practitioner = await client.resources('Patient').search(
    name=['Kelly', 'Smith']
).first()

pprint(practitioner)
```

The clinical center where our patient has finally arrived is `Hahnemann University Hospital`

- Find `Location` resource for the clinical center 'Hahnemann University Hospital'

```py
location = await client.resources('Location').search(
    name='Hahnemann University Hospital'
).first()

pprint(location)
```

And finally load `Appointment` that scheduled this `Encounter`.

```py
appointment = await client.resources('Appointment').search(actor=patient['id']).first()

pprint(appointment)
```
## Encounter Resource

[Encounter](http://hl7.org/fhir/R4/encounter.html) is an interaction between a patient and healthcare provider for the purpose of providing healthcare service or assessing the health status of a patient.

An `Encounter` encompasses the lifecycle from pre-admission, the actual encounter, admission, stay and discharge. During the encounter the patient may move from practitioner to practitioner and location to location.

`Encounter` has a broad scope, so some components may be irrelevant to a specific context, the `class` element is used to distinguish between settings.

Differnt organizations may have different lebel of aggregation for `Encounter`. For example, during hospitalization each single visit of a practitioner may lead to a new instance of `Encounter`, but in other organization the whole hospitalization may be defined in terms of a single `Encounter`.

We use `Appointment` for the planning stage. When the appointment is about to start, we create a new `Encounter` and mark `Appointment` object as fulfilled.

### Load Encounter resource

Let's search for existent `Encounter` resources before creating one.

```py
encounters = await client.resources('Encounter').search(subject=patient['id']).first()

pprint(encounters)
```

### Create Condition

[Condition](http://hl7.org/fhir/R4/condition.html) resource can be used to describe information about illness identified from application of clinical reasoning. It is important to distinguish `Condition` from `Observation`, we use `Observation` when a symptom contributes to the establishment of a condition. `Condition` on the other hand is about a clinician's assessment and assertion of a particular aspect of a patient's state of healt.

Let's create `Condition` for hypertension. Hypertension is encoded as `38341003` in `http://snomed.info/sct` system.

```py
condition = client.resource(
    'Condition',
    code={
        'coding':[{
            'system': 'http://snomed.info/sct',
            'code':'38341003'
        }]
    },
    subject=patient.to_reference()
)

pprint(condition)
```

### Create Encounter

Now that we've all the information required, we can finally register our `Encounter`.

```py
encounter = client.resource(
    'Encounter',
    status='in-progress',
    subject=patient.to_reference(),
    participant=[{
        'type':[{
            'coding':[{
                'system': 'http://hl7.org/fhir/v3/ParticipationType',
                'code': 'PPRF'
            }]
        }],
        'individual': practitioner
    }],
    appointment=appointment.to_reference(),
    diagnosis=[{'condition':condition}],
    location=[{'location','status':'active'}]
)

pprint(encounter)
```

### Register symptoms with Observation

We can link `Observation` resource to `Encounter` with `Observation.context`.

Base on scenario to register the observations:
- temperature 96.8F
- blood pressure 130/80

And link them to the encounter we've just created.

```py
temperature_observation = client.resource(
    'Observation',
    status='preliminary',
    category=[{
        'coding':[{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs'
        }]
    }],
    code={
        'coding':[{
            'system': 'http://loinc.org',
            'code': '8310-5'
        }]
    },
    effectiveDateTime='2018-09-16',
    valueQuantity={
        'system': 'http://unitsofmeasure,org',
        'value': 96.8,
        'code': 'degF'
    },
    encounter=encounter.to_reference(),
    subject=patient.to_reference()
)
```
- Create blood pressure `Observation` resource instance

```py
blood_pressure_observation = client.resource(
    'Observation',
    id='blood_pressure_observation_for_john_thompson',
    status='preliminary',
    category=[{
        'coding':[{
            'system': 'http://hl7.org/fhir/observation-catagory',
            'code': 'vital-signs'
        }]
    }],
    code={
        'coding':[{
            'system':'http://loinc.org',
            'code': '55284-4'
        }]
    },
    effectiveDateTime='2018-09-16',
    encounter=encounter.to_reference(),
    subject=patient.to_reference()
)

pprint(blood_pressure_observation)
```

## Summary

In this tutorial we've discussed:
- How to search for `Encounter`
- How to create `Condition`
- What is the difference between `Condition` and `Observation`
- How to create `Encounter`
- How to link `Condition` and `Observation` to `Encounter`