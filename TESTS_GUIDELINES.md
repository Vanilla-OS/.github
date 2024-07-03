# Guidelines for Creating and Executing Tests in Vanilla OS

## Introduction

This document serves as a reference for maintainers of Vanilla OS repositories in creating and managing testing procedures. The goal is to ensure the integrity, security, and functionality of components through consistent and well-structured tests, identifying potential issues before they are brought into production.

It is important that all maintainers are familiar with and have understood the [Vanilla OS contribution guidelines](CONTRIBUTING.md).

## Responsibilities of Maintainers

It is the responsibility of the maintainers to ensure the continuous integration (CI) of tests into their respective projects. Each new feature or fix should be accompanied, where possible, by relevant tests that validate the changes and ensure that existing functionalities remain intact.

## Test Creation Procedure

### Definition of Test Cases

Each test case must strictly correspond to the functional requirements of the component. Clearly define what is being tested and what result is expected.

### Implementation of Tests

For the implementation of tests in projects written in Go, the language predominantly used for backend/critical components of the project, Vanilla OS adopts the official Go testing suite. For other languages, any other suite can be used, considering ease of use and portability, to emphasize its use.

### Automation and Integration of Tests

Integrate the tests into the CI process using GitHub Actions to automate the execution of tests with every push or pull request. This integration ensures that tests are systematically executed, providing immediate feedback on the code's status and preventing the merging of changes that do not pass the tests.

## Quality Standards

### Clean Code

Maintain clean, simple and targeted test code. 

The tests must ensure the correct functioning of the component without exceeding the role of the project. Each test should focus on specific functionalities or critical security aspects. Keep the code as simple as possible to make it easier to understand.

### Blocking Test Outcomes

Test results should directly influence the build and deploy process. Failed tests must halt the deployment process, ensuring that only verified and error-free modifications are released.

### Documentation

Document each testing procedure within the repository. The documentation should include:

- Description of the test case
- Motivation and purpose of the test
- Detailed instructions on how to execute the test
- Acceptance criteria for passing the test

The documentation can be provided as a comment in the test itself, making it easily accessible to everyone in the most expected place.

## Human Testing

While automated tests are crucial for validating the functionality and security of the project, they cannot cover every aspect of the user experience. It is essential to conduct manual tests, especially for new features and critical fixes, to ensure they meet the expected standards in real-world scenarios.

Manual testing includes usability tests, user interaction tests, and comprehensive scenario tests. It is crucial not to rely solely on automated tests, but also involve human insights to catch issues that automated tests may miss.
