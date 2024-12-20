![TempleIt Logo](docs/temple-it.png)

# Code Temple It!

Create your code temples (base and sacred folder and file templates that you need to repeat across the entire project) and share them!

```
Usage: temple-it [options] [command]

CLI for creating your code temples, base structures that should be repeated across the project

Options:
  -V, --version                                                            output the version number
  -h, --help                                                               display help for command

Commands:
  init                                                                     Create a new temple-it folder
  create [name]                                                            Create a new temple-it
  list                                                                     Lists all available temples
  copy [options] [templeName] [destination] [source] [destination] [name]
  help [command]                                                           display help for command
```

## How to install

```bash
npm i code-temple-it -g
```

## How to use

```bash
# Initializes .temples folder in your project
templeit init

# Create your first temple
templeit create react-component

# Create/Edit your files under .temple/react-component
- placeholder-value.types.ts
- placeholder-value.component.tsx
- placeholder-value.module.css

# Replicate your temples into your project easily
# Anywhere in your file name or contents that TempleIt finds "Placeholder Value", it will replace to "Button", keeping the casing
templeit copy react-component src/components/ui/button
- button.types.ts
- button.component.tsx
- button.module.css
```

Other useful commands are

```bash
# Outputs available commands
templeit help

# Outputs command details
templeit help init|create|list|copy

# Outputs to the terminal the new files instead of creating them
templeit copy react-component src/components/ui/button --dry-run

# Copies only the subfolder of your Temple, instead of the entire code
templeit copy react-component src/components/ui/button --f subfolder

# Copies the temple from a Github Repo and Subfolder
templeit copy git@github.com:githubuser/githubrepo.git src/components/ui/button --f subfolder
```
