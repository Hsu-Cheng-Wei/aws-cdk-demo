import * as cdk from '@aws-cdk/core';
import * as assets from "@aws-cdk/aws-s3-assets";

export class S3Stack extends cdk.Stack {

    static asset: assets.Asset;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        var path = require('path');

        S3Stack.asset = new assets.Asset(this, "Asset", {
            path: path.join(__dirname, "../", "ec2-config", "configure.sh"),
        });

        const asset = S3Stack.asset;

        new cdk.CfnOutput(this, "S3BucketName", { value: asset.s3BucketName });
        new cdk.CfnOutput(this, "S3BucketArn", { value: asset.bucket.bucketArn });
        new cdk.CfnOutput(this, "S3ObjectKey", { value: asset.s3ObjectKey });
        new cdk.CfnOutput(this, "S3HttpURL", { value: asset.httpUrl });
        new cdk.CfnOutput(this, "S3ObjectURL", { value: asset.s3ObjectUrl });

    }
}
