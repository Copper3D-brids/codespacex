# OMOP on FHIR

## EHR FHIR & OMOP

![image](/omop/omop-04.png)

## Observational Medical Outcomes Partnership (OMOP)

### what are difference to FHIR, what implementations are there e.g. python API?

- [OMOP CDM](https://ohdsi.github.io/CommonDataModel/) is an open community data standard, designed to standardize the structure and content of observational data and to enable efficient analyses that can produce reliable evidence.
- The OMOP is no longer maintained, and OHDSI is carrying forward the OMOP legacy.
- OMOP mainly focus on Observational data (structured data). FHIR supports multiple resources (Patient, Observation, ImagingStudy) structured and non-structured data.
  - For the dicom images, they have a solution: [Oncology-CDM extension](https://github.com/OHDSI/OncologyWG/wiki). park et al. employed this approach [[5]](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8790584/)
- The key to OMOP CDM is its standardized [vocabularies](https://www.ohdsi.org/web/wiki/doku.php?id=documentation:vocabulary).
- FHIR focuses on providing a secure interoperable environment for health service providers to exchange data and for application resources to access it in place while OHDSI and the OMOP CDM create an environment to support data research [[1]](https://www.ohdsi.org/web/wiki/lib/exe/fetch.php?media=resources:ohdsionfhir_gatech.pdf).
- Analysis tools for OMOP CDM [[2]](https://www.bmd-software.com/news/omop-cdm-an-approach-for-standardizing-health-data/):
  - [Achilles](https://github.com/OHDSI/Achilles): It is a R tool to generate report based on OMOP CDM data.
  - [Atlas](https://github.com/OHDSI/Atlas): It is a webapp(js) uses webapi to generate visualizations and reliable evidence based on Achilles reports.
  - Population-Level Estimation: enable comparisons between cohorts at the treatment level.
  - Patient-Level Prediction: predict outcomes from features extracted from the patients, for example, by training Deep Learning models.
- Implementation:
  - convert EHR to a database file via different database platforms (MySQL, Oracle, PostgreSQL)
  - Using [restful API](http://webapidoc.ohdsi.org/index.html#2146184560), [OHDSI WebAPI](https://github.com/OHDSI/WebAPI) has a server that allow user deploy it locally.
  - Seems no python API/tools be designed to connect their server.

### What is it used for - which domain - clincial/research?

- It is a standard and framework for EHR Data holders, to improve both the quality of healthcare data analytics as well as the usefulness of healthcare data to these stakeholders.
- Researchers (epidemiologists, statisticians, biomedical informaticists, computer scientists, and clinicians ) -> generate evidence from observational health data.
- [Four steps to convert data to OMOP Common Data Model (CDM)](https://www.ohdsi.org/web/wiki/doku.php?id=documentation:etl_best_practices):

  - Data experts and CDM experts together design the ETL(Extract, Transform, Load)
  - To achieve this can use two tools: [White Rabbit](https://www.ohdsi.org/web/wiki/doku.php?id=documentation:software:whiterabbit) and [Rabbit-in-a-Hat](https://www.ohdsi.org/web/wiki/doku.php?id=documentation:software:whiterabbit#rabbit-in-a-hat) designed by OHDSI team.
  - People with medical knowledge create the code mappings
  - The OMOP has its own Vocabulary, if the source data (EHR) uses different coding system, the designer should mapping the EHR stuffs to OMOP vocabulary manually via a tool [Usagi](https://www.ohdsi.org/web/wiki/doku.php?id=documentation:software:usagi).
  - A technical person implements the ETL
  - All are involved in quality control
  - [ETL](https://www.bmd-software.com/news/omop-cdm-an-approach-for-standardizing-health-data/):

    <img width="1059" alt="image" src="/omop/omop-01.png">

### How extensively is it adopted?

- FHIR is intended for the exchange of data between different institutions. Whereas OMOP provides a common data format to unify data from different databases [[3]](https://www.nature.com/articles/s41597-022-01792-7#:~:text=OpenEHR%20on%20the%20other%20side,unify%20data%20from%20different%20databases.). - Github stars: 117

### OMOP on Fhir[[1]](https://www.ohdsi.org/web/wiki/lib/exe/fetch.php?media=resources:ohdsionfhir_gatech.pdf):

- Architecture: [OHDSI environment: [WebAPI](https://github.com/OHDSI/WebAPI)] -> [OMOP on FHIR: HAPI FHIR Server + OMOP v5 data repository + FHIR DSTU2(quite old) seems move on [v3](https://gitlab.miracum.org/miracum/etl/batch/deployment) now?] -> [SMART on FHIR]

  - Platform architecture Fig1:

    <img width="479" alt="image" src="/omop/omop-02.png">

  - issues:

    - Some key FHIR elements: patient demographic information, not in OMOP CDM.

  - Data Mapping [[1]](https://www.ohdsi.org/web/wiki/lib/exe/fetch.php?media=resources:ohdsionfhir_gatech.pdf): - OMOP to FHIR (DSTU 2)
    <img width="987" alt="image" src="/omop/omop-03.png">

  - FHIR to OMOP:
    - Because the FHIR covers a lot of information than OMOP CDM, so they decide to ignore the elements that cannot be mapped to the OMOP CDM unless FHIR requires these in the first version[[1]](https://www.ohdsi.org/web/wiki/lib/exe/fetch.php?media=resources:ohdsionfhir_gatech.pdf).

### Relevant study:

- Data infrastructures for AI in medical imaging: a report on the experiences of five EU projects [[4]](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10164664/).
