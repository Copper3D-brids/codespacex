# Elastic Knowledges

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
