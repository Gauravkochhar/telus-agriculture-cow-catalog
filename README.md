# Cow Catalog Microfrontend (Angular 19)

This repository contains a **Microfrontend Angular application** for TELUS Agriculture & Consumer Goods, designed to manage a Cow Catalog. The project is structured using **Module Federation** to support multiple independently deployable applications (shell and remotes).

---

## Project Structure

- **cow-shell**: The host application, responsible for loading remote modules.  
- **cow-catalog**: Remote application containing the list, search/filter features, and cow cards.  
- **cow-detail**: Remote application showing cow details, timelines, and events.  
- **core** (optional): Shared library for common components, directives, and pipes used across multiple apps.  

All apps are **non-standalone** Angular modules and use **SCSS** for styling.

---

## Features

1. **Cow List** (CA-01)
   - Displays cow ear tag, sex, pen, status, and last event date.
   - Responsive **cow cards** with hover effects and smooth animations.
   - Filtered results count and proper mobile/tablet/desktop layouts.

2. **Search & Filter** (CA-02)
   - Search by ear tag or pen (single input for all resolutions).  
   - Filter by **status** (multi-select) and **pen** (multi-select).  
   - Mobile uses **p-drawer** for filters, desktop/tablet shows inline filters.  
   - Filters **persist across navigation**.  
   - Reset filter button included.
   - Form value changes are subscribed to emit filter updates dynamically.

3. **Add New Cow Form** (CA-03)
   - Ear tag (unique, required), sex, pen (required), status (required, default Active), weight (optional).  
   - Form uses **p-dialog** modal for adding cows.  
   - Newly added cows reflect immediately in the cow list.

4. **Cow Detail Page** (CA-04)
   - Shows cow info, weight, daily gain, and recent events timeline.
   - Reusable **Cow Card Component** is used for listing and detail previews.
   - Clean styling with gradients, hover effects, and consistent font (`Roboto`).

---

## Technologies

- Angular 19 (latest LTS supported by CLI)  
- Module Federation with `@angular-architects/module-federation`  
- RxJS for reactive state management and form subscriptions  
- SCSS for responsive and modular styling  
- PrimeNG v19 for UI components (cards, drawers, multi-select, buttons)  
- Karma & Jasmine for unit testing  

---

## Getting Started

### Prerequisites

- Node.js v18.x or v20.x  
- Angular CLI 19  
- npm or yarn  

### Installation

```bash
git clone <repository-url>
cd cow-catalog-mf
npm install
````

---

## Running the Applications

### Development Mode (all apps concurrently)

```bash
npm run start:all
```

* **cow-shell** → [http://localhost:4200](http://localhost:4200)
* **cow-catalog** → [http://localhost:4201](http://localhost:4201)
* **cow-detail** → [http://localhost:4202](http://localhost:4202)

### Individual App Development

```bash
npm run start:shell:dev
npm run start:catalog:dev
npm run start:detail:dev
```

### Build & Watch (development)

```bash
npm run dev:all
```

---

## Environment Specific Builds

### Staging

```bash
npm run stg:shell:build
npm run stg:catalog:build
npm run stg:detail:build
```

* Output paths: `dist/*-staging`

### Production

```bash
npm run prod:shell:build
npm run prod:catalog:build
npm run prod:detail:build
```

* Output paths: `dist/*-prod`

**Note**: `--delete-output-path` ensures old builds are cleared before building.

---

## Running Module Federation Dev Server

```bash
npm run run:all
```

This launches all apps with Module Federation configuration, allowing shell to consume remote modules during development.

---

## Testing

```bash
npm run test
```

* Uses **Karma** & **Jasmine**
* Runs unit tests for all applications

---

## Linting

```bash
npm run lint
```

* Ensures code consistency and best practices

---

## Project Highlights

* Fully modular **microfrontend architecture** with **Module Federation**
* Clean separation between **host and remote apps**
* Responsive **cow cards** with hover effects, animations, and gradients
* **Single input search** with multi-select filters for status and pen
* Mobile uses **p-drawer**, desktop/tablet shows **inline filters**
* Filter form value changes are subscribed to emit events dynamically
* Shared **core library** for reusable components, directives, pipes
* Environment-specific builds for **dev, staging, and production**
* Ready for **scalable enterprise projects**

---

## Recommended Improvements (Future Scope)

* Implement **NgRx or state management** for shared data across remotes
* Add **dynamic forms** using Formly for Cow Add/Edit
* Include **authentication & authorization**
* Deploy remotes and shell on **separate servers**

---

## Author

**Gaurav Kochhar**
Senior Angular Developer | Frontend Architect
