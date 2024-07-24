# Vanilla OS Image Development Branching Strategy

Starting on July 24th, we are changing our branching strategy in Vanilla OS for image development. We hereby describe the design of the new branching system, its rules, and procedures for working with the following three branches: `vision`, `dev`, and `main`.

## Merging vs. porting

Before getting into the details of how the new branching strategy works, let's quickly clarify what 'merging' and 'porting' mean in this context.

### Merging

Merging is a process by which changes from one branch are integrated into another that shares the same code base. It ensures that the changes are included without affecting the structure and history of a project.

### Porting

While it is similar to merging, porting is the reimplementation from a feature or fix in one branch into another with dissimilar codebases.

## Overview of Branches

### Vision

This `vision` branch serves as a base for experimental work, containing new features that could be backported into `dev`. It is a playground for new ideas and innovations that a developer can use for experimental purposes without hurting the development flow in `dev`.

#### Merging Rules

You should not do a direct merge from `vision` to `main`, and neither bring changes from `dev` into `vision`. This means that functionality developed on `vision` should be ported to `dev` instead of being merged directly.

### Dev

The `dev` branch is where active development happens, this includes work that is considered for the next stable release. Features and fixes are done, tested, prepared and put into this branch to be released as stable.

#### Merging Rules

Changes from `dev` should never be directly forwarded to `vision`. Features and fixes from `dev` shall always be merged to `main`, never ported.

### Main

The `main` branch contains code that is considered stable. Only tested and verified features and fixes are merged here.

#### Merging Rules

Never merge directly from vision into `main`. Only features and fixes in `dev` have to be merged to `main`. Direct commits to `main` are strictly forbidden. All changes must come from merging `dev`.

## FAQ

### When should a feature be considered experimental?

We should consider a feature experimental if it either makes huge changes in the existing architecture or uses new technologies not yet applied in our environment. Typically, experimental features are developed in the vision branch. In this way, it allows thorough testing and iterations without breaking the development flow in `dev`. Once the functionality is tested and polished enough, it will be ported into the `dev` branch for further integration and eventual release.

### How do I begin to work on an experimental feature?

When you begin work on an experimental feature each contributor should create a fork rather than working on the `vision` branch. For example, if you are doing a new version of ABRoot that strictly changes its behavior and hence is experimental, you should create a feature branch in your fork based on `vision`. After having developed and tested your functionality in this branch, push it to your fork, then open a PR to merge it into `vision`. Thereafter, your functionality will be code-reviewed and tested within `vision`.

### How can I get an experimental feature into the dev branch?

Any experimental feature that has already been deeply tested and is ready to be included in the next development cycle must be ported to `dev`. As a substitute for merge, reimplement the feature from scratch on the current state of `dev`, ensuring it is compatible and consistent with ongoing development. Create a new branch based on `dev` in your fork and re-implement/adapt the functionality. After you've finished the reimplementation, push this branch to your fork and create a pull request to merge it into `dev`, then request a revision. Then the functionality will receive code review and testing in the `dev` branch.

### How are features merged from dev to main?

When a feature is deeply tested in `dev` and ready for release, it must be merged with `main`. If the new version of ABRoot passed all tests and revisions on `dev`, you must provide a pull request to merge it to `main`. This way, you will make sure that only deeply tested stable features join the `main` branch.
