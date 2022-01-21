import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends Stack {
  public readonly vpc: ec2.IVpc;
  public readonly securityGroup: ec2.ISecurityGroup;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const ns = this.node.tryGetContext('ns')

    const vpc = new ec2.Vpc(this, `Vpc`, { maxAzs: 2 });
    const securityGroup = vpc.vpcDefaultSecurityGroup;

    this.vpc = vpc;
    this.securityGroup = ec2.SecurityGroup.fromSecurityGroupId(this, `DefaultSecurityGroup`, securityGroup);
  }

  get availabilityZones(): string[] {
    const azs = this.node.tryGetContext('availabilityZones')!;
    return azs
  }
}
