#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { MskStack } from '../lib/msk-stack';

const stage = 'Dev'
const ns = `Kalender${stage}`;

const app = new cdk.App({
  context: {
    'ns': ns,
    'availabilityZones': ['ap-northeast-1a', 'ap-northeast-1c']
  }
});

const vpcStack = new VpcStack(app, `${ns}VpcStack`);
const mskStack = new MskStack(app, `${ns}MskStack`, {
  vpc: vpcStack.vpc,
  securytyGroup: vpcStack.securityGroup,
});
mskStack.addDependency(vpcStack);

const tags = cdk.Tags.of(app)
tags.add(`codebrid:kalender:namespace`, ns);
tags.add(`codebrid:stage`, stage);