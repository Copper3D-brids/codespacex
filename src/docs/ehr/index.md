# What is EHR

EHR (Electronic Health Record) data can come from multiple ways: Hospital EHR server, Volunteer Study/report (RedCap), [Duke University MRI](https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70226903), or Remote monitoring data.

These EHR data is raw data, which can be stored in multiple formats: xlsx, fhir boundle resource, Dicom. And these data may have sensitive information (such as patient's `name`, `sex`, `brith`), so when we get these raw EHR data, the first thing we need to do is processing patient sensitive information via some python `de-identify package`. 