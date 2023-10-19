# Tutorial - FHIR Patient Resource

- Tutorial code on GitHub [hapi-py-fhir-tutorials -- patientOpeartor.py](https://github.com/Copper3D-brids/hapi-py-fhir-tutorials/blob/main/patientOperator.py).

- Currently, it is a **private** repository, will open source later...

## Background
 Meet John Thompson. He is a 36 year old (date of birth is 08-02-1982) man from `Philadelphia`. He is thinking of visiting our clinical center because of some health problems. John calls our center and asks if he can visit us.

 Let's check if he has visited our center before.

## Setup environment

- Prepare docker hapi fhir server image from `[docker hub](https://hub.docker.com/r/hapiproject/hapi)` or from [GitHub](https://github.com/hapifhir/hapi-fhir-jpaserver-starter) & run hapi fhir server via `docker-compose up`.
- Clone the tutorial repo.

```bash
git clone https://github.com/Copper3D-brids/hapi-py-fhir-tutorials.git
cd hapi-py-fhir-tutorials
```
- Prepare python 3.9+ environment, if you are using `conda`, others same.

```bash
conda create --name hapi-fhirpy python=3.9
conda activate hapi-fhirpy
pip install fhirpy
```

- Config the `Hapi-fhirpy env` in `prcharm settings` or run below code to start

```bash
python main.py
```


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

```python
patients = await client.resources("Patient").fetch()
print(len(patients))
```
We built a simple query without any filters and sortings. Executing this query we load all patient records which are represented as dict-like object (an instance of `FHIRResource`).

As we can see we've already get all patients output above, all patients are in a list. As for each patients, to get more details, we can get some fields using `get()` and `get_by_path()` methods.

`get(field_name)` method receives field name as the first argument.
`get_by_path(path)` method receives path as string (`name.0.given.0`) or as a list (`['name', 0, 'given', 0]`)

Let's try to iterate over `patients` list and display their ids and full name.

```python
for patient in patients:
  print('{0} {1} {2}'.format(
    patient.get('id'),
    patient.get_by_path('name.0.family')
    patient.get_by_path('name.0.given.0')
  ))
```

### Sorting results

Also, we can sort the result, for example, by name using `sort` method.

Please, pay attention, that `sort` receives multiple parameters and all possible parameters described in the [official FHIR specification](http://hl7.org/fhir/R4/patient.html#search).

```python
patients = await client.resources('Patient').sort('name').fetch()
```

As we can see, the list is very long and it may be too difficult to find the paticular patient especially if we have thousands of entires.

To minimize the result, FHIR API provides special search tools.

### Search through patients' resources

The `Patient` resource has many search parameters. Yopu can read more about them in the [official FHIR specification](http://hl7.org/fhir/R4/patient.html#search).

For searching we should use `search()` method on a search set. If we wnat to find, for example, all patients with the first name `Jhon` and the last name `Thompson` we should use intersection search, passing list of values, for example, `search(name=['John', 'Thompson'])`. This is known as an **AND** search parameter. If we wanted to find all patients with name `John` or `Carl`, we would use `search(name='John,Carl')`. This is known as an **OR** search parameter.

Let's try to search for a patient by a parameter `name`.

This param is used for searching by string fields in the patient's name, including family, given, prefix, suffix, and/or text.

```python
patients = await client.resources('Patient').search(name=['John', 'Thompson']).fetch_all()
```

We found nothing. Maybe his record has a type in the name. Now let's try to search by other parameters, for example, by brith date. The search parameter has name `brithdate` according to the [FHIR specification](http://hl7.org/fhir/R4/patient.html#search)

```python
patients = await client.resources('Patient').search(birthdate='1982-08-02').fetch_all()
```

Also, we can try to find all patients who wre born in `Philadelphia`. For this purpose we should use `address` search param.

```python
patients = await client.resources('Patient').search(address-'Philadelphia').fetch_all()
```

However, we didn't find our client in the FHIR server system. Thus, we can create a record for him. But before we do that, let's learn more about how different fields should be stored.

## Patient resource structure

Let's try to load one patient resource and understand this stucture.

We don't need to load all patient's records because they have a similar structure, so we can load only one record using `first` method on the search set.

This method returns only one resource representation (an instance of `FHIRResource`).

```python
patient = await client.resources('Patient').first()
```

As you know, FHIRResource is a dict-like object. It means, we can display some fields from the resource using an access by key.

```py
patient['id']
```

Let's see how the patient name looks.

### Name

The name is represented using `HumanName` type.

Names might be changed and people may have different names in different contexts. So, a patient name is always represented as a list even if the patient has only one name.

The most popular fields in the structure are:

- given - given names, not only first name (e.g., John). It should ne a list of names, even if the person has only one.
- family - family name (e.g., Tompson).
- use - in which context this name applies.
- text - text representation of the full name (e.g., John Tompson).

More information you can find more information in the [FHIR HumanName specification](https://www.hl7.org/fhir/datatypes.html#humanname).

```py
pprint(patient['name'])
```

### Address

The address type may be used to convey addresses for use in delivering mail as well as for visiting locations which might not be valid for mail delivery. There are a varity of address formats defined around the world.

More information you can find more information in the [FHIR Address specification](https://www.hl7.org/fhir/datatypes.html#address).

```py
pprint(patient['address'])
```

### Contect information

Contact information is stored in `telecom` field. This fields contains details for all kinds of technology-mediated contact points for a person, including telephone, email, etc.

```py
pprint(patient['telecom'])
```

## Editing patient resource

The `Patient` resource can include different fields, which are described in the [official FHIR specification](http://hl7.org/fhir/R4/patient.html#resource). Now we are familiar with some of them: `name`, `address`, and `telecom`. Let's create a new record for the patient.

### Create a new patient record

We can create a new instance of resource using `resource` method. This method creates a new resource representation in the memory.

```py
patient = client.resource('Patient')
```

This line doesn't save the patient to the database. So, we can change any attributes of resource before it will be really saved.

```py
patient['name'] = [
  {
    'given':['John'],
    'family':'Thompson',
    'use': 'official',
    'prefix': ['Mr.'],
  }
]
```

Also we can specify date of birth, using `birthDate` field. We should pass a date in format `year-month-day` (`yyyy-mm-dd`). 

```py
patient['brithDate']='1985-09-01'
```

To save the resource, we should use `save` method.

```py
await patient.save()
```

This line doesn't return anything in case of success but mutates the patient resource. Now, the `patient` has an additional **meta information** and **unique ID**. We can look at this information using attributes `id` and `meta`.

```py
patient['id']
patient['meta']
```

### Edit a patient record

Finally, we should update the patient's details.

Let's edit the address: the new one is `1818 Market St, apartment 100, Philadelphia, PA 19103`.

The `Address` format is on [FHIR Address specification](https://www.hl7.org/fhir/datatypes.html#address).

```py
patient['address'] = [
  {
    "line": "1818 Market St, apartment 100",
    "city": "Philadelphia",
    "postalCode": "19103",
    "country": "3166-2",
    "use": "home",
    "type":"physical"
  }
]
```

And set the new telephone number: (215) 352-3801. Look the [FHIR Telephone specification](http://hl7.org/fhir/R4/datatypes.html#ContactPoint)

```py
patient['telecom'] = [
  {
    "system": "phone",
    "value": "(215) 352-3801",
    "use": "work"
  }
]
```

And finally, save the changes to the HAPI FHIR server database.

```py
await patient.save()
```

### Search & Check laboratory results

Now, we need to make sure that we have our patient record in the database.

Let's try to search for the patient again. For this operation we should use the same query as we did it before.

```py
patients = await client.resources('Patient').search(name=['John', 'Thompson']).fetch_all()

pprint(patients)
```

If you followed the instructions, you should have the following fields in the output:

- id
- resourceType
- birthDate
- name
- telecom
- address

### Delete resource

Now, we've already checked the new Patient resource exsited in our database. 

But, what if we create a wrong Patient resource and how to delete it? 

Let's try to delete a non-relational Patient resource (without other resources' references).

**Note:** If the delete method success, it doesn't return anything, but the resource will be deleted from database.

```py
patientResourceSearchSet = client.resources('Patient')
patients = await patientResourceSearchSet.search(name=['John', 'Thompson']).fetch_all()

for patient in patients:
  await patient.delete()

```

Finally, the Patient resource be deleted in the database.

## Summary

From this laboratory work we learned how to:

- load patients from the HAPI FHIR server.
- search by different fields.
- sort the results.
- display different resource's attributes.
- create patient record.
- edit patient record.
- delete a non-relational resource.