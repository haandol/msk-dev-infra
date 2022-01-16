#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { MskStack } from '../lib/msk-stack';

const ns = 'KalenderDev';

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