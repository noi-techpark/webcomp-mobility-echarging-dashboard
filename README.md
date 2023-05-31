<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
SPDX-FileCopyrightText: 2020 - 2021 STA <info@sta.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Mobility E-Charging Dashboard

[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-mobility-echarging-dashboard)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-mobility-echarging-dashboard)
[![CI/CD](https://github.com/noi-techpark/webcomp-mobility-echarging-dashboard/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-mobility-echarging-dashboard/actions/workflows/main.yml)

This project contains the dashboard web component for the
[Green Mobility South Tyrol](https://www.greenmobility.bz.it/) project.

[Green Mobility South Tyrol](https://www.greenmobility.bz.it/it/) wants to split
the existing functionalities of the website into reusable and independent
components. Using these webcomponents, a developer can easily integrate the
functionality of the single components into any website. The data source for the
components is the [Open Data Hub](https://opendatahub.bz.it/) project.

Dashboard to access the Open Data Hub E-Mobility information for South Tyrol,
such as plug types, number of charging stations, accessibility of stations,
operational states, and much more... Do you want to see it in action? Go to our
[web component store](https://webcomponents.opendatahub.bz.it/webcomponent/f594de36-0136-4c27-a0e6-570fa7014129)!

- [Mobility E-Charging Dashboard](#mobility-e-charging-dashboard)
  - [Usage](#usage)
    - [Options](#options)
      - [Show only data from the capital Bolzano/Bozen](#show-only-data-from-the-capital-bolzanobozen)
      - [Translations](#translations)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Deployment](#deployment)
  - [Docker environment](#docker-environment)
    - [Installation](#installation)
    - [Dependenices](#dependenices)
    - [Start and stop the containers](#start-and-stop-the-containers)
    - [Running commands inside the container](#running-commands-inside-the-container)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)

## Usage

Include the Javascript file `dist/dashboard_widget.min.js` in your HTML and define the web component like this:

```html
<e-mobility-dashboard-widget></e-mobility-dashboard-widget>
```

### Options

#### Show only data from the capital Bolzano/Bozen

Add `bz` as attribute, if you want to show only data from Bolzano/Bozen.

```html
<e-mobility-dashboard-widget bz></e-mobility-dashboard-widget>
```

#### Translations

Add `language` as attribute, if you want to translate the web component.

```html
<e-mobility-dashboard-widget language="en"></e-mobility-dashboard-widget>
```

Possible values are currently `en`, `de`, `it`, `nl`, `cs`, `pl`, `fr`, `ru` (see [/src/translations.js](/src/translations.js)).

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- Node 12 / NPM 8.1.2

For a ready to use Docker environment with all prerequisites already installed and prepared, you can check out the [Docker environment](#docker-environment) section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-mobility-echarging-dashboard.git
```

Change directory:

```bash
cd webcomp-mobility-echarging-dashboard/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

Build and start the project:

```bash
npm run start
```

The application will be served and can be accessed at [http://localhost:8000](http://localhost:8000).

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
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
docker-compose run --rm app /bin/bash -c "npm run build"
```

## Information

### Support

For support, please contact [help@opendatahub.bz.it](mailto:help@opendatahub.bz.it).

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

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
