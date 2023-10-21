# Install Elasticsearch

## Deploy Single ES

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

[Official docs](https://www.elastic.co/guide/en/kibana/current/docker.html)

- Load `elasticsearch`
  Here we are using elasticsearch v8.10.4 image.

```sh
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.10.4
```

- Load `kibana`

```sh
docker pull docker.elastic.co/kibana/kibana:8.10.4
```

### Run Elastic & Kibana

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
