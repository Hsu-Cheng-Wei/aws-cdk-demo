#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcStack } from '../lib/vpc-stack';
import { SgStack } from '../lib/sg-stack';
import { Ec2Stack } from '../lib/ec2-stack';
import { AlbStack } from '../lib/alb-stack';

const app = new cdk.App();

new VpcStack(app, 'vpc');

new SgStack(app, 'sg');

new Ec2Stack(app, 'ec2');

new AlbStack(app, 'alb');
