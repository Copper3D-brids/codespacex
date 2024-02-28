# FHIR Profiling training

FHIR is a big standard, flexible enough to support a large number of use cases. Profiles are important to limit the flexibility [of FHIR] for a few given use cases. In a project, you will make profiles to ensure that you define the resources  and the constraints on these resources specific to the use case. - `Ewout Kramer, FHIR co-creator and CTO of Firely`.

## Get started with profiling

### The terms "profile" and "profiling"

- A `profile` is a set of constraints on a FHIR resource or data type, or another FHIR profile. The term is however also colloquially used to refer to an implementation guide or a conformance package.

- The term `profiling` refers to the act of applying constraints to FHIR structures, and authoring other FHIR Conformance resources to define the set of specific conformance rules for your context. Applying constraints leads to the creation of a FHIR Profile.

- Constraints can also be applied to existing profiles. These "profiles on profiles" are called `derived profiles`. These profiles are made by further constraining profiles that have been made by yourself of by someone else, the so-called base profile.

### Canonical URL

Every FHIR conformance resource you create will need to have a canonical URL. This is a globally unique identification for that resource.

There are three nice things that a canonical URL allows the author to communicate:

- It is common practice to use the website domain of the organization that maintains the FHIR conformance resource, to indicate who is responsible for it. For example, the canonical URLs for conformance resources from HL7 all start with: `http://hl7.org/fhir/`.

- It makes it easier to avoid conflicts with other authors, since they will never create a canonical URL that starts with the same base.

- Using a URL, it is possible to set up a documentation site, where that canonical resolves to if you would enter it in your browser.

Not all canonical URLs resolve directly to an actual wesite, and are therefore only used for identifying a conformance resource. The [Simplifier.net](https://simplifier.net/) platform can resolve the canonical URLs of all resources from the projects uploaded there. Click [UsCore.Patient](https://simplifier.net/packages/hl7.fhir.us.core/6.1.0/files/2080253) to see canonical URL example.

**Note: Before you start to create profiles, tghink about a naming convention and document that as part of a list of 'profiling guidelines'.**

### Cardinality constraints

When you start creating a profile, the most common need is to change the cardinality of a field. Any field in the FHIR structure can be restricted. For example, when a field is optional in the base structure, you can make it mandatory by setting the minimum cardinality to 1. The maximum cardinality can be changed as well, to limit a list of elements to just 1 or any other number that is your maximum.

| Cardinality min | Cardinality max | Meaning                                       |
|-----------------|-----------------|-----------------------------------------------|
| 0               | 0               | element is forbidden                          |
| 0               | 1               | element is optional, and can only occur once  |
| 0               | *               | element is optional, and can repeat           |
| 1               | 1               | element is mandatory, and can only occur once |
| 1               | *               | element is mandatory, and can repeat          |

It is not possible to make mandatory fields optional, or change singular fields into a list. All data still needs to conform to the core FHIR specification, so you cannot make your model more lenient.

**Note that when you set the maximum cardinality to 0, you actually forbid that element to be in the data. Author with care, because this can be very restrictive!**

### Fixing values

Another common constraint is to fix a value for a field. You can use fixed values to specify a value that SHALL be exactly the value presented in the data. For example, in the profile for the blood pressure Observation, you could fix the value of the code field to the LOINC code that represents a blood pressure measurement. When fixing a value for a complex data type, such as CodeableConcept, we recommend to fix it on the lowest possible place in the hierarchy of that complex structure. This allows for more flexbility in the data values for the other fields of that structure.

### Exercise 1: create first profile

The Alpha Hospital wants to receive FHIR patient data from general practitioners. First, only administrative data of patients and their general practitioner are included. After some meetings the following requirements are specified.

                                                  
|                                                  |
|--------------------------------------------------|
| A patient has at least 1 family and 1 given name |
| Date of birth is mandatory                       |
| Only home addresses can be used                  |

- In Forge, select `New...` in the project window. This will show you the resource types that are available to create profiles on.
- Select the Patient resource type.
- Make sure to change the name and the canonical URL before you click "OK".
- The Patient resource structure will be rendered in the middle window. Click on a field in the structure to see the field details in the window on the right. Among others, you can see the cardinality, and there are buttons to change it.
- Use cardinality changes to reflect the requirments specified above.
- One of the requirements needs a fixed value. Click on the relevant field, and find the fixed value setting in the window on the right. Set a value by typing it into the text box.
- Save your profile.

![image](/fhir/02-fhir-ig/fhir-profiling/01-case1-create-proflie.png)

## Publishing your work

Your profiles form the base of your project. Togiether with other conformance resources, example resource instances and documentation, they make it clear how FHIR is used for your case or context. One of the reasons the StructureDefinition was added to the FHIR specification, is that you can easily share it with others to show what you expect from the data.

Once you have shard your profiles, others will be able to find the structures you have published and will be able to use them. Since they are in a computable format, they can be used for things like validating data or generating user interfaces.

### Publication platform

WHile it would be nice if a conformance resource can be retrieved by simply entering its canonical URL into a browser, not all organizations can or want to setup and maintain a server that can responds to such requests. For that reason, the [Simplifier.net](https://simplifier.net/) platform was created. On the Simplifier.net registry, you can create a project and publish your conformance resources, so others will be able to find them.

When you have used the Forge tool to author your profiles, it will be very easy to publish your work thanks to the integration of Forge with Simplifiler. But also when your StructureDefinitions are created by other means, for example with `FHIR Shorthand (FSH)` and `Sushi`, it is possible to upload them to your Simplifier project with just a couple of clicks.

### Example data

One of the things that will help others to use your profile correctly, is having a set of example resource instances. For each profile you create, try and create one or two good examples of resources that conform to your profile.