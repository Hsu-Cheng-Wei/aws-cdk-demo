#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaStack } from '../lib/lambda-stack';
import { GatewayStack } from '../lib/gateway-stack';

const app = new cdk.App();
new LambdaStack(app, 'lambda');
new GatewayStack(app, 'gateway');
