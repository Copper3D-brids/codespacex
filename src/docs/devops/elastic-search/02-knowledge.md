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

## Index Library Operator

### Mapping feild

mapping is a constraint on documents in an indexed library, common mapping attributes include:

- type: field data type
  - string: text (text that can be segmented), keyword (e.g., brand, Country, ip address)
  - number: long, integer, short, byte, double, float
  - bool: boolean
  - date: date
  - object: object
- index: whether to create an index, default value: true
- analyzer: use which analyzer
- properties: the sub-field of current field

### Create Index Library

In ES to operate the index library and document via RESTful request. Using `DSL` syntax to represent request content. The dsl syntax for creating index libraries and mapping is as follows:

```dsl
PUT /index_library_name
{
  "mappings":{
    "properties":{
      "field name":{
        "type": "keyword",
        "analyzer": "ik_smart"
      },
      "field name2":{
        "type": "keyword",
        "index": false
      },
      "field name3":{
        "properties":{
          "sub field"{
            "type": "keyword"
          }
        }
      }
    }
  }
}

```

- example

```dsl
PUT /test
{
  "mappings":{
    "properties":{
      "info":{
        "type": "text",
        "analyzer": "ik_smart"
      },
      "email":{
        "type": "keyword",
        "index": "false"
      },
      "name":{
        "type": "object",
        "properties":{
          "firstName":{
            "type":"keyword"
          },
          "lastName":{
            "type":"keyword"
          },
        }
      }
    }
  }
}
```

### Check Index Library

- syntax for cheching index library

```dsl
GET /Index_Library_name
```

- Example

```dsl
GET /test
```

### Delete Index Library

- Syntax for deleting index library

```dsl
DELETE /Index_Library_name
```

- Example

```dsl
DELETE /test
```

### Update Index Library

By default, elasticsearch is forbidden to modify the index database, when the index lirary and mapping created. However, we can add new fields into index library:

```dsl
PUT /Index_Library_name/_mapping
{
  "properties":{
    "new field name":{
      "type":"integer"
    }
  }
}
```

- Example

```dsl
PUT /test/_mapping
{
  "properties":{
    "age":{
      "type":"integer"
    }
  }
}
```

- **Note:** the new field name cannot same as before.

## Document Operator

## Add new documents

- Syntax

```dsl
POST /Index_library/_doc/document_id
{
  "field 1": "value 1",
  "field 2": "value 2",
  "field 3": {
    "sub-field 1": "value 3",
    "sub-field 2": "value 4"
  }
}
```

- Example

```dsl
POST /test/_doc/1
{
  "info": "This is my first document",
  "email": "jiuxiaohong@gmail.com",
  "name": {
    "firstName": "Xiaohong",
    "lastName": "Jiu"
  }
}
```

## Check document

- Syntax

```dsl
GET /Index_library_Name/_doc/document_id
```

- Example

```dsl
GET /test/_doc/1
```

## Delete document

- Syntax

```dsl
DELETE /Index_library_Name/_doc/document_id
```

- Example

```dsl
DELETE /test/_doc/1
```

## Update document

### Full-scale modification (global modification)

It will delete the old document, then insert new ducoment.

- Syntax

```dsl
PUT /Index_library_Name/_doc/document_id
{
  "field 1": "value 1",
  "field 2": "value 2",
}
```

- Example

```dsl
PUT /test/_doc/1
{
  "info": "This is my first document",
  "email": "matiao@gmail.com",
  "name": {
    "firstName": "Tiao",
    "lastName": "Ma"
  }
}
```

### Incremental change (local modification)

It need user specify the field.

- Syntax

```dsl
POST /Index_library_Name/_update/document_id
{
  'doc':{
    "field 1": "new value"
  }
}
```

- Example

```dsl
POST /test/_update/1
{
  'doc':{
    "email": "matiao@gmail.com"
  }
}
```

## RestClient

### RestClient operate Index library

It is a [client provided by elasticsearc](https://www.elastic.co/guide/en/elasticsearch/client/index.html) used to operate ES. The essence of these clients is to assemble DLS statements and send them to ES via http requests.

- Create index library
- Delete inde library
- Checking for the existence of indexed libraries
