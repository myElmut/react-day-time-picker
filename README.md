# Elmut - Day Time picker

This repos is a day time picker component for elmut, the original package here from [@mooncake-dev/react-day-time-picker](https://www.npmjs.com/package/@mooncake-dev/react-day-time-picker)

A React component to help with scheduling a day and time

<img width="469" alt="image" src="https://github.com/mzane42/react-day-time-picker/assets/9290865/e586797a-3a03-4aff-9251-6e1b1e48b604">


## Running Locally

```
npm start
```

## How to deploy new version

### Continuous Deployment (CD) Integration
With the integration of semantic-release and GitHub Actions, the release process has been automated. When you push commits or merge pull requests to that follow the conventional commit format to master `master`, the GitHub Action will:

- Analyze the commit messages to determine the type of version bump (major, minor, patch).
- Build the package.
- Publish the new version to npm.
- Create/update a changelog.
- Create a GitHub release with the determined new version.


### Conventionnal Commit

all in english

```jsx
<type>([optional scope]): <description>

[optional body]

[optional footer(s)
```

#### `<type>` :

1. **fix:** a commit of the *type* `fix` patches a bug in your codebase (this correlates with **PATCH** in Semantic Versioning).
2. **feat:** a commit of the *type* `feat` introduces a new feature to the codebase (this correlates with **MINOR** in Semantic Versioning).
3. **BREAKING CHANGE:** a commit that has a footer `BREAKING CHANGE:`, or appends a `!` after the type/scope, not working ? introduces a breaking API change (correlating with **MAJOR** in Semantic Versioning). A BREAKING CHANGE can be part of commits of any *type*.
4. **refactor**: a commit of type `refactor` introduces a refactoring in the codebase (this correlates with **PATCH** in Semantic Versioning).
5. **build**: if a change happens in the CI or in the settings of the project.

#### `([optional scope])` :

describe the section of the codebase modified
all in PascalCase (naming > as the section changed is named)
atom-Button, molecule-GridMedia, ...

#### `<description>` :

clearly describe what have changed

### Release Generation

when the release is triggered on GitLab the version of the package is automatically incremented based on the commit messages.


## Manual Release Instructions
If for some reason, the automated release isn't feasible, or you need to publish manually, follow the steps below. However, the use of the automated CD process is recommended.


### Build:

```
  npm run prepublishOnly
```

### Publish:
```npm publish --access public```

More details about publishing can be found in the npm documentation.

### Make sure:

- You increment the npm version after you make code changes with `npm version`.
- You're logged in.
