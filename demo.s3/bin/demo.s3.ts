#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';
import { SgStack } from '../lib/sg-stack';
import { S3Stack } from '../lib/s3-stack';
import { Ec2Stack } from '../lib/ec2-stack';

const app = new cdk.App();

new VpcStack(app, "vpc");
new SgStack(app, "sg");
new S3Stack(app, "s3");
new Ec2Stack(app, "ec2");
