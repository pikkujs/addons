# @pikku/addon-kafka

Apache Kafka messaging and topic management.

## Functions

- `kafkaProduce` — produce messages to a topic
- `kafkaCreateTopic` — create a topic
- `kafkaDeleteTopic` — delete a topic
- `kafkaListTopics` — list topics

## Secrets

`KAFKA_CREDENTIALS` — fields: brokers, clientId, saslUsername, saslPassword, saslMechanism, ssl

## Dependencies

- kafkajs
