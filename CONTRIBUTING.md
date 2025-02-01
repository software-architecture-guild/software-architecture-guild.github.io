# Contributing to software-architecture-guild

Thank you for considering contributing to this project! Your help is greatly appreciated. This guide will walk you through the process of joining the organization, setting up your development environment, making changes, and submitting them for review.

## Table of Contents

* [Joining the Organization](#joining-the-organization)
* [Getting Started](#getting-started)
* [Contribution Guidelines](#contribution-guidelines)
* [Development Workflow](#development-workflow)
* [Linting](#linting)
* [Submitting Your Contribution](#submitting-your-contribution)
* [Reporting Issues](#reporting-issues)
* [License](#license)

## Joining the Organization

Before contributing, you need access to the repository. Follow these steps to join as a contributor:

1. **Open a Join Request**: Submit a request via the following link: [Join Request](https://github.com/orgs/software-architecture-guild/discussions/categories/join-requests).
2. **Wait for Approval**: An admin will review and approve your request.
3. **Accept the Invitation**: Once approved, you will receive an invitation to join the organization. Accept it through GitHub notifications.

## Getting Started

1. **Clone the Repository**: Once you have access, clone the repository to your local machine:

   ```bash
   git clone git@github.com:software-architecture-guild/software-architecture-guild.github.io.git
   cd software-architecture-guild.github.io
   ```

2. **README.md**: Familiarize yourself with repository structure.
3. **Install Hugo**: Ensure you have [Hugo](https://gohugo.io/getting-started/installing/) installed on your system.
   Required versions are:

   ```bash
   Go ≥ v1.23
   Hugo ≥ v0.142.0 (Extended Version)
   ```

   You can check by running:

   ```bash
   hugo version
   go version 
   ```

4. **Run the Development Server**: Use the following command to start a local development server:

   ```bash
   hugo server -D
   ```

   The site should be accessible at `http://localhost:1313/`.

## Contribution Guidelines

1. We accept changes **only through Pull Requests**. There is no strict naming convention for branches, but a good practice is to include the section name and article name in it. To be merged, a PR requires **two reviews** from [CODE OWNERS](https://github.com/orgs/software-architecture-guild/teams/code-owners).
2. If you would like to propose **changes to an existing article**, feel free to do so and open a pull request with the proposed modifications. The discussion will take place as part of the pull request.
3. If you would like to **write a new article**, please open a new discussion under the [Ideas category](https://github.com/orgs/software-architecture-guild/discussions/categories/ideas). Once the article is agreed upon, feel free to write it and submit it as a PR. If it is your first article, we ask that you create a profile in the `authors` directory so you can be referenced as an author in the article. If you prefer **not to be referenced**, that is also fine.
4. If you would like to **write a blog post**, feel free to do so and submit it as a PR. It will undergo a **light review** but without strict rules. You can write about anything related to **software architecture**.

## Development Workflow

1. **Create a New Branch**: Before making any changes, create a new branch for your work:

   ```bash
   git checkout -b feature-or-bugfix-name
   ```

2. **Make Changes**: Implement your changes in the appropriate files.
3. **Test Your Changes**: Ensure the website runs properly by running `hugo server` and testing your modifications.
4. **Commit Your Changes**:

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push Your Branch**:

   ```bash
   git push origin feature-or-bugfix-name
   ```

## Linting

### Markdown

1. Install markdown lint:

   ```bash
   sudo npm install -g markdownlint-cli2
   ```

2. Run markdown lint:

   ```bash
   markdownlint-cli2 "**/*.md" "#node_modules" "#themes"
   ```

3. Fix automatically:

   ```bash
   markdownlint-cli2 "**/*.md" "#node_modules" "#themes" --fix
   ```

### Spell Check

1. Install cspell:

   ```bash
   sudo npm install -g cspell@latest
   ```

2. Run cspell lint:

   ```bash
   cspell lint .
   ```

## Submitting Your Contribution

1. **Open a Pull Request (PR)**: Navigate to the original repository and click `New Pull Request`.
2. **Select Your Branch**: Choose your branch and compare it with the main branch.
3. **Describe Your Changes**: Provide a clear explanation of what you changed and why.
4. **Submit the PR**: Click `Create Pull Request` and wait for a review.

## Reporting Issues

If you find a bug or have a feature request, please open an issue by following these steps:

1. **Go to the Issues tab** in the repository.
2. **Click**`New Issue`.
3. **Provide a descriptive title and details** about the issue.
4. **Include screenshots or logs** if applicable.

## License

By contributing, you agree that your contributions will be licensed under the same [license](LICENSE) as the repository.

Thank you for your contributions!
