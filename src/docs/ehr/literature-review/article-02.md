# Article 02

[SMART on FHIR: a standards-based, interoperable apps platform for electronic health records](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4997036/)

## SMART on FHIR Profiles
- based on `us core` FHIR specification.
- RxNorm: for medications.
- LOINC: for observation.
- SNOMED CT: for problems.

## SMART on FHIR Servers

Implementation entails creating EHR-specific logic to transform internal data structures to corresponding FHIR resources and with SMART-specified profiles.

## Payload validation

A FHIR tool includes some automated validation packages.