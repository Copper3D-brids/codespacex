# Guideline for SODA

## Introduce

[SODA ](https://docs.sodaforsparc.io/docs/intro)(Software to Organize Data Automatically) is a desktop (MacOS, Windows, and Ubuntu) GUI software for creating SPARC SDS dataset.

### Perparation for SODA

- A `ORCID iD` for each dataset contributor, if you don't have you can register one on [here](https://orcid.org/register), or you can [`Access through your institution`](https://orcid.org/institutional-signin) to get the ID.
- A `pennsieve` account, if you don't have you can register one on [here](https://app.pennsieve.io/sign-up).
- Download the SODA follow by the install guideline [here](https://docs.sodaforsparc.io/docs/getting-started/download-soda).
  After you download the SODA and run it correctly, it will automatically ask you to download a pennsive plugin, then you can just click to download it. At last, you will be ask to login in your pennsieve account in SODA, then it is ready for you to start creating a dataset on SODA.

### Metadata Files in SPARC SDS Dataset

- Metadata files requirments:
  - Mandatory high-level metadata files: `submission`, `dataset_description`, `README`
  - Dataset-specific high-level metadata files: `subjects`, `samples`, `CHANGES`
  - Code-related metadata files: `code_description`, `code_parameters`
- Guide structure, rules and examples for metadata files:
  - [`dataset_description`](https://docs.sodaforsparc.io/docs/how-to/how-to-structure-the-dataset-description-metadata-file)
  - [`subjects`](https://docs.sodaforsparc.io/docs/how-to/how-to-structure-the-subjects-metadata-file)
  - [`smaples`](https://docs.sodaforsparc.io/docs/how-to/how-to-structure-the-samples-metadata-file)
  - [`manifest`](https://docs.sodaforsparc.io/docs/how-to/how-to-structure-the-manifest-metadata-file)
  - [`submission`](https://docs.sodaforsparc.io/docs/how-to/how-to-structure-the-submission-metadata-file)
- Informations for each folder data
  - `Primary folder/data`: refers to all data collected from subjects/samples (e.g, time series data, tabular data, clinical imaging data, genomic, metabolomic, or microscopy data). The data generally have been minimally processed so they are in a form ready for analysis.
  - `Source folder/data`: refers to unaltered, raw files from an experiment. For example, this may include the "truly" raw k-space data for a Magnetic Resonance (MR) image that has not yet been reconstructed (in this case, the reconstructed DICOM or NIFTI files would be found within the primary folder).

## Implementation

SODA has two modes to create a dataset: [`End to End Curation`](https://docs.sodaforsparc.io/docs/guided) and [`Free Form Curation`](https://docs.sodaforsparc.io/docs/Freeform%20Mode/overview). Based on the SODA official best practice, they recommend if you are create a new dataset may need to choose End to End mode, if you are planning to edit and making a few changes on exsiting dataset, they suggest to use Free Form Curation mode.

- `End to End Curation mode`, it provide very detailed and step-by-step guideline in the software, when you create a dataset via this mode.

  - Guide user to choose which metadata files and dataset folders they need in their dataset.
  - If user already have metadata files, they can upload it directly, otherwise they can follow the guideline to create a new one.
  - Make forms for each metadata file, and highlight the required elements with `*`.
  - If some elements have relationship among different metadata files/forms, it will give a reminder to user or will automatically fill in each form. E.g, the `Funding` element in submission metadata is related to the `Funding` element in dataset_description metadata, so when we edit on dataset_description the SODA will give us a reminder about that.
  - Supports user to create folders in dataset structure folders. Assume we have `primary` , `derivative`, `docs`, `code`, and `source` folders in the dataset structure. We can very easily to achieve these things: - Create, edit and delete folders/files under these above folders. - Copy and Paste `pool` , `Subject` or `Sample` folders into `primary`, `derivative` and `source` folders. But the structure order should absolutely like: pool/subject/sample. And copy files into dataset samples folder.
    ![image](https://github.com/Copper3D-brids/EHR/assets/80797317/954f1273-b4e3-4026-bd7b-eb55ca71b4a2) - It will automatically generate the manifest metadata files for each folders (`primary` , `derivative`, `docs`, `code`, and `source`), if you've already copied files/folders into them.

- `Free Form Curation mode`, it don't have too much detailed guideline details for user.
  - If you are familar with SPARC dataset and the requirements in each metadata files, you can create it in this way very fast.
  - It allows (must) user to upload the metadata files, but would not automatically generate some elements for them. (subject_id, sample_id and pool_id, number of subjects/samples).
  - Will automatically generate the manifest in each folder, if you upload foldes/files in that folder(primary/derivative/source).
  - Also if you haven't upload any files in a folder or a metadata file, it would not generate that folder or metadata file for you in a dataset, even if them appears in dataset structure figure.
  - **Notice:**
    - It would not generate the upload files into dataset, you need to manually copy and paste into the generate dataset. It seems just use the upload files names to generate the manifest file in that folder.
    - There is no validation guidelines when you upload metadata files into SODA. So you need to make sure all your metadata informations are correct.
    - It won't automatically filled some common relational elements for you. E.g, the subject id and sample id in their `subjects` and `samples` metadata files.

### Create SPARC SDS dataset via SODA `End to End Curation`

- Create dataset name

![image](https://github.com/Copper3D-brids/EHR/assets/80797317/548b91a4-8372-4cfd-b311-54e2c162d71f)

![image](https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg)
<img src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg" alt="" width="48%" height="auto">

- Generate dataset structure
  - To tell SODA how many subjects and samples you have
  - Need to specify their unique name
  - Can organise subjects into different pools

<div>
 <span><img src="https://github.com/Copper3D-brids/EHR/assets/80797317/7aab3ce8-d8c0-49f2-96a7-a4299866bd0d" alt="" width="48%" height="auto"></span>
<span><img src="https://github.com/Copper3D-brids/EHR/assets/80797317/ab37c222-2048-4391-ad65-c28e5c9175e5" alt="" width="48%" height="auto"></span>
</div>

- Upload primary data for samples/subjects/pools

![image](https://github.com/Copper3D-brids/EHR/assets/80797317/098c6504-4fe0-41a5-9785-3b25e75a76a4)

### Create SPARC SDS dataset via SODA `Free Form Curation`

## The difference between Sparc-me and SODA dataset

- thumbnails
  - In Sparc-me its called thumbnails and stored in the `docs` folder. Haven't checked the image format.
  - In SODA its called banner, only `.PNG, .JPEG, .TIFF` can be used.
- pool, subject and sample
  - Both Sparc-me and SODA start the subject and sample names with `sub-` and `sam-`, but they have difference.
  - Sparc-me, it don't have pool related folders, and the subject and sample names are only unique under their parent folder, if they are under different parent folder their names are no longer unique. E.g, `sam-1` under `sub-1` and `sam-1` under `sub-2`
  - SODA, it has pool layer, the pool folder is the subject parent folder. And every names in SODA are unique. E.g, if `sub-1` under `pool-1` and `sam-1` under `sub-1`, then the `sub-1` cannot under `pool-x` and `sam-1` cannot under `sub-x`.
