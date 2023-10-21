# Elasticsearch Knowledges

## Index in Elasticsearch

- `Index`: A set of same types of document.
- `Mapping`: Field constraint information for documents in an index, similar to structural constraints for tables.

## Forward Index and Inverted Index

The elasticsearch adopt `Inverted Index`:

- `document`: each data is a document.
- `term`: grouping of words in a document based on semantics.

### Forward Index

Based on document id to create index. When search terms, it must find the document at first, then check the document if includes terms.

| id  | title            | price |
| --- | ---------------- | ----- |
| 1   | apple watch      | 1999  |
| 2   | apple care       | 523   |
| 3   | huawei headphone | 600   |
| 4   | apple mac        | 4500  |

### Inverted Index

Segment the document content and create an index of the terms and record the information (id) of the document where the terms are located. In the query first according to the term query to the document id, and then get the corresponding document.

| term      | document id |
| --------- | ----------- |
| apple     | 1, 2, 3, 6  |
| watch     | 2,          |
| care      | 3,          |
| huawei    | 4, 5        |
| headphone | 5           |
| mac       | 6           |

## MySql vs Elasticsearch compare

| MySQL  | Elasticsearch | Description                                                                                                           |
| ------ | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| Table  | Index         | Index is a set of document, similar to the table in database.                                                         |
| Row    | Document      | Document is each data, similar to the rows in database. All documents are JSON format.                                |
| Column | Field         | Field is fields in a json document, similar the Column in database.                                                   |
| Schema | Mapping       | Mapping is the constraints of document in Index, such as field type constraints. It is similar to Schema in database. |
| SQL    | DSL           | DSL is a JSON-style request statement provided by elasticsearch to manipulate elasticsearch and implement CRUD.       |

- Architecture
  - MySQL: it specialises in transaction type operations that ensure data security and consistency.
  - Elasticsearch: it is good at searching, analysing, and calculating large amounts of data.

![Elasticsearch](/devops/elasticsearch/elastic-01.png)
