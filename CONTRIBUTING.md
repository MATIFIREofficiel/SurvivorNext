# Contribution Guidelines

Please follow the guidelines below for to contribute to the project. Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md).
If you contribute to the project you accept automtically the [license](LICENSE.md) of the project and the different rules of the project.
This is the 1.0.0 version. Please check JANDI for the older version.


## Table of Contents
-   #### Commit format message
-   #### Pull Request
-   #### Template for issues
-   #### Testing policies
-   #### Steps of a project
-   #### Documentation


## Commit format message

Each commit message should consist of a **type**, **optional scope**, and **message**: `<type>(<scope>): <message>`


The **type** must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (e.g., formatting, missing semicolons)
- **refactor**: Code refactorings that do not fix a bug or add a feature
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **template**: Changes issue template
- **archi**: Changement of the architecture of the project

The **scope** should be a short description of the affected component/module. It is optional and can be omitted if the commit applies globally.

The **message** should be a concise and descriptive explanation of the changes.

### Examples

Here are some examples of valid commit messages:

- feat(interaction): add player movements
- fix(network): handle bad message from client
- docs(README): update usage instructions
- style(game): format code
- refactor(player): optimize player interaction
- test(NPC): add integration tests
- ci(Chocolatine): add test job for integration testing
- build(Makefile): update build targets for improved compilation
- archi(folder_game): Add the basic folder for game dev

### Additional Guidelines

- Each commit should have a single logical change. If you need to make multiple changes, create separate commits for each.
- Keep the commit messages clear, descriptive, and focused on the changes made.
- Use present tense verbs.
- Aim for a concise message length, around 50 characters or less.

## Pull Request

When you create a PR, your PR must be linked to the issue, the easy way is to create your branch from the issue itself.

For the pull request, we keep the same notion of [Commit message](IS)
Each commit message should consist of a **type**, **optional scope**, and **message**: `<type>(<scope>): <message>`
But we take the name of the issue.
Let's say the issue was "BUG: the player can fly", the pull request will be named "FIX: the bug of the player flying".

But there is more, you will give details about what you did in the pull request. You will explain what you did and why you did it. If it's to fix a bug you shall explain how did you fix it.

You must have to assign a reviewer to your pull request. The reviewer will check your code and will give you feedback. You will have to fix the problems that the reviewer found. If you don't agree with the reviewer, you can discuss it with him.
Furthermore you must assign a label to your pull request and a milestone. The label will be the same as the issue.
Finally you must assign a manager to the PR.

The PR will be used as a way to do some code review, to make sure the code is clean and is safe before merging to the main branch.

When you review a PR try make some sugestions to improve the code. Be nice to your team members. Don't hesitate if you see something wrong to tell it to the person.
When you agree to a PR you must put a message to prove that you agree with the PR.

## Template for issues

When you create an issue, you must use the template for issues.
There are two templates, one for bugs and one for features.

For the bug template, you must give a description of the bug, how to reproduce it, the expected behavior and the actual behavior. Set the right bug priority, if you have any doubts ask a teammate. 
Please put many screenshots if you can.

For the feature template, you must give a description of the feature, the context of the feature, the acceptance criteria and the definition of done. Set the right feature priority and feature size, if you have any doubts ask a teammate.

## Testing policies

When you have to tests your code, there are two types of tests, the unit tests and the functional tests.

The first one is the basic one, you test a function, a class, a module, etc. You test the code itself. You can use the framework of your choice except for the languages C/C++, you must use the framework Criterion.

The second one is more complex, you test the project in a real environment. You test the project in a real situation. Docker will be your closest friend for this type of test. You can use the langagues of your choice.
Bash, python, etc.


## Steps of a project

When you start a project, you must follow the steps below.

First there is the "Lauching Meeting".
Before the start of the "Launching Meeting", each member of the group have to know the global idea of the project, the differents notions which we can learn with the bootstrap.
Finally we must all have an idea for the architecture of the project.

During the "Launching Meeting", we will clarify the subject and think about some hidden informations. After that we will define our objectives for the project and if we want any bonus.
Then we will draw a [Draft](draft.io) of the architecture. 

Then there is the "Initialization Meeting" step. You will create the project, the repository, the issues, the milestones, the labels, etc. You will also create the different branches of the project. Set up the CI-CD environnement.

Finally there is the "Daily Meeting". Which will be explained in the [Code of Conduct](CODE_OF_CONDUCT.md).

## Documentation

The documentation is very important for a project. It's the way to explain how the project works, how to use it, etc.

We will use Doxygen, please learn about it. You will have to write the documentation of your code. You will have to write the documentation of the project. You will have to write the documentation of the architecture of the project.

If any motherfucker wants to do his fucking documentation with colipot we will find him.