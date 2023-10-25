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

##### Implementation Notes

A referenced DICOM SOP instance could be:

- A single- or multi-frame, still or video image captured by a variety of imaging modalities, such as X-ray, MR, and ultrasound.
- A set of various preasentation parameters, including annotaction and markup.
- A set of measurements or a report, including radiation dose report and CAD analysis.
- An encapsulated PDF or CDA document.
- A list of instances, such as key `of interest` images, or instances to be `deleted`.
- Or other DICOM content.

DICOM Series Instance UID and SOP Instance UID use the `id` datatype, and are encoded directly. For example, an image with SOP Instance UID of `2.16.124.113543.1154777499.30246.19789.3503430045.1.1` is encoded in `ImagingStudy.series.instance.uid` as `2.16.124.113543.1154777499.30246.19789.3503430045.1.1`.

The ImagingStudy's DICOM Study Instance UID is encoded in the `ImagingStudy.identifier` element, which is of the `Identifier` datatype. When encoding a DICOM UID in an `Identifier` datatype, use the Identifier system of `"urn:dicom:uid"`, and prefix the UID calue with `"urn:oid:"`. Therefore, an ImagingStudy with DICOM Study Instance UID of `2.16.124.113543.1154777499.30246.19789.3503430046` is encoded as:

```json
{
  "identifier": {
    "system": "urn:dicom:uid",
    "value": "urn:oid:2.16.124.113543.1154777499.30246.19789.3503430046"
  }
}
```

The `study accession number` can also be encoded as an `Reference.Identifier` using the ServiceRequest Reference type and the `ACSN` identifier type, as follows:

```json
"basedOn": [
    "reference": {
        "type": "ServiceRequest",
        "identifier":{
            "type" : {
                "coding" : [
                    {
                        "system" : "http://terminology.hl7.org/CodeSystem/v2-0203",
                        "code" : "ACSN"
                    }
                ]
            },
            "system":"http://ginormoushospital.org/accession",
            "value":"GH334103"
        }
    }
]
```

###### ImagingStudy.endpoint

The ImagingStudy.endpoint elements and ImagingStudy.series.endpoint elements indicate network services that can be used to access the studies, series, or instances, for example, a DICOM `WADO-RS` server.

- An `ImagingStudy.series.endpoint` of a particular Endpoint.connectionType provides that service for that series, and all contained instances.

- An `ImagingStudy.endpoint` of a particular connection type provides that service for all series in that study that do not have a specified Endpoint of that type, and their contained instances.

That is, an ImagingStudy.series.endpoint overrides an ImagingStudy.endpoint of the same connection type. Systems can determine if a particular study, series, or instance is available or offline by interacting with the endpoint. Since each study, or individual series of a study can be stored on different imaging archive servers, per-series endpoints are required. For the identified services and use cases, all instances within a series would be stored together, and thus instance-level endpoints are not defined.

Different Endpoint connection types may have different capabilities, protocols or requirements; and the specified `Endpoint.address` may require manipulation. See below for the details on use of imaging-related Endpoint connection types.

**WADO-RS**

An `Endpoint.connectionType` of code `dicom-wado-rs`, system `http://terminology.hl7.org/CodeSystem/endpoint-connection-type`, identifies a DICOM WADO-RS service. The `Endpoint.address` identifies the HTTP(S) service base url. That is, only the scheme, authority and path are included. Sub-services, such as `study`, shall not be specified. The path shall not contain a trailing slash.

The DICOM WADO-RS (Web Access to DICOM Objects, RESTful mode) service uses a RESTful approach to instance retrieval. This service allows for retrieval of native DICOM SOP instances, or instances `rendered` into other formats, including JPEG and MPEG. The media type of a response is specified by the request Accept header (preferred); or, by the `accept` query parameters. Supported media types depend on the capabilities of the WADO-RS server and the classification of the instance as `single frame`, `multi-frame`, `video`, `text`, or `other`. The WADO-RS service also allows retrieval of study or series level information.

The path to retrieve a DICOM instance is constructed by appending the appropriate sub-resource paths to the `Endpoint.address` value.

For example, using the following information in a fictional ImagingStudy resource:

- the WADO-RS service base url of `https://pacs.hospital.org/wado-rs` found in an `ImagingStudy.endpoint.address`,
- the DICOM Study Instance UID of `1.2.250.1.59.40211.12345678.678910` found in an `ImagingStudy.identifier` having `Identifier.system` of `urn:dicom:uid`,
- the DICOM Series Instance UID of `1.2.250.1.59.40211.789001276.14556172.67789` found in `ImagingStudy.series.uid`, and
- the DICOM SOP Instance UID of `1.2.250.1.59.40211.2678810.87991027.899772.2` found in `ImagingStudy.series.instance.uid`

We can construct the WADO-RS URL to issue an HTTP GET for a native DICOM PS3.10 instance file (if consistent with the Accept header):

```
https://pacs.hospital.org/wado-rs/studies/1.2.250.1.59.40211.12345678.678910/series/1.2.250.1.59.40211.789001276.14556172.67789/instances/1.2.250.1.59.40211.2678810.87991027.899772.2
```

Query parameters on the "rendered" sub-resource can control other aspects of the rendering: the rendered dimensions, the quality (compression ration), the region of interest to render, the brightness/contrast (window center/width) adjustments, and whether to "burn" patient or study demographics into the rendered result. Specific frames of a multi-frame instance may be retrieved using the frames sub-resource.

For example, provided the Accept header indicates a preference for image/jpeg (rendered to a size of 400 columns by 400 rows) of a region extending from the top-left corner of the original image to 1000 pixels across and 3000 pixels right, to be retrieved (additional sub-resource and parameters emphasized):

```
https://pacs.hospital.org/wado-rs/studies/1.2.250.1.59.40211.12345678.678910/series/1.2.250.1.59.40211.789001276.14556172.67789/instances/1.2.250.1.59.40211.2678810.87991027.899772.2/rendered?viewport=400,400,0,0,1000,3000
```

If the WADO-RS service supports the DICOMweb thumbnail resource, a representative image can be requested, for example, to display alongside the study. The URL would look as follows:

```
https://pacs.hospital.org/wado-rs/studies/1.2.250.1.59.40211.12345678.678910/thumbnail
```

For further details on DICOM WADO-RS capabilities including additional redering parameters, see [DICOM PS 3.18](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/PS3.18.html).

**WADO-URI**

An `Endpoint.connectionType` of code `dicom-wado-uri`, system `http://terminology.hl7.org/CodeSystem/endpoint-connection-type`, identifies a DICOM WADO-URI service. The `Endpoint.address` identifies the HTTP(S) service base url. That is, only the scheme, authority and path are included. Neither a question mark ("?") nor any query parameters shall be included.

The DICOM WADO-URI (Web Access to DICOM Objects, URI mode) service uses HTTP query parameter syntax. This service allows for retrieval of native DICOM instances, or instances "rendered" into other formats, including JPEG AND MPEG. The media type of a response is specified by the request Accept header (preferred); or, by the contentType query parameter. Supported media types depend on the classfication of the instance as `single frame`, `multi-frame`, `video`, `text`, or `other`.

The query to retieve a DICOM instance is constructed by appending the appropriate query parameters to the `Endpoint.address` value.

For example, using the following information in a fictional ImagingStudy resource:

- the WADO-URI service base url of `https://pacs.hospital.org/wado-uri` found in an `ImagingStudy.endpoint.address`,
- the DICOM Study Instance UID of `1.2.250.1.59.40211.12345678.678910` found in `ImagingStudy.identifier` having `Identifier.system` of `urn:dicom:uid`,
- the DICOM Series Instance UID of `1.2.250.1.59.40211.789001276.14556172.67789` found in `ImagingStudy.series.uid`, and
- the DICOM SOP Instance UID of `1.2.250.1.59.40211.2678810.87991027.899772.2` found in `ImagingStudy.series.instance.uid`

we can contruct the WADO-URI URL to issue an HTTP GET for a native DICOM PS3.10 instance file (if consistent with the Accept header):

```
https://pacs.hospital.org/wado-uri?requestType=WADO&studyUID=1.2.250.1.59.40211.12345678.678910&seriesUID=1.2.250.1.59.40211.789001276.14556172.67789&objectUID=1.2.250.1.59.40211.2678810.87991027.899772.2
```

Additional query parameters can control other aspects of the rendering including rendered dimensions, quality (compression ratio), the region of interest within the image to render, brightness/contrast (window center/width) adjustments, whether to “burn” patient or study demographics into the rendered result, and which frame of a multi-frame instance to retrieve.

For example, provided the Accept header indicates a preference for image/jpeg, the example above can be extended with parameters that cause a JPEG thumbnail (100 columns by 100 rows) of the left half of the image to be retrieved (additional parameters emphasized):

```
https://pacs.hospital.org/wado-uri?requestType=WADO&studyUID=1.2.250.1.59.40211.12345678.678910&seriesUID=1.2.250.1.59.40211.789001276.14556172.67789&objectUID=1.2.250.1.59.40211.2678810.87991027.899772.2&rows=100&columns=100&region=0,0,0.5,1
```

For further details on DICOM WADO-URI capabilities including additional rendering parameters, see [DICOM PS 3.18](https://dicom.nema.org/medical/dicom/current/output/chtml/part18/PS3.18.html).

**Addition DICOM attributes**
Some imaging uses may reuire information beyond what is present in an ImagingStudy resource. Many of the DICOM patient and study level attributes are found in the FHIR Patient, Procedure, or other resources which are referenced from an ImagingStudy instance. Other DICOM content may be transformed into other FHIR resources, such as DiagnosticReports or Observations, which are not directly referenced, but may be easily found.

Although many ImagingStudy consumers are expected to need only the DICOM information contained in FHIR resources, some may need additional DICOM attriutes. For these cases, which by their bature involve more iamging-aware consumers, the most flexible solution is to leverage the DICOM WADO-RS metadata-only endpoint to retrieve an XML or JSON representation of the DICOM study, series, instance, or frame information.

A benefit of using the metadata endpoint in this way is that the ImagingStudy creator does not need to know each of the attributes that each of the (current or future) ImagingStudy consumers is (or will be) interested in.

- Example Metadata Retrieval

A client retrieves the following ImagingStudy:

```json
{
  "resourceType": "ImagingStudy",
  "id": "example-xr",
  "identifier": [
    {
      "use": "official",
      "system": "urn:dicom:uid",
      "value": "urn:oid:2.16.124.113543.6003.1154777499.30246.19789.3503430046"
    }
  ],
  ...
  "series": [
    {
      "uid": "2.16.124.113543.6003.1154777499.30246.19789.3503430045.1",
      ...
      "endpoint": [
        {
          "reference": "Endpoint/example-wadors"
        }
      ]
      ...
    }
    ...
  ]
}
```

[Full example can be found on here](https://www.hl7.org/fhir/imagingstudy-example-xr.json.html)

The client retrieves the referenced Endpoint (see [Example WADO-RS](https://www.hl7.org/fhir/endpoint-example-wadors.json.html)) and extracts the WADO-RS URL: `https://pacs.hospital.org/wado-rs`.

The client uses the WADO-RS URL, the identifier.value and the series.uid to construct a WADO-RS metadata request:

```
GET https://pacs.hospital.org/wado-rs/studies/2.16.124.113543.6003.1154777499.30246.19789.3503430046/series/2.16.124.113543.6003.1154777499.30246.19789.3503430045.1/metadata HTTP/1.1
Accept: application/dicom+json
```

The WADO-RS server then returns the complete DICOM metadata for the requested series.


#### Identifier FHIR DataType

Identifier systems are URIs that may be used in the system element of the Identifier datatype. 

[HL7 Terminology](https://terminology.hl7.org/identifiers.html) provides a registry of Identifier systems which are actively curated by HL7 International. If a URI is defined in HL7 Terminology, it **SHOULD** be used in preference to any other Identifier.system. If the URI was defined in HL7 Terminology prior to an official release of the FHIR core specification, those URIs **SHALL** be used in preference to any other Identifier.system. E.g, all system URIs defined on terminology.hl7.org prior to the release of FHIR R5 **SHELL** be used in systems claiming conformance to FHIR R5.

Many identifier systems are 'local', for example the identifiers used for employee numbers, local medical record numbers, local order and encounter numbers, etc. The system URIs for such identifiers are generally determined and managed by the issuing system. However, `shared` identifiers that are used across a wide variety of systems, such as license numbers, government-assigned identifiers, etc. need to have consistent URIs. In most cases, the assigners of these identifiers will not have published an official URI.

If an identifier system for a `shared` identifier is not listed in HL7 Terminology, implementers **SHOULD** (and HL7 international published specifications **SHALL**) follow the process for determining Identifier.system URIs defined by the HL7 Terminology Authority, as documented [here](https://confluence.hl7.org/display/TA/Validating+and+Requesting+Identifiers+for+an+External+Code+Systems+and+Identifier+Systems).

See also the [list of known coding systems](https://www.hl7.org/fhir/terminologies-systems.html) that can be used in the system element of the [Coding](https://www.hl7.org/fhir/datatypes.html#Coding) datatype.

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
