import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { AzureHttpAdapter } from '@nestjs/azure-func-http';

// ✅ Initialize Express correctly
const expressApp = express();

// ✅ Ensure the app initializes before handling requests
let nestApp: any = null; // Stores the NestJS instance

async function bootstrap() {
  if (!nestApp) {
    // ✅ Correctly initialize NestJS with ExpressAdapter
    nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // ✅ Initialize the app fully before handling requests
    await nestApp.init();
    console.log('✅ NestJS App Initialized');
  }
}

// ✅ Correctly define the Azure Function entry point
const azureFunction: AzureFunction = async (context: Context, req: HttpRequest) => {
  await bootstrap(); // ✅ Ensure app is ready before handling requests
  return AzureHttpAdapter.handle(() => Promise.resolve(nestApp), context, req);
};

export default azureFunction;
