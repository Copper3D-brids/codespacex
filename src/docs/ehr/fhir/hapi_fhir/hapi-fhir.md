# HAPI FHIR


## The difference between Hapi Fhir Server and Snowflake

[Snowflake](https://www.snowflake.com/en/) is a cloud platform to build the healthcare data centre. Because it is based on cloud, so it is can easily achieve elastic deploy, and from its introduction we can clearly see it supports all data - which means we can store FHIR data in Snowflake platform, and use SQL to enable search FHIR resources.

However, there is a core question for us to use Snowflake: how can we do CRUD (Create, Read, Update, Delete) in a very easy way for FHIR Resources not the entire FHIR data? if all our raw data is FHIR data and we don’t need to convert other meta data (3d Model) to FHIR Resource (extension), then I think we use only Snowflake is absolutely fine.
In general, Snowflake is a scalable cloud data warehouse and hapi fhir server is a FHIR server. snowflake can be used to store and manage FHIR data and hapi fhir server can be used to provide FHIR services. You can image Snowflake is a database for storing all kind of data, just like (PostgreSQL, mySQL database), certainly we can directly use SQL to do CRUD in database, but in real development (I think 90% current developer wouldn’t do like this), all most will built a backend to operate the database to provide a easy way (RestAPI) for other developers to build other servers ([micro-services](https://microservices.io/)) or web APP frontends.

The Hapi FHIR here is just like a backend + database (Java + PostgreSQL) for developers can easily use HAPI FHIR server RESTfulAPI to quickly do CRUD for FHIR resources. Here I don’t mean we only can HAPI FHIR, the reason why we choose HAPI FHIR initially is because it is absolutely open-source, and it has a very detailed documentation. There are a lot of FHIR based healthcare cloud platform (they are just like hapi fhir server - backend+database, but the only difference is they are cloud solutions for FHIR standard, as for the cloud solution there are a lot of aspects such as access controls, data security, elastic deploy, .etc) as I’ve mentioned before, all of them have strong functionalities on FHIR Services, But what we need to concern is their capabilities and prices:

- [Google Cloud Healthcare Platform](https://cloud.google.com/healthcare-api/docs/concepts/fhir) - base on google cloud
- [Microsoft Azure FHIR Services](https://learn.microsoft.com/en-us/azure/healthcare-apis/fhir/overview) - base on Azure
- [InterSystem FHIR Server](https://www.intersystems.com/resources/intersystems-fhir-server/) - base on AWS
- and so on.

To be more specific, Snowflake is a big data warehouse can be used to store FHIR resources such as patients, clinical records and devices. And Snowflake can use the FHIR data model to organise the data and can query the data using the FHIR query language (SQL). Hapi FHIR server (Or any FHIR servers) who implemented via FHIR standard can be used to provide FHIR services such as fetching, creating, updating, and deleting FHIR resources.  And if we don’t need to create FHIR extension to convert the raw data (digital twins) to FHIR extension data and validate them, we don’t need to consider any FHIR server. If not, one thought comes to my mind, we can use FHIR server + Snowflake (depends on what Snowflake benefits we need), e.g, HAPI fhir server + Snowflake data warehouse (we may need to do more research on this), currently we can use PsotgreSQL as database for HAPI fhir server.

Then let’s talk about the `FHIR extension`, it is totally a seperate part as FHIR server. In FHIR extension we can customise our fields in one FHIR resource (base on version R4 or R5), such as NHI number in NZ base FHIR Patient Resource. A FHIR extension:

- `FHIR Implementation Guide` - like a documentation.
- `FHIR package` - Like js/python packege we can use it in development part, in this case we can use it in a FHIR Server (need to test if the HAPI fhir supports a third-party fhir package).


In summary,
- Snowflake is a cloud based data centre, which can be consider as a database to store healthcare data.
- HAPI FHIR Server (or other FHIR Servers)
    - is a server like backend to connect database and can do CRUD for FHIR resources based on FHIR Standard (including validate FHIR resource), 
    - can provide RESTful API or allow user using fhirpy to connect server and operate the FHIR resources.
    - May support other third-party packages (FHIR extension)
- As for what we can use the FHIR Server, for example, use HAPI fhir server, currently it is use PostgreSQL as database, we can try to change the database to Snowflake (need to do more research on this).