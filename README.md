<p align="center">
  <a href="https://github.com/filipeversehgi/templeme" target="blank"><img src="https://raw.githubusercontent.com/filipeversehgi/templeme/main/docs/templeme-logo.svg" width="160" alt="TempleMe Logo" /></a>
</p>

# TempleMe

Create your code temples (base and sacred folder and file templates that you need to repeat across the entire project) and share them!

```
CLI for creating your code temples, base structures that should be repeated across the project

Options:
  -V, --version                                 output the version number
  -h, --help                                    display help for command

Commands:
  init                                          Create a new templeme folder
  create [name]                                 Create a new templeme
  list                                          Lists all available temples
  copy [options] [source] [destination] [name]
  help [command]                                display help for command
```

## See it in action

https://github.com/user-attachments/assets/f1a8fb86-5e2b-4ab7-b483-5b71d2442c97

## How to install

```bash
# For NPM:
npm i templeme -g

# For Yarn:
yarn i templeme -g

# For PNPM:
pnpm i templeme -g
```

## How to use

First, you need to initialize TempleMe with the following command. It will create a `.templeme` folder at the root of your project.

```bash
# Initializes .temples folder in your project
templeme init
```

After that, you can create your first template by running:

```bash
# Create your first temple
templeme create react-component
```

With you template created, you can edit the files inside `.templeme/react-component` and add your code structure. Here's a exemple file:

```tsx
// .templeme/react-component/placeholder-value.component.tsx

export type PlaceholderValueProps = {};

export const PlaceholderValue = (props: PlaceholderValueProps) => (
  <div>Hello from Placeholder Value Component!</div>
);
```

This means that, when you want to create your component from `react-component` template, everywhere that TempleMe finds `PlaceholderValue`, it will replace with your component name, keeping the casing.

So, if you run now:

```bash
# Replicate your temples into your project easily
# Anywhere in your file name or contents that TempleMe finds "Placeholder Value", it will replace to "Button", keeping the casing
templeme copy react-component src/components/ui cool-button
```

You will see that a new file will be created, like this:

```tsx
// src/components/ui/cool-button.component.tsx

export type CoolButtonProps = {};

export const CoolButton = (props: CoolButtonProps) => (
  <div>Hello from Cool Button Component!</div>
);
```

You can put as many files inside your Template as you wish :)

## Other useful commands are

```bash
# Outputs available commands
templeme help

# Outputs command details
templeme help init|create|list|copy

# Outputs to the terminal the new files instead of creating them
templeme copy react-component src/components/ui/button --dry-run

# Copies only the subfolder of your Temple, instead of the entire code
templeme copy react-component src/components/ui/button --f subfolder

# Copies the temple from a Github Repo and Subfolder
templeme copy git@github.com:githubuser/githubrepo.git src/components/ui/button --f subfolder
```
