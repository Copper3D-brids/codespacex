# FHIR RESOURCES

## Common Resources
### DocumentReference
### Binary

## Relationships

### Patient -- ImagingStudy

#### Outline v2023-10-17

![image](/fhir/01-fhir-resources/01-imagingstudy.png)

#### ImagingStudy Resource

Look [ImagingStudy Resource](https://www.hl7.org/fhir/imagingstudy.html) on FHIR.

Representation of the content produced in a DICOM imaging stidy. A study comprises a set of series, each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or produced in a common context. A series is of only one modality (e.g., X-ray, MR, CT, ultrasound), but a study may have multiple series of different modalities.

##### Scope and Usage
ImagingStudy provides information on a Dicom imaging study, and the series and imaging objects in that study. It also provides information on how to retrieve that information (in a native DICOM format, or in a rendered format, such as JPEG). ImagingStudy is used to make avaliable information about all parts of a single DICOM study.

This resource provides mappings of its elements to DICOM attributes. DICOM attributes are identified by a 32-bit tag, presented in canonical form as two four-digit hexadecimal values within parentheses and separated by a comma, e.g. (0008, 103E). The name and value representation (data type) of each attribute can be found in [DICOM Part 6 Data Dictionary](http://medical.nema.org/medical/dicom/current/output/html/part06.html). The use of the attributes in the context of information objects, including detailed description of use, can be found in [DICOM Part 3 Information Object Definitions](http://medical.nema.org/medical/dicom/current/output/html/part03.html). Attributes used in the DICOM query information models, such as `Number of Instances in Study`, can be found in [DICOM Part 4 Annex](http://medical.nema.org/medical/dicom/current/output/html/part04.html#chapter_C).

ImagingStudy provides access to significant DICOM information but will only eliminate the need for DICOM query (e.g. QIDO-RS) in the simplest cases. The DICOM instances are not stored in the ImagingStudy resource; use of a `DICOM WADO-RS server` or other storage mechanism is needed.

An ImagingStudy SHALL reference one DICOM Study, and MAY reference a subset of that Study. More than one ImagingStudy MAY reference the same DICOM Study or different subsets of the same DICOM Study.

##### Boundaries and Relationships
Use the ImagingStudy resource to store details of an entire DICOM Study and associated information.

- Use the [DocumentReference](#documentreference) resource to store non-DICOM images, video, or aydio with relevant metadata.
- Use the [Binary](#binary) resource to store arbitrary content.
- Use the [ImagingSelection](#imagingselection) resource to store a reference to a specific set of DICOM images, frames or other DICOM instances.

##### Resource Content
[Edit ImagingStudy MindMap](#imagingstudy-resource-mindmap)
![image](/fhir/01-fhir-resources/03-imagingstudy-resource.png)

##### Terminology Bindings
Have a look at [ImagingStudy Resource Terminology Bindings](https://www.hl7.org/fhir/imagingstudy.html#tx).                          



#### ImagingSelection Resource
#### Endpoint Resource
Look [Endpoint Resource](https://www.hl7.org/fhir/endpoint.html) on FHIR.

The technical details of an endpoint that can be used for electronic services, such as for web services providing XDS.b, a REST endpoint for another FHIR server, or a s/Mime email address. This may include any security context inofrmation.

##### Scope and Usage
An endpoint describe the technical details of a location that can be connected to for the delivery/retrieval of information. In this part, the `Endpoint Resource` is used to store `Orthanc Pan server` information for ImagingStudy resopurce. Allow user can get the raw DICOM data from ImagingStudy endpoint attribute.

- DICOM/imaging: Location of where to query, retrieve or store imaging content and metadata (QIDO-RS, WADO-RS, WADO-URI, STOW-RS).

![image](/fhir/01-fhir-resources/02-endpoint-resource.png)


#### Q&A for Dicom study
- Q1: What is a Dicom study? Is it a subject folder in a SPARC dataset?
- Q2: What are Dicom series? Are they sample folders in a SPARC dataset subject folder?
- Q3: What are instances? Are they dicom files in a SPARC dataset sample folder?

### Edit MindMap
#### ImagingStudy Resource MindMap

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" sandbox="allow-scripts allow-popups allow-forms allow-modals allow-same-origin" width="100%" height="450" src="https://boardmix.cn/app/share/CAE.CJq_sA0gASoQmCDoLmCtoQET8F8m5ZSH1TAGQAE/jWFwHv" allowfullscreen></iframe>

#### Endpoint Resource MindMap
<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" sandbox="allow-scripts allow-popups allow-forms allow-modals allow-same-origin" width="100%" height="450" src="https://boardmix.cn/app/share/CAE.CJq_sA0gASoQPIxAsCLNWgF419R7024RNzAGQAE/jWFwHv" allowfullscreen></iframe>