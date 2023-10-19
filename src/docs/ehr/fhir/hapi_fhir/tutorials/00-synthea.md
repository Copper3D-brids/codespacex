# Tutorial - Synthea dataset

## Download from Official website
- Download fhir r4 synthea data from their [official dataset](https://synthea.mitre.org/downloads).
  - But in this way we only can get 1000 samples, and we cannot change the samples.

## Generate from GitHub project
- Generate fhir r4 bundle data from [synthea github project](https://github.com/synthetichealth/synthea).
  - Requirements: Long-Term Support (LTS) Java 11 or 17.
  - Clone synthea project
  - **Notice**: every time re-run the generate command, should delete the `build` folder.
```bash
git clone https://github.com/synthetichealth/synthea.git
cd synthea
```
  - Generate data
    - Generating the population one at a time...
        ```bash
        ./run_synthea
        ```
    
    - Command-line arguments may be provided to specify a state, city, population size, or seed for randomization.

        ```bash
        ./run_synthea [-s seed] [-p populationSize] [state [city]]
        ```

  - Other options
```bash
./run_synthea -h   
> Task :run
Usage: run_synthea [options] [state [city]]
Options: [-s seed] [-cs clinicianSeed] [-p populationSize]
         [-ps singlePersonSeed]
         [-r referenceDate as YYYYMMDD]
         [-e endDate as YYYYMMDD]
         [-g gender] [-a minAge-maxAge]
         [-o overflowPopulation]
         [-c localConfigFilePath]
         [-d localModulesDirPath]
         [-i initialPopulationSnapshotPath]
         [-u updatedPopulationSnapshotPath]
         [-t updateTimePeriodInDays]
         [-f fixedRecordPath]
         [-k keepMatchingPatientsPath]
         [--config*=value]
          * any setting from src/main/resources/synthea.properties
Examples:
run_synthea Massachusetts
run_synthea Alaska Juneau
run_synthea -s 12345
run_synthea -p 1000
run_synthea -s 987 Washington Seattle
run_synthea -s 21 -p 100 Utah "Salt Lake City"
run_synthea -g M -a 60-65
run_synthea -p 10 --exporter.fhir.export=true
run_synthea --exporter.baseDirectory="./output_tx/" Texas
```

## FHIR dataset

- The FHIR R4 dataset will be automatically generated in the `output` folder.
- The dataset should has two json files contains basic infomations of all fhir resources, if we want load the dataset to FHIR server, we must load these two files.
  - `hospitalInformationxxxx.json`
  - `practitionerInformationxxxx.json`
- Then the dataset should be used to the remain tutorials.