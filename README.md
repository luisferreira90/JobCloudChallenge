# Test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Challenge

The application should have the following features:

- **List invoices:** The user should be able to list the invoices.

- When a job ad is published, an invoice should be created.

Here are some additional details :

- The `title`, `description`, and `skills` of a job ad are required fields.

- When a job ad is deleted, all of its related data, such as the invoice, should also be deleted.

- The due date of an invoice is calculated based on the date the job ad was published and the current month. For
  example, if a job ad is published on February 15, 2023, the due date of the invoice will be April 30, 2023.

- Amount of the invoice is up to you.

## Bonus features

- The ability to receive notifications when a job ad is created, edited, or deleted.

## Instructions

To complete this challenge, you will need to:

3. Create a store for the job ads data.
4. Create a resource for fetching and updating the job ads data.
5. Create a view model for the job ads data.
6. Create a component for creating and editing job ads.
7. Create effects for triggering invoices.
8. Test the application.

## Interfaces

The `JobAd` interface defines the properties of a job ad. The `title` and `description` properties are required.
The `skills` property is an array of strings. The `status` property can be one of three values: `draft`, `published`,
or `archived`.

The `Invoice` interface defines the properties of an invoice. The `jobAdId` property is the ID of the job ad that the
invoice is for. The `amount` property is the amount of money due. The `dueDate` property is the date by which the
invoice is due.

The `JobAdDto` and `InvoiceDto` interfaces extend the `JobAd` and `Invoice` interfaces, respectively, and add properties
that are not part of the model. These properties are used to store additional information about the job ad or invoice,
such as the creation and update dates.

## Evaluation criteria

- The ability to trigger an invoice for each job ad publication.
