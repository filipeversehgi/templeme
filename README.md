<center>
<img src="docs/temple-it.png" />
</center>

# TempleIt
Create your code temples and share them!

## How to install

```bash
npm i temple-it -g
```

## How to use

You need first to create your template directory and put it inside your project `.temple-it/templatename` folder.

So, for instance, let's create those two files:

```js
//.temple-it/test/index.ts

export MyTempleValueClass {
    echo() {
        console.log("My Temple Value here!")
    }
}
```
```js
//.temple-it/test/folder/index.ts

export MyTempleValueStore {
    echo() {
        console.log("temple-value content")
    }
}
```


```
Usage: temple-it [options] <source> <destination> <name>

CLI for creating your code temples, base structures that should be repeated across the project

Arguments:
  source                 Name of your temple-it folder, file or git repository
  destination            Destination folder, relative to current folder
  name                   Name of the resource created from the temple

Options:
  -V, --version          output the version number
  -d, --dry-run          Dry run, do not create files, just show the output
  -t, --template-string  String to be replace inside the temple file
  -h, --help             display help for command
```
