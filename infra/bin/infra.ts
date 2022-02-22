#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { MskStack } from '../lib/msk-stack';
import { appContext } from '../constants/config';

const app = new cdk.App({
  context: appContext,
});

const vpcStack = new VpcStack(app, `${appContext.ns}VpcStack`);
const mskStack = new MskStack(app, `${appContext.ns}MskStack`, {
  vpc: vpcStack.vpc,
  securytyGroup: vpcStack.securityGroup,
});
mskStack.addDependency(vpcStack);

const tags = cdk.Tags.of(app)
tags.add(`codebrick:namespace`, appContext.ns);

app.synth();