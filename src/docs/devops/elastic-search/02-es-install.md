# Install Elasticsearch

## Deploy Single ES

- [Offical docs for install elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
- [Official docs for install kibana](https://www.elastic.co/guide/en/kibana/current/docker.html)

### Create Network

Due to we need to interconnect the es and kibana containers, we also need to deploy `kibana` container.

- Check current network

```sh
docker network ls
```

- Create a new `es-net` network

```sh
docker network create es-net
```

### Load Docker Image

- Load `elasticsearch`

  - elasticsearch v7.12.1

  ```sh
  docker pull docker.elastic.co/elasticsearch/elasticsearch:7.12.1
  ```

  - Here we are using elasticsearch v8.10.4 image.

  ```sh
  docker pull docker.elastic.co/elasticsearch/elasticsearch:8.10.4
  ```

- Load `kibana`

  - kibana v7.12.1

  ```sh
  docker pull docker.elastic.co/kibana/kibana:7.12.1
  ```

  - kibana v8.10.4

  ```sh
  docker pull docker.elastic.co/kibana/kibana:8.10.4
  ```

### Run Elastic

Run docker command, to deploy single point es.

- `v7.12.1`

  ```sh
  docker run -d \
      --name es \
      -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
      -e "discovery.type=single-node" \
      -v ~/desktop/elastic-data/es-data:/usr/share/elasticsearch/data \
      -v ~/desktop/elastic-data/es-plugins:/usr/share/elasticsearch/plugins \
      --privileged \
      --network es-net \
      -p 9200:9200 \
      -p 9300:9300 \
  docker.elastic.co/elasticsearch/elasticsearch:7.12.1
  ```

  - check if success, if you can see below code after 1 min on `http://localhost:9200/`

  ```json
  {
    "name": "2d99af34b373",
    "cluster_name": "docker-cluster",
    "cluster_uuid": "gqiOmsFkQ4-L352DSm8cqQ",
    "version": {
      "number": "7.12.1",
      "build_flavor": "default",
      "build_type": "docker",
      "build_hash": "3186837139b9c6b6d23c3200870651f10d3343b7",
      "build_date": "2021-04-20T20:56:39.040728659Z",
      "build_snapshot": false,
      "lucene_version": "8.8.0",
      "minimum_wire_compatibility_version": "6.8.0",
      "minimum_index_compatibility_version": "6.0.0-beta1"
    },
    "tagline": "You Know, for Search"
  }
  ```

- `v8.10.4`

```sh
docker run -d \
    --name es \
    -m 1GB\
    -e "discovery.type=single-node" \
    -v ~/desktop/elastic-data/es-data:/usr/share/elasticsearch/data \
    -v ~/desktop/elastic-data/es-plugins:/usr/share/elasticsearch/plugins \
    --privileged \
    --network es-net \
    -p 9200:9200 \
    -p 9300:9300 \
docker.elastic.co/elasticsearch/elasticsearch:8.10.4
```

Commands explanation:

- `-d`: running at background
- `--name es`: set the container name to es
- `-e`: set environment variable
- `-e "ES_JAVA_OPTS=-Xms512m -Xmx512m"`: config JVM heap memory size equals to setup es memory size. The default size is 1GB.
- `-e "discovery.type=single-node"`: set es to single-node mode
- `-e "cluster.name=es-docker-cluster"`: setup cluster name
- `-p 9200:9200`: es restful http port
- `-p 9300:9300`: es node port
- `--privileged`: granting access to logical volumes
- `--network es-net`: join the es-net network

### Deploy kibana

kibana can provide a visualize GUI for elasticsearch.

The kibana version **must** same as elasticsearch version.

#### Deploy

Run docker command to deploy kibana

```sh
docker run -d \
--name kibana \
-e ELASTICSEARCH_HOSTS=http://es:9200 \
--network=es-net \
-p 5601:5601 \
kibana:7.12.1
```

Commands explanation:

- `--network=es-net`: join the es-net network, join the same network with elasticsearch.
- `-e ELASTICSEARCH_HOSTS=http://es:9200`: config elasticsearch address, because the kibana and elasticsearch under a same network, so it can use container name with port to access elasticsearch directly.

**Check Kibana status log**

```sh
docker logs -f kibana
```

**Visit kibana on bowser**

- `http://0.0.0.0:5601`
