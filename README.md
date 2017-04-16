# AM

AM is application management tool in server



## Quick start

Install dependency packages.

```bash
npm install
```

And default start. (with devtools)

```bash
npm start # or npm run start:dev
```

Here's production start. (without dev-tool)

```bash
npm run start:prod
```



## How to Build

Create portable application. 

Following available output platform.

* windows (32/64bit)
* macos (64bit)
* linux (32/64bit)

Default build. (Build all platform)

```bash
npm run build # or npm run build:all
```

Output application is created in *Release* directory.

Here's building specific platform.

```bash
npm run build:macos   # create macOS binary
npm run build:windows # create windows binary
npm run build:linux   # create linux binary
```

