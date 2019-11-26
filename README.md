Replace all `ToDo` notes in this file and adjust also the following files:
    - package.json:
        - Adjust the general parts like name, description, ...
        - Adjust the three scripts `npm run start`, `npm run build` and `npm run test`
    - wcs-manifest.json:
        - Adjust the general parts like title, description, ...
        - Adjust the configuration part with all possible configuration options (https://webcomponents.opendatahub.bz.it/getting-started)

# webcomp-mobility-echarging-dashboard

This project contains the dashboard web component for the [Green Mobility South Tyrol](https://www.greenmobility.bz.it/) project.

[Green Mobility South Tyrol](https://www.greenmobility.bz.it/it/) wants to split the existing functionalities of the website into reusable and independent components. Using these webcomponents, a developer can easily integrate the functionality of the single components into any website.
The data source for the components is the [Open Data Hub](https://opendatahub.bz.it/) project.

## Table of contents

- [Component configuration](#component-configuration)
- [Gettings started](#getting-started)
- [Deployment](#deployment)
- [Docker environment](#docker-environment)
- [Information](#information)

## Component configuration

The HTML of the web component in action would look like this:

```html
<e-mobility-dashboard-widget></e-mobility-dashboard-widget>
```

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- ToDo: Check the prerequisites
- Node 12 / Yarn 1

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
ToDo: git clone https://github.com/noi-techpark/webcomp-mobility-echarging-dashboard.git
```

Change directory:

```bash
ToDo: cd webcomp-mobility-echarging-dashboard/
```

### Dependencies

Download all dependencies:

```bash
yarn install
```

### Build

Build and start the project:

```bash
yarn run start
```

## Deployment

To create the distributable files, execute the following command:

```bash
yarn run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "yarn install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "yarn run build"
```

## Information

### Support

ToDo: For support, please contact [info@opendatahub.bz.it](mailto:info@opendatahub.bz.it).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/java-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
