# FHIR RESOURCES

## Common Resources
### Binary

## Relationships

### Patient -- ImagingStudy

#### Outline v2023-10-17

![image](/fhir/01-fhir-resources/imagingstudy-01.png)

#### ImagingStudy Resource

Representation of the content produced in a DICOM imaging stidy. A study comprises a set of series, each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or produced in a common context. A series is of only one modality (e.g., X-ray, MR, CT, ultrasound), but a study may have multiple series of different modalities.

##### Scope and Usage
ImagingStudy provides information on a Dicom imaging study, and the series and imaging objects in that study. It also provides information on how to retrieve that information (in a native DICOM format, or in a rendered format, such as JPEG). ImagingStudy is used to make avaliable information about all parts of a single DICOM study.

This resource provides mappings of its elements to DICOM attributes. DICOM attributes are identified by a 32-bit tag, presented in canonical form as two four-digit hexadecimal values within parentheses and separated by a comma, e.g. (0008, 103E). The name and value representation (data type) of each attribute can be found in [DICOM Part 6 Data Dictionary](http://medical.nema.org/medical/dicom/current/output/html/part06.html). The use of the attributes in the context of information objects, including detailed description of use, can be found in [DICOM Part 3 Information Object Definitions](http://medical.nema.org/medical/dicom/current/output/html/part03.html). Attributes used in the DICOM query information models, such as `Number of Instances in Study`, can be found in [DICOM Part 4 Annex](http://medical.nema.org/medical/dicom/current/output/html/part04.html#chapter_C).

ImagingStudy provides access to significant DICOM information but will only eliminate the need for DICOM query (e.g. QIDO-RS) in the simplest cases. The DICOM instances are not stored in the ImagingStudy resource; use of a `DICOM WADO-RS server` or other storage mechanism is needed.

An ImagingStudy SHALL reference one DICOM Study, and MAY reference a subset of that Study. More than one ImagingStudy MAY reference the same DICOM Study or different subsets of the same DICOM Study.

##### Boundaries and Relationships

- Use the [Binary](#binary) resource to store arbitrary content.


#### Q&A for Dicom study
- Q1: What is a Dicom study? Is it a subject folder in a SPARC dataset?
- Q2: What are Dicom series? Are they sample folders in a SPARC dataset subject folder?
- Q3: What are instances? Are they dicom files in a SPARC dataset sample folder?