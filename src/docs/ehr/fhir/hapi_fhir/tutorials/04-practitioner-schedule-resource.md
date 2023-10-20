# Tutorial - FHIR Practitioner Schedule Resource

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- schedule.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/schedule.py).

- Currently, it is a **private** repository, will open source later...

## Background

### Scenario

A clinical coordinator invited John for a visit. John said, he'd like to visit the center on Monday if possible. The coordinator needs to select an appropriate doctor with avaliable slots in the schedule. So, the coordinator views a list of available schedules with a `General Practice` service type.

Select the first found schedule with available slots for the next Monday (09-16-2018).

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


## FHIR resource Practitioner, Schedule and Slot

### Practitioner Resource

[Practitioner](https://www.hl7.org/fhir/practitioner.html) covers all individuals who are engaged in the healthcare process and healthcare-related services as part of their formal responsibilities.

The two major distinctions from [RelatedPerson](https://www.hl7.org/fhir/relatedperson.html) are:

- Formal responsibility for the healthcare-related services.
- the fact that `Practitioner` operates on behalf of the care delivery organization over multiple patients.

Within an organization `Practitioner` can be associated with multiple roles defined by [PractitionerRole](https://www.hl7.org/fhir/practitionerrole.html).

Clinical specialty of the clinician is defined in terms of [Practice Setting Code Value Set](https://www.hl7.org/fhir/valueset-c80-practice-codes.html).

### Schedule Resource

[Schedule](https://www.hl7.org/fhir/schedule.html) controls dates and times avaliable for performance of a service and/or the use of a resource.

The service provided by `Schedule` can be parameterized with `serviceCategory`, `serviceType` and `speciality`.

- [serviceCategory](https://www.hl7.org/fhir/valueset-service-category.html) is a broader categorisation of the servcice that will be performed during this appointment.
  - For example, in [service category system](https://terminology.hl7.org/5.1.0/CodeSystem-service-category.html) code `2` stands for `Aged Care`.

- [serviceType](https://www.hl7.org/fhir/valueset-service-type.html) is used for more concrete service that will be performed during this appointment.
  - For example, in [service type system](https://terminology.hl7.org/5.1.0/CodeSystem-service-type.html): `Aged Care` is split into multiple components:
    - code `2` - `Aged Care Assessment` 
    - code `3` - `Aged Care Information/Referral`
    - code `4` - `Aged Residential Care`
- [speciality](https://www.hl7.org/fhir/valueset-c80-practice-codes.html) is the speciality of a practitioner that would be required to perform the service requested.
  - For example, in [practie codes](https://www.hl7.org/fhir/valueset-c80-practice-codes.html) for snomed system `http://snomed.info/sct` code `394814009` stands for `General practice`.

The only required field is `actor` - the resource the `Schedule` is providing availablity information for.

It is of `Reference` type and can reffer to `Practitioner`, `PractitionerRole`, `Device` or a few other resources.

#### Search Parameters for Schedule
There are five [search parameters](https://www.hl7.org/fhir/schedule.html#search) defined for `Schedule` resource.

- `active` ro find a `Schedule` in a concerte state (active or inactive).
- `actor` to find a `Schedule` for the individual (`Practitioner`, for instance).
- `identifier` to search for a `Schedule` with specific `identifier`.
- `type` for the type ofappointments that can be booked into associated slots.
- `date` for `Schedule` resources that have a period that contains this date specified.

#### Slot on Schedule

A slot of time on a schedule that might be available for booking appointments is defined with [Slot](#slot) resource.

`Schedule` does not directly contains `Slot` resources. It has `planningHorizon` instead - the interval for which an organization is accepting appointments and each `Slot` has a reference to the `Schedule` to which it belongs.

#### Schedule scenario
Let's suppose that the organization has a weekly schedule with eight one-hour appointments permitted per a business day.

The weekly schedule will fit in a single `Schedule` resource with the dates for the start and end of week set.

This `Schedule` resource will then have 40 `Slot` resources associated with it.

### Slot


### Slot Resource

[Slot](https://www.hl7.org/fhir/slot.html)s are effectively spaces of free/busy time, they do not provide any information about appointments that are avaliable, just the time, and optionally what the time can be used for.

There can be multiple `Slots` referring  to a given instant of time, this is possible in a case of, for example, open group therapy.

The slots in a schedule are not necessarily of the same size, and can be different for different days of week.

## Find a schedule

Let's search for a schedule with `General Practice` type of appointments.

`Schedule` has a [search parameter](https://www.hl7.org/fhir/schedule.html#search) `service-type` that translates into `serviceType` field. `serviceType` is defined in terms of [ServiceType value set](https://terminology.hl7.org/5.1.0/CodeSystem-service-type.html). On the value set `General Practice` is defined with code `124`.

Note that every `Schedule` provides availability information for a list of resources. The list is stored in a field `actor`.

We may want to ask `HAPI FHIR server` to include those actors in the query result.

```py
schedules = await client.resources('Schedule').search(**{'date': '2018-09-16', 
'service-type': 124}).include('Schedule', 'actor').fetch()
```

Let's look into the `actors` returned with the query result.

```py
for schedule in schedules:
    actors = [await actor.to_resource() for actor in schedule['actor']]
    print(actors)
```

Each of the schedules provides availability information for `Practitioner` and `Location`.

## Load slots schedules

Please, read about [Slot search parameters](https://www.hl7.org/fhir/slot.html#search) before moving on.

Now let's search for slots defined for the schedules.

```py
slots = [await client.resources('Slot').search(schedule=schedule['id']).fetch() 
for schedule in schedules]
print(slots)
```

There are no available slots for `Adam Ainslay` on Monday 09-16-2018, so we'll work with `Kelly Smith` - first in the schedules list.

```py
schedule = schedules[0]
pprint(schedule)
```

Let's display the schedule in more comfortable format.

```py
slots = await client.resources('Slot').search(schedule=schedule['id']).fetch()
details = [(slot.get('start'),slot.get('end'),slot.get('status'))for slot in slots]
print(details)
```

Find all of the `free` slots for the schedule using API. **Hint:** this can be done with `status` [search parameters](https://www.hl7.org/fhir/slot.html#search).

```py
slots = await client.resources('Slot').search(schedule=schedule['id'],
status='free').fetch()

details = [(slot.get('start'),slot.get('end'),slot.get('status'))for slot in slots]

print(details)
```

Find all of the slots starting at 11am on Monday 09-16-2018. **Hint:** use `start` [search parameters](https://www.hl7.org/fhir/slot.html#search).

```py
slots = await client.resources('Slot').search(schedule=schedule['id'], 
start='2018-09-16T11:00:00').fetch()
details = [(slot.get('start'),slot.get('end'),slot.get('status'))for slot in slots]
print(details)
```

## Summary

In this tutorial the following topics were covered:

- `Practitioner`, `Schedule` and `Slot` resources.
- How to find a `Schedule` by service type and date.
- How to load `Slots` for a Schedule resource.
- How to search `Slots` for specific date and speciality.