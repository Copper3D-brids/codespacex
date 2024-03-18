# FHIR Certification Preparation

- FHIR Proficiency Exam
- Study Resources
    - [Study Tip Sheet: FHIR](https://www.hl7.org/documentcenter/public/training/HL7%20FHIR%20Proficiency%20Study%20Guide.pdf)
    - [HL7 FHIR R4 Practice Test](https://www.pathlms.com/hl7/courses/11151)
- Recommended Courses
    - [Comprehensive HL7 FHIR Proficiency Exam Preparation Course](https://www.hl7.org/training/fhir-prep.cfm)
        A four-week, self-paced course specifically designed to prepare those with a fair understand of FHIR concepts for taking the HL7 FHIR R4 Proficiency Exam.

    - [HL7 FHIR Fundamentals Course](https://www.hl7.org/training/fhir-fundamentals.cfm)
        This introductory, four-week online workshop is offered three times per year. It provides an in-depth overview of HL7 FHIR with hands-on experience and tutors assigned to each student. No prior experience required.

## Getting Started with FHIR

- How will information be exchanged?
    - [Foundation Module](https://hl7.org/fhir/R4/foundation-module.html#uses)
    - The Foundation Module maintains most of the basic documentation for FHIR specification.
        - Foundation Framework: Resource, DomainResource, Basic, Binary, Bundle.
        - Content Management Resources: Questionnaire, QuestionnaireResponse, List, Composition, DocumentReference, DocumentManifest.
        - Data Exchange Resources: OperationOutcome, Parameters, Subscription, MessageHeader, MessageDefinition
    - All the other modules depends on the foundation module.
    - The [Exchange module](https://hl7.org/fhir/R4/exchange-module.html) buildes on the foundation module by defining the recognized methods for exchange of resources.
    - The [Terminology module](https://hl7.org/fhir/R4/terminology-module.html#uses) provides the formal basis for using Concepts defined in Code Systems in the definitions.
    - The [Comformance module](https://hl7.org/fhir/R4/conformance-module.html) provides the basis for extending the foundation for national and local use.
    - The [Security & Privacy](https://hl7.org/fhir/R4/secpriv-module.html) provides the linking framework to external standards for security and privacy.
    - The [Implementation Support module](https://hl7.org/fhir/R4/implsupport-module.html) builds on the foundation to provide testing and reference implementations.

- How are terminologies being used?
    - [Terminology module](https://hl7.org/fhir/R4/terminology-module.html#uses)
        - The terminology module provides an overview and guide to the FHIR resources, operations, coded data types and externally-defined standard and FHIR-defined terminologies that are used for representing and communicating coded, structured data in the FHIR core specification and profiles. Collectively, these capabilities are used to provide the terminology service functionality required for supporting the use of coded data in FHIR resources throughout the specification as described in the other modules.

- How will the information be secured?
    - [Security and Privacy Module](https://hl7.org/fhir/R4/secpriv-module.html#uses)
        - **Authorization and Access Control**: A FHIR server should ensure that API access is allowed for authorized requests and denied for unauthorized requests.

- When is information exchanged?
    - [Workflow Module](https://hl7.org/fhir/R4/workflow-module.html)
    - In each workflow steps, it is more based on how to use Definitions (ActivityDefinition, PlanDefinition) to design your tasks in a workflow. And it is quite about how you define the data input and export.
    