# How to contribute

First, you need to install and run the project locally, as it described in the README.md

# Contribution Guidelines

Don't work on master or develop branches directly. Never.

Create your own feature branches following these steps:

```
# Before coding, sync your local repo to repository develop branch:

git checkout develop

git pull origin develop

# Create your feature branch and name it to reflect the sense of work:

git checkout -b feat-[name]

# Do your work in code.

# There's a chance other developers pushed new code to repo while you did your chages, so sync again before pushing, to reveal and resolve conflicts early:

git pull origin develop

# Before pushing, check build is ok and fix if there are errors:

ng build -prod

# Now, you're ready to push your changes:

git push origin feature-[назва]
```

Now, go to https://github.com/rostag/bigpolicy_eu and make a Pull Request from your branch to `develop`. Don't forget to describe what you did.

## Recommended branch names:

* feat-[name] - for new feature development
* fix-[name] - for fixed bugs
* BP-[number] - refer particular task by ID.

## Issue tracking

* If you see an issue, please describe it in details and refer your PR if needed: [issues](https://github.com/rostag/bigpolicy_eu/issues)

Thank you for making future brighter!
