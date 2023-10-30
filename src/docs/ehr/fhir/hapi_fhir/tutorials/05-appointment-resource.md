# Tutorial - FHIR Appointment Resource

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- appointment.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/appointment.py).

- Currently, it is a **private** repository, will open source later...

## Background

### Scenario

Make an appointment for the patient (John Thompson) from the `Tutorial 02 - patient resource` to the parctitioner selected in the `Tutorial 04 - parctitioner resource` for next Monday (09-16-2018).

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

## Find participants

- Find a patient whose name is `John Thompson`.

```py
patient = await client.resources('Patient').search(name=['Jhon','Thompson']).first()
pprint(patient)
```

- Find the practitioner we've choosen before. Her name is `Kelly Smith`.

```py
practitioner = await client.resources('Practitioner').search(name=['Kelly', 'Smith']).first()
```

## Select date

- Using `Schedule` [search parameters](https://www.hl7.org/fhir/schedule.html#search) find the scheudle to use with practitioner.

```py
schedule = await client.resources('Schedule').search(actor=practitioner.to_reference()).first()

pprint(schedule)
```

- For the schedule found choose a time slot at 11 am on Monday 16.

```py
slot = await client.resources('Slot').search(
    schedule=schedule.to_reference(),
    start='2018-09-16T11:00:00'
).first()

details = (slot.get('start'), slot.get('end'), slot.get('status'))
```
- Mark selected time slot as `busy`

```py
slot['status'] = 'busy'
await slot.save()
```

## Appointment Resource

[Appointment](https://www.hl7.org/fhir/appointment.html) can be considerd as administrative only, and the [Encounter](https://www.hl7.org/fhir/encounter.html) is expected to have clinical implications. In general, it is expected that appointments will result in the creation of an `Encounter`. The encounter is typically created when the service starts, not when the patient arrives.

When Request/Reponse pattern is in use, a new `Appointment` is created with `status=proposed` or `status=pending` and the list of actors with status of `needs-action`. [AppointmentResponse](https://www.hl7.org/fhir/appointmentresponse.html) is then used by participants to respond with their acceptance (or not) to the appointment. Once all of the participants have replied, the appointment gets it's final status.

In an Emergency Room context, the appointment resource is replaced with `Encounter`.

To assign an `Appointment` to a specific date:

- Determine address details of the resource we want to schedule appointment with.
- Check available `Slots` for that time.
- Create new `Appointment` resource with `Appointment.status=proposed` and `status=needs-action` for all `Appointment.participants`.
- Wait for `Appointment.status` updates for approved or rejected appointments.

We are already agreed on the time slot. All of the addressing information is provided by the `Schedule` the time slot is booked for.

Let's create a new `Appointment`.

```py
# All of the actors from Schedule
participants = [{'actor':actor, 'status':'needs-action'} for actor in schedule['actor']]

# Plus the patient

participants += [{'actor':patient.to_reference(), 'status': 'accepted'}]

# Create an Appointment
appointment = client.resource(
    'Appointment',
    status='proposed',
    start=slot['start'],
    end=slot['end'],
    slot=[slot],
    participant=participants
)

await appointment.save()

pprint(appointment)
```

## Find appointments

- Using `Appointment` [search parameters](https://www.hl7.org/fhir/appointment.html#search) get a list of appointments for the paitent.

```py
appointments = await client.resources('Appointment').search(
    patient=patient['id']
).fetch()

details = [(ap.get('id'),ap.get('start'), ap.get('end'), ap.get('status')) for ap in appointments]

print(details)
```

## Summary

In this tutorial we've discussed:
- How to book a time slot
- How to create an `Appointment`
- How to search for `Appointments`