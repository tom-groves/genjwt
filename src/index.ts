#!/usr/bin/env node

import { Command } from "commander";
import * as jwt from "jsonwebtoken";

const program = new Command();

program
  .name("genjwt")
  .description("CLI tool to generate JSON Web Tokens (JWT)")
  .version("1.0.0");

program
  .requiredOption("-s, --secret <secret>", "Secret key to sign the JWT")
  .option("-p, --payload <payload>", "JWT payload as JSON string", "{}")
  .option(
    "-f, --payload-file <path>",
    "Path to a JSON file containing the payload"
  )
  .option(
    "-e, --expiresIn <expiresIn>",
    "Expiration time (e.g., 1h, 30m, 10s)",
    "1h"
  )
  .option("-a, --algorithm <algorithm>", "Signing algorithm", "HS256")
  .option("-i, --issuer <issuer>", "Issuer of the token")
  .option("-x, --subject <subject>", "Subject of the token")
  .option("-c, --claims <claims>", "Additional claims as JSON string", "{}");

program.parse(process.argv);

interface Options {
  secret: string;
  payload: string;
  payloadFile?: string;
  expiresIn: string;
  algorithm: jwt.Algorithm;
  issuer?: string;
  subject?: string;
  claims: string;
}

const options = program.opts<Options>();

const loadPayload = (): object => {
  let payload: object = {};

  if (options.payloadFile) {
    try {
      const fs = require("fs");
      const data = fs.readFileSync(options.payloadFile, "utf-8");
      payload = JSON.parse(data);
    } catch (err) {
      console.error(`Error reading payload file: ${(err as Error).message}`);
      process.exit(1);
    }
  } else if (options.payload) {
    try {
      payload = JSON.parse(options.payload);
    } catch (err) {
      console.error(`Invalid payload JSON: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  // Merge additional claims
  if (options.claims) {
    try {
      const claims = JSON.parse(options.claims);
      payload = { ...payload, ...claims };
    } catch (err) {
      console.error(`Invalid claims JSON: ${(err as Error).message}`);
      process.exit(1);
    }
  }

  return payload;
};

const generateToken = () => {
  const payload = loadPayload();

  const signOptions: jwt.SignOptions = {
    expiresIn: options.expiresIn,
    algorithm: options.algorithm as jwt.Algorithm,
  };

  if (options.issuer) signOptions.issuer = options.issuer;
  if (options.subject) signOptions.subject = options.subject;

  jwt.sign(payload, options.secret, signOptions, (err, token) => {
    if (err || !token) {
      console.error(`Error generating token: ${err}`);
      process.exit(1);
    } else {
      console.log(token);
    }
  });
};

generateToken();
