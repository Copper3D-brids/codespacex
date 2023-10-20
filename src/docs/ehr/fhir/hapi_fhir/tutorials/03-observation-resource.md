# Tutorial - FHIR Observation Resource

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- observationOpeartor.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/observationOperator.py).

- Currently, it is a **private** repository, will open source later...

## Background

A Observation Resources are used to store basic physical information about the patient.

- `Vital signs`: body weight, blood pressure, and temperature etc.
- `Laboratory Data`: blood glucose, or an estimated GFR etc.
- `Imaging Results`: bone density or fetal measurements etc.
- `Clinical Findings`: abdominal tenderness etc.
- `Device measurements`: EKG data or Pulse Oximetry data etc.
- `Device Settings`: mechanical ventilator parameters etc.
- `Clinical assessment tools`: APGAR or a Glasgow Coma Score etc.
- `Personal characteristics`: eye-color etc.
- `Social history`: tobacco use, family support, or cognitive status etc.
- `Core characteristics`: pregnancy status, or a death assertion.
- `Product quality tests`: pH, Assay, Microbial limits, etc. on product and substance. 

### Scenario

A clinical coordinator asked John about his complaints to clarify how we can help. John explained, he doesn't feel well this week. It's related to the temperature and high blood pressure. This started to happen on Monday (10-20-2022).

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

## Load data from the FHIR server

### Load list of observations

[Observation](http://hl7.org/fhir/R4/observation.html) is a central element in healthcare, used to support a diagnosis, monitor progress, determine baselines and patterns and even capture demographic characteristics. Most observations are simple name/value pair assertions with some metadata, but some observations group other observations together logically, or even are multi-component observations.

```py
observations = await client.resources('Observation').limit().fetch()
```

This line fetched a portion of data in size of from the server. You can see the result of its execution.

We also can display all data from the Observation

```py
pprint(observations[0])
```

## Create Observation record

There are two patient's claims:

- On Monday his temperature was 96.8 F and the blood pressure was 140/90.
- On Tuesday his temperature was 100.4 F and the blood pressure was 120/80.

The category of our claims is defined by the `category` field of the `Observation`. This field is of type [CodeableConcept](https://www.hl7.org/fhir/datatypes.html#CodeableConcept).

`CodeableConcept` consists of a terminology (`coding` field of type [Coding](https://www.hl7.org/fhir/datatypes.html#Coding)). We are going to use it in our formal description and a plain text problem explanation (`text` field of type [string](https://www.hl7.org/fhir/datatypes.html#string)). When none of the `coding` elements are marked as `userSelected`, the `text` (if present) it the preferred source of meaning.

Within [Coding](https://www.hl7.org/fhir/datatypes.html#Coding) we can refer to a particular `system` and `code`.

`Observation` defines its `category.coding` in terms of [observation-category](https://www.hl7.org/fhir/valueset-observation-category.html), so this is our `category.coding.system`.

`observation-category` contains multiple concepts, yan can read up on them in the official FHIR specification.

Patient's claims contain information about the body temperature and the blood pressure, se we choose `vital-signs` as the `category.coding.code`.

From [vital-signs structure definition](https://www.hl7.org/fhir/vitalsigns.html) we can verify our `category` value (that we've figured out above) and find out what the `code` value is.

`Observation.code`:
- `coding.system` - http://loinc.org
- `coding.code` - one of the allowed [vital sign result types](https://www.hl7.org/fhir/valueset-observation-vitalsignresult.html), in our case it is `8310-5` for body temperature, `8480-6` for systolic blood pressure and `8462-4` for diastolic blood pressure.

Now we clarified `Observation category` and `code`. Let's create an `Observation` object. 

Before we do that, please read a small note about Observation [status](https://www.hl7.org/fhir/valueset-observation-status.html) field: it is used to specify what the current status of an observation is.

There are multiple values defined in the `FHIR specification`, some of them are:

- `registered` - The existence of the observation is registered, but there is no result yet available.
- `preliminary` - This is an initial or interim observation: data may be incomplete or unverified.
- `final` - The observation is complete.

```py
observation = client.resource(
    'Observation',
    status='preliminary',
    category=[{
        'coding': [{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs'
        }]
    }],
    code={
        'coding':[{
            'system':'http://loinc.org',
            'code': '8310-5'
        }]
    }
)
```

`Observation` has a field called `valueQuantity` (of type Quantity) it contains current results of measurements performed.

According to [vital-signs structure definition](https://www.hl7.org/fhir/vitalsigns.html) for `vital-signs` category this field can be populated with (remember, it is of [Quantity](https://www.hl7.org/fhir/datatypes.html#Quantity) type):

- `system` - `http://unitsofmeasure.org`
- `value` - represents one numeric value
- `code` - UCUM (stands for The Unified Code for Units of Measure) unit code from [Vital Signs Units](https://www.hl7.org/fhir/valueset-ucum-vitals-common.html)

So, on Monday (10-20-2022) our patient has a temperature of `96.8F` let's write it in the observation

```py
observation['effectiveDateTime'] = '2022-10-20'

observation['valueQuantity'] = {
    'system': 'http://unitsofmeasure.org',
    'value': 96.8,
    'code': 'degF'
}
```

We've just created our first `Observation` object. Let's connect the `Observation`resource to the `Patient` resource from T-02 before saving to the HAPI FHIR server database.

```py
patient = await client.resources('Patient').search(name=['John', 'Thompson']).first()
```

`Patient` reference is stored in `Observation.subject`.

```py
observation['subject'] = patient.to_reference()

await observation.save()
```

Let's figure out what the current observation state is:

```py
pprint(observation)
```

### Updated Scenario

Now the patient weight is 85 kilograms, we can add it into a new observation based [vital-signs structure definition](https://www.hl7.org/fhir/vitalsigns.html), [allowed vital sign result types](https://www.hl7.org/fhir/valueset-observation-vitalsignresult.html) and [vital signs units](https://www.hl7.org/fhir/valueset-ucum-vitals-common.html).

Also, let's go through the [observation example details](http://hl7.org/fhir/observation-examples.html#10.1.8.13) to find out a sulotion on how to fill the key/values pairs in a observation resource. This is an [example for patient body weight](http://hl7.org/fhir/observation-example.json.html) observation resource.

```py
weight_observation = client.resource(
    'Observation',
    status='preliminary',
    category=[{
        'coding': [{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs',
            "display": "Vital Signs"
        }]
    }],
    code={
        "coding":[{
            "system": "http://loinc.org",
            "code": "29463-7",
            "display": "Body Weight"
        }]
    },
    effectiveDateTime = '2022-10-20',
    valueQuantity={
        "value": 85,
        "unit": "kg",
        "system": "	http://unitsofmeasure.org",
        "code": "kg"
    },
    subject=patient.to_reference()
)

pprint(weight_observation)

await weight_observation.save()
```

Then let's create `Observation` object for the blood pressure.

Blood pressure value is built up of two parts: `systolic` and `diastolic`, and we have to specidy both of them in the same `Observation`. For this purpose there is a special field in Observation object called `component`. Each `component` field consists of `code` and `valueQuantity`. For `Observation` with multiple components we have to specify section header code. For blood pressure this code is `55284-4` from `http://lo*inc.org` system.

```py
blood_pressure_observation = client.resource(
    'Observation',
    status = 'preliminary',
    category=[{
        'coding':[{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs'
        }]   
    }],
    code={
            'coding':[{
                'system':'http://loinc.org',
                'code': '55284-4'
            }]
        },
    component=[
        {
            'code':{
                'coding':[{
                'system':'http://loinc.org',
                'code': '8480-6'
                }]
            },
            'valueQuantity': {
                'system': 'http://unitsofmeasure.org',
                'value': 140,
                'code': 'mmHg'
            }
        },
        {
            'code':{
                'coding':[{
                    'system': 'http://loinc.org',
                    'code': '8462-4'
                }]
            },
            'valueQuantity':{
                'system': 'http://unitsofmeasure.org',
                'value': 90,
                'code': 'mmHg'
            }
        }
    ],
    effectiveDateTime='2022-10-20',
    subject=patient.to_reference()
)

pprint(blood_pressure_observation)

await blood_pressure_observation.save()

```
### Create observation for each data

**Note:** The observation resource is used for store one type of category data. If we have multiple temperature, blood pressure .etc data, we need to create separate observation resource for each of them. Even if they have same data on blood pressure but on different dates, we also need to create observation resources for each of them, and link them to a same `Patient` resource reference.

Thus, let's create observations for Tuesday values of blood pressure and the body temperature using scenarios give above.

- Temperature

```py
tuesday_temperature_observation = client.resource(
    'Observation',
    status='preliminary',
    category=[{
        'coding': [{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs'
        }]
    }],
    code={
        'coding': [{
            'system': 'http://loinc.org',
            'code': '8310-5'
        }]
    },
    effectiveDateTime='2022-10-21',
    valueQuantity={
        'system': 'http://unitsofmeasure.org',
        'value': 100.4,
        'code': 'degF'
    }
)
```

- Blood pressure

```py
tuesday_blood_pressure_observaion = client.resource(
     'Observation',
    status = 'preliminary',
    category=[{
        'coding':[{
            'system': 'http://hl7.org/fhir/observation-category',
            'code': 'vital-signs'
        }]   
    }],
    code={
            'coding':[{
                'system':'http://loinc.org',
                'code': '55284-4'
            }]
        },
    component=[
        {
            'code':{
                'coding':[{
                'system':'http://loinc.org',
                'code': '8480-6'
                }]
            },
            'valueQuantity': {
                'system': 'http://unitsofmeasure.org',
                'value': 120,
                'code': 'mmHg'
            }
        },
        {
            'code':{
                'coding':[{
                    'system': 'http://loinc.org',
                    'code': '8462-4'
                }]
            },
            'valueQuantity':{
                'system': 'http://unitsofmeasure.org',
                'value': 80,
                'code': 'mmHg'
            }
        }
    ],
    effectiveDateTime='2022-10-21',
    subject=patient.to_reference()
)
```

- Save Tuesday's `Observation` resources to the HAPI FHIR server database

```py
tuesday_temperature_observation.save()
tuesday_blood_pressure_observaion.save()
```

## Work with related resources

We've just created our first two observations. Let's see how to make a search. We can use `patient` search parameter to find all the patient's observations. There are multiple [search parameters](https://www.hl7.org/fhir/observation.html#search) defined for Observation. With `patient` we can search for observations which belong to the patient we've created before by giving patient's `id` as an argument, or use `patient.to_reference()` to get the `id`.

```py
await client.resources('Observation').search(patient=patient['id']).fetch_all()

# or
await client.resources('Observation').search(patient=patient.to_reference()).fetch_all()
```

As you can see, there are multiple observations registered for the patient.

To do the reverse search for `Patient` based on a reference in `Observation` we can use [reverse chaining](https://www.hl7.org/fhir/search.html#has) with `_has` search parameter. `_has` allows to select resources based on the properties of resources which refer to them. 

For example, query `GET /Patient?_has:Observation:patient:code=8310-5` will search for observayions with `code=8310-5` (which is related to the body temperature). 

From every observation found retrieves a refernce to the `Patient` this observation refers to. The Patient is then included into the search result. Note that `code` here is not directly applies to `Observation` structure, it is defined as a [search parameter](https://www.hl7.org/fhir/observation.html#search) instead.

Let's build the same query with `fhirpy` API.

```py
await client.resources('Patient').has('Observation', 'patient', code='8310-5').fetch()
```

This query returns all of the temperature `Observation's` Patient resources from the database.

## Summary

From this tutorial we will more familar with:

- Load observations from the HAPI FHIR server.
- Create Observation records.
- Srearch releted resources.
- Display different Resource's attributes.