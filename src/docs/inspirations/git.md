# Git useage

## Init a git project on GitHub

```bash
mkdir my_pro
cd my_pro
echo "# My_Pro" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yourusername/repo.git
git push -u origin main
```

## Uninstall Git totally

- delete the `Git` from your PC.
- delete all .gitconfig, please read [this](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup).
  - run below code to find out all `.gitconfig` files, then delete them.

```bash
git config --list --show-origin
```

## Re-install Git

- If there is Git's per-user configuration file.

```bash
git config --global --edit
```

- After change the old user info to your new git user info, then run:

```bash
git commit --amend --reset-author
```

- Then setup your info

```bash
git config --global user.name "Your Name"
git config --global user.email you@example.com
git commit --amend --reset-author
```

## Change the remote url

- Syntax

```sh
git remote set-url <remote_name> <remote_url>
```

- Example for Edit origin url

```sh
git remote set-url origin https://git-repo/new-repository.git
```

- Check local remote

```sh
git remote -v
```

## Change local PC account

- Check your current configuration

```sh
git config --list
```

- Update Global Configuration (Optional)

  If you're switching to a new GitHub account permanently, you might want to update your global Git configuration with your new username and email. You can do this by using the following commands:

```sh
git config --global user.name Your_New_Username
git config --global user.email yournewemail@example.com
```

- Change Repository Configuration

  If you only want to change the GitHub account for a specific repository, navigate to the repository's directory in your terminal and use the following commands:

```sh
git config user.name Your_New_Username
git config user.email yournewemail@example.com
```