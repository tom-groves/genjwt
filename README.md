# JWT CLI Tool

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/npm/v/jwt-gen-cli.svg)
![Build](https://github.com/tom-groves/jwt-gen-cli/workflows/Publish%20to%20npm/badge.svg)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Using a Payload File](#using-a-payload-file)
  - [Adding Additional Claims](#adding-additional-claims)
  - [Specifying Issuer and Subject](#specifying-issuer-and-subject)
  - [Complete Example](#complete-example)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Building the Project](#building-the-project)
  - [Running Locally](#running-locally)
- [Publishing](#publishing)
  - [GitHub Actions Workflow](#github-actions-workflow)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**JWT CLI Tool** is a versatile command-line interface (CLI) built with TypeScript that allows you to effortlessly generate JSON Web Tokens (JWTs). Whether you're a developer needing to create tokens for authentication, testing, or any other purpose, this tool simplifies the process with flexible options and ease of use.

## Features

- **Flexible Payload Input**: Provide JWT payloads directly as JSON strings or via JSON files.
- **Customizable Options**: Set expiration times, specify signing algorithms, define issuer and subject claims, and add additional custom claims.
- **Multiple Signing Algorithms**: Supports various algorithms like HS256, HS512, RS256, etc.
- **Easy Integration**: Seamlessly integrate into your development workflow or scripts.
- **Automated Publishing**: Utilize GitHub Actions to automatically publish new versions to npm upon tagging.

## Installation

You can install the JWT CLI tool globally using npm:

```bash
npm install -g jwt-gen-cli
```

Alternatively, you can use it via `npx` without installing globally:

```bash
npx jwt-gen-cli --help
```

## Usage

The CLI provides a straightforward interface to generate JWTs with various options.

### Basic Usage

Generate a JWT with a secret and a simple payload:

```bash
jwt-gen-cli --secret your-very-secret-key --payload '{"userId":123}' --expiresIn 2h
```

**Short Flags:**

```bash
jwt-gen-cli -s your-very-secret-key -p '{"userId":123}' -e 2h
```

### Using a Payload File

Instead of passing the payload directly, you can provide a JSON file containing the payload.

1. **Create a `payload.json` file:**

   ```json
   {
     "userId": 123,
     "role": "admin"
   }
   ```

2. **Generate the JWT using the payload file:**

   ```bash
   jwt-gen-cli --secret your-very-secret-key --payload-file ./payload.json --expiresIn 2h
   ```

**Short Flags:**

```bash
jwt-gen-cli -s your-very-secret-key -f ./payload.json -e 2h
```

### Adding Additional Claims

You can include extra claims by using the `--claims` option.

```bash
jwt-gen-cli --secret your-very-secret-key --payload '{"userId":123}' --claims '{"isVerified":true}' --expiresIn 2h
```

**Short Flags:**

```bash
jwt-gen-cli -s your-very-secret-key -p '{"userId":123}' -c '{"isVerified":true}' -e 2h
```

### Specifying Issuer and Subject

Define the issuer (`iss`) and subject (`sub`) claims in the token.

```bash
jwt-gen-cli --secret your-very-secret-key --payload '{"userId":123}' --issuer "your-app" --subject "authentication" --expiresIn 2h
```

**Short Flags:**

```bash
jwt-gen-cli -s your-very-secret-key -p '{"userId":123}' -i "your-app" -s "authentication" -e 2h
```

### Complete Example

Generate a JWT with a comprehensive set of options:

```bash
jwt-gen-cli \
  --secret mysecretkey \
  --payload '{"userId":123, "name":"John Doe"}' \
  --expiresIn "24h" \
  --algorithm "HS512" \
  --issuer "my-app" \
  --subject "user-auth" \
  --claims '{"role":"admin","isActive":true}'
```

This command will output a JWT containing the specified payload, additional claims, and configured options.

## Development

If you wish to contribute or customize the JWT CLI tool, follow the development guidelines below.

### Prerequisites

- **Node.js**: Ensure you have Node.js (version 14 or higher) installed.
- **npm**: Comes bundled with Node.js.
- **Git**: For version control.

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tom-groves/jwt-gen-cli.git
   cd jwt-gen-cli
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

### Building the Project

Compile the TypeScript code into JavaScript:

```bash
npm run build
```

This will generate the `dist` directory containing the compiled code.

### Running Locally

You can run the CLI tool locally without installing it globally using `ts-node`:

```bash
npm run start -- --secret your-secret --payload '{"key":"value"}' --expiresIn 1h
```

**Note:** The `--` after `npm run start` is necessary to pass arguments to the script.

## Publishing

The project is set up with GitHub Actions to automate publishing to npm upon creating a new Git tag. This ensures that every release is consistently built and published without manual intervention.

### GitHub Actions Workflow

The workflow is defined in `.github/workflows/publish.yml` and is triggered when you push a tag matching the pattern `v*.*.*` (e.g., `v1.0.0`).

#### Workflow Steps:

1. **Checkout Repository**: Clones your repository.
2. **Set Up Node.js**: Installs the specified Node.js version.
3. **Install Dependencies**: Runs `npm install` to install project dependencies.
4. **Build the Project**: Compiles the TypeScript code.
5. **Publish to npm**: Publishes the package to npm using the `NPM_TOKEN` secret.

#### Setting Up npm Authentication

1. **Generate an npm Token:**

   - Log in to your [npm account](https://www.npmjs.com/).
   - Navigate to **Access Tokens** in your account settings.
   - Generate a new **Automation** token.

2. **Add the Token to GitHub Secrets:**

   - Go to your GitHub repository.
   - Click on **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret**.
   - Name it `NPM_TOKEN` and paste the generated token.

#### Creating a New Release

1. **Commit Your Changes:**

   ```bash
   git add .
   git commit -m "Release version 1.0.0"
   ```

2. **Create a New Tag:**

   ```bash
   git tag v1.0.0
   ```

3. **Push the Tag to GitHub:**

   ```bash
   git push origin v1.0.0
   ```

This will trigger the GitHub Actions workflow to build and publish your package to npm.

## Contributing

Contributions are welcome! Whether it's reporting issues, suggesting features, or submitting pull requests, your input is valuable.

### How to Contribute

1. **Fork the Repository:**

   Click the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/tom-groves/jwt-gen-cli.git
   cd jwt-gen-cli
   ```

3. **Create a New Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes:**

   Implement your feature or fix.

5. **Commit Your Changes:**

   ```bash
   git commit -m "Add feature: your feature description"
   ```

6. **Push to Your Fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request:**

   Go to the original repository and click **Compare & pull request**.

### Code of Conduct

Please adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/tom-groves/jwt-gen-cli/issues) on the repository.

## Acknowledgements

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For handling JWT creation and signing.
- [commander](https://github.com/tj/commander.js) - For parsing command-line arguments.
- [GitHub Actions](https://github.com/features/actions) - For automating the publishing process.

---

_Happy Token Generating! 🚀_
