# Vanilla OS Image Development Branching Strategy

Starting on July 24th, we are changing our branching strategy in Vanilla OS for image development. We hereby describe the design of the new branching system, its rules, and procedures for working with the following two branches: `vision` and `dev`.

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

You should not do a direct merge from `vision` to `dev`. This means that functionality developed on `vision` should be ported to `dev` instead of being merged directly.

### Dev

The `dev` branch is the default branch. It's also where active development happens, this includes work that is considered for the next stable release. Features and fixes are done, tested, prepared and put into this branch to be released as stable.

#### Merging Rules

Changes from `dev` should not be merged into `vision`. Instead, `vision` is rebased on top of `dev` whenever sensible.

## Versioning

### Git Tags

When the `dev` branch is tested to be stable, a release is performed. This means a git tag in semver format (e.g. "v2.1.3") is added to the tested commit and pushed.

#### Images

The images from the latest tags in `dev` and `vision` get the `:dev` and `:vision` image tags respectively. An image created from a release git tag gets the `:main`, `:<version>` (e.g. "2.1.3") and `:latest` image tags.

## FAQ

### When should a feature be considered experimental?

We should consider a feature experimental if it either makes huge changes in the existing architecture or uses new technologies not yet applied in our environment. Typically, experimental features are developed in the vision branch. In this way, it allows thorough testing and iterations without breaking the development flow in `dev`. Once the functionality is tested and polished enough, it will be ported into the `dev` branch for further integration and eventual release.

### How do I begin to work on an experimental feature?

When you begin work on an experimental feature each contributor should create a fork rather than working on the `vision` branch. For example, if you are doing a new version of ABRoot that strictly changes its behavior and hence is experimental, you should create a feature branch in your fork based on `vision`. After having developed and tested your functionality in this branch, push it to your fork, then open a PR to merge it into `vision`. Thereafter, your functionality will be code-reviewed and tested within `vision`.

### How can I get an experimental feature into the dev branch?

Any experimental feature that has already been deeply tested and is ready to be included in the next development cycle must be ported to `dev`. As a substitute for merge, reimplement the feature from scratch on the current state of `dev`, ensuring it is compatible and consistent with ongoing development. Create a new branch based on `dev` in your fork and re-implement/adapt the functionality. After you've finished the reimplementation, push this branch to your fork and create a pull request to merge it into `dev`, then request a revision. Then the functionality will receive code review and testing in the `dev` branch.
