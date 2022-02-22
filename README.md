# MSK Testing Infra

# Prerequisite

* setup awscli
* setup doppler CLI
* node 14.x
* cdk 2.x

# Installation

following instruction assumes you've set your aws profile as `code`

```bash
$ cd infra
$ npm i
```

bootstrap cdk if no one has run it on the target region

```bash
$ cdk bootstrap
```

deploy infra
```
$ cdk deploy "*" --require-approval never --profile code
```