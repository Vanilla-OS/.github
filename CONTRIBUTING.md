# Contribution guidelines

This document defines the contribution guidelines for every repository/project for the Vanilla OS organization.\
All those willing to contribute must align with what is defined in this document before opening any MR/PR.\
Reviewers must verify that the contribution meets the criteria.

## Versioning

Versions must be based on the [Semantic Versioning](https://semver.org/) (SemVer).\
The 4th place is not used: `{major}.{minor}.{patch}`\
It's optionally possible to add the short sha of the commit after a -: `{major}.{minor}.{patch}-{shortSha}`\
When manually sharing a build for test purposes is possible to use the 4th place as a build number identifier: `{major}.{minor}.{patch}.{buildNumber}`

## Tasks

Each activity must be defined via a Task (e.g. a GitHub issue). The title must be clear and concise, the description must clarify the reason and the purpose of the task.
The type of Task must be defined in the title in [brackets]. Valid types are:
- Feature (new/update) -> feat
- Fix -> fix

## Tasks execution

Each task must be managed in a dedicated branch that is created starting from the `main` branch. Exceptions may be allowed for technical reasons.\
The branch must be in a sub-path of the task type. For example, a Feature should be in the `/feat/taskId` path while a bugfix on the `/fix/taskId` path.

## Commits

It is not allowed to commit on protected branches. All commits must have the title of the task. A description is allowed after the title.\
The commits must be formatted using the following syntax:

```
type: [{status?} #TaskId] Task Title

Description after a blank line
```

Example:

```
feat:[#123] New button to stop operation Name

On page X, during process Y is now possible to click a button to stop the operation Name.
There are a few conditions to be handled.
```

GitHub automatically closes issues mentioned in a commit (via #TaskId) if the commit message contains `close #taskId`.
```
feat:[close #123] New button to stop operation Name
feat:[#123] New button to stop operation Name
feat:[#123] New button to stop operation Name
```

```
fix:[close #999] Path with symbols are not handled properly
fix:[#999] Paths with symbols are not handled properly
```

The closure commit should be the one created by the Merge Request, not the one pushed during the development.

## Merge Requests (AKA Pull Requests)

- An MR/PR is required to merge a task branch to the main branch
- The MR/PR can be opened in Draft status as soon as the task is testable. This action triggers a CI build if using CI in the repo
- The review must be executed by at least 1 developer who didn't work on the task.
- All the CI/CD, including Quality Gate, checks must pass
- Code smells (see Code Quality below) should be equal to 0 and solved before merging
- A task (e.g. clearing temp files, updating a wrong .gitignore file) is allowed to commit using the `cleanup:` tag at the beginning of the commit along with a short description of the activity. Example:\
`cleanup: Remove wrongly committed log.txt file`

## Branching and releases

The `main` branch is always the default and target one. Release builds must be defined via [Tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging). When a tag for a `{minor}` version is created, a branch `patch/{major}.{minor}` must be created with the purpose of `{patch}`(es) development and release.\
The code applied to a patch must* be applied to the `main` branch via [cherry pick](https://git-scm.com/docs/git-cherry-pick).\
*Verify that the code is applicable to the main branch comparing the source and target versions.

## Code Quality

The CI is, generally, going through a SonarQube step to verify the Code Quality by applying a [Quality Gate](https://docs.sonarsource.com/sonarqube/latest/user-guide/quality-gates/). At the first stage, Code Coverage is not enabled but is meant to be in the future.\
Quality Gate settings can be viewed [here](https://sq.fabricators.ltd/quality_gates/show/Sonar%20way%20-%20No%20CodeCoverage).\
[Code Smells](https://en.wikipedia.org/wiki/Code_smell) quantity must be kept to a value <50 and maintenance must be performed to reduce them to keep a value of 0.

## End of Line

Files must have an End of Line (eol) by default.\
LF should be the default End of Line of the files.

## Commit signing

The usage of a GPG key (or SSH key recently supported by GitHub) is highly recommended and is going to be mandatory sooner or later.
* [How to generate a GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key).
* [How to add a GPG key to the GitHub account](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account).
* [Telling Git about your signing key](https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key).

Based on the used IDE you may want to search how to configure it in the IDE.

## Patching

See [Components Lifecycle](https://vanillaos.org/components-lifecycle) document.
