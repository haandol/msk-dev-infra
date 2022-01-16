import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as msk from '@aws-cdk/aws-msk-alpha';

interface IProps extends StackProps {
  vpc: ec2.IVpc;
  securytyGroup: ec2.ISecurityGroup;
}

export class MskStack extends Stack {
  public readonly cluster: msk.ICluster;

  constructor(scope: Construct, id: string, props: IProps) {
    super(scope, id, props);

    const ns = this.node.tryGetContext('ns')

    this.cluster = new msk.Cluster(this, `MskCluster`, {
      clusterName: `${ns}-cluster`,
      kafkaVersion: msk.KafkaVersion.V2_8_1,
      numberOfBrokerNodes: 2,
      vpc: props.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT },
      securityGroups: [props.securytyGroup],
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.M5, ec2.InstanceSize.LARGE),
      ebsStorageInfo: { volumeSize: 100 },
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
