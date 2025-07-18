# Authentication spinner

## About The Project

This spinner component is initialised on a web page rendered by the authentication frontend app (but owned by the Orchestration Team) to replace a server-rendered form with content and interactive controls that update to reflect the readiness state returned by an API.

States represented by the spinner component include:

1. Pending
2. Error
3. Long wait
4. Completed

## Getting Started

For this component to work as a progressive enhancement you will need:

1. A working form that does not rely on JavaScript to function
1. The `/dist/spinner-app.js` script to be included and deferred on only the relevant page
1. The spinner CSS to be included in your application CSS
1. The page to contain an element with:
   1. an `id` of `spinner-container`
   1. all the necessary `data-` attributes populated with the content to be displayed.
1. An API endpoint that can respond to async GET requests initiated by the JavaScript component

<details>

<summary>Example HTML for the spinner container element</summary>

```html
<div
  id="spinner-container"
  data-initial-heading="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.initial.heading' | translate + serviceName }}"
  data-initial-spinnerStateText="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.initial.spinnerStateText' | translate }}"
  data-initial-spinnerState="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.initial.spinnerState' | translate }}"
  data-error-heading="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.heading' | translate }}"
  data-error-messageText="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.messageText' | translate }}"
  data-error-whatYouCanDo-heading="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.whatYouCanDo.heading' | translate }}"
  data-error-whatYouCanDo-message-text1="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.whatYouCanDo.message.text1' | translate }}"
  data-error-whatYouCanDo-message-link-href="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.whatYouCanDo.message.link.href' | translate }}"
  data-error-whatYouCanDo-message-link-text="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.whatYouCanDo.message.link.text' | translate }}"
  data-error-whatYouCanDo-message-text2="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.error.whatYouCanDo.message.text2' | translate }}"
  data-complete-spinnerState="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.complete.spinnerState' | translate }}"
  data-aria-button-enabled-message="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.complete.ariaButtonEnabledMessage' | translate }}"
  data-longWait-spinnerStateText="{{ 'pages.proveIdentityCheckNew.progressivelyEnhancedVersion.longWait.spinnerStateText' | translate }}"
  data-ms-before-informing-of-long-wait="6000"
  data-ms-before-abort="30000"
>
  <form action="/ipv-callback" method="post" novalidate="novalidate">
    <input type="hidden" name="_csrf" value="{{ csrfToken }}" />
    <div class="govuk-form-group">
      <h1 class="govuk-label-wrapper">
        <label class="govuk-label govuk-label--l" for="more-detail">
          {{ 'pages.proveIdentityCheckNew.htmlOnlyVersion.header' | translate }}
        </label>
      </h1>
      <p class="govuk-body">
        {{ 'pages.proveIdentityCheckNew.htmlOnlyVersion.paragraph' | translate
        }}
      </p>
      <button type="submit" class="govuk-button">
        {{ 'pages.proveIdentityCheckNew.htmlOnlyVersion.button' | translate }}
      </button>
    </div>
  </form>
</div>
```

</details>

## Installation

Install the package with

```shell
npm i @govuk-one-login/authentication-spinner
```

Include and defer a script tag in the HTML page with a `src` attribute referencing the distribution file (`spinner-app.js` in the `dist` directory). Including this script is all that is necessary to initialise the component.

## How the authentication spinner works

### 1. Getting a reference to the required DOM element

When the component JavaScript runs in a user's browser, a DOM lookup is performed for an element with the id of `spinner-container`. This element is required as a mounting point for the component. If the DOM element is not found, the spinner will not run and the user can proceed to use the non-JavaScript version.

### 2. Initialising the spinner content

Where this element is found, it is passed as an argument to the `Spinner` constructor. The constructor will then try to populate the `Spinner` content attribute using `data-*` attributes found on the DOM element included in the server-rendered page (this approach has been taken so that content and language translations can be managed alongside other content in authentication frontend).

If any required attribute is missing, the component will set `domRequirementsMet` to `false`, preventing state from being initialised. As before, if this requirement is not met, nothing happens and the user can proceed to use the non-JavaScript version.

### 3. Initialising timers

The Spinner component uses either an existing or newly generated timestamp as `initTime`, storing it in `sessionStorage` as `spinnerInitTime`. During the `initTimer` function call in the `init`, it checks if `spinnerInitTime` is already there. If yes, it reuses it. If not, it creates a new one, stores it, and applies it to the config. This way, the spinner stays consistent across page refreshes, and also handles sleep or power saving mode on mobile without breaking.

The `updateDomTimer` timer will update the DOM at set intervals to reflect any changes in the virtual DOM.
The duration of this timer is set within the Spinner `config` property.

If time elapsed from `initTime` is larger than `msBeforeAbort` or `msBeforeInformingOfLongWait` it update the state of the spinner to reflect actual state.

### 4. Perform initial update

Initialisation then proceeds to do an initial update of the DOM, replacing the server-rendered content with the JavaScript component.

### 5. Requesting ID processing status

Initialisation then proceeds to request the ID processing status. This uses recursive calls to `this.requestIDProcessingStatus()` at set intervals (as set in `config`), each of which initiates a `fetch` request for the processing status.

If a `COMPLETED` or `INTERVENTION` status is returned by the API, the component will update the spinner state to reflect completion, the call to action will be enabled and further `fetch` requests will be prevented. Also, `initTime` is removed from session storage. Clicking the enabled call to action will result in the user making a synchronous `POST` request to the same route and server-side processing will determine if they can continue to the RP or be presented with a page reflecting an account intervention being in place.

If a status of `ERROR` is returned, the component updates its spinner state to reflect an error and further `fetch` requests are prevented. Also, `initTime` is removed from session storage.

If a `fetch` request doesn't result in a status of `COMPLETED`, `INTERVENTION` or `ERROR`, the component will schedule another request after the period set in `config`. Once the time period has elapsed the component checks how much time has elapsed from the `initTime`. If the elapsed time is longer than `msBeforeAbort` the recursive call is not made, the spinner state is updated to reflect error, and `initTime` is removed from session storage.

## Version History

### 2.1.0

- Introduced initialisation time stored in sessionStorage to make spinner more accurate and bug resistant.
  - Added `initTime` to the config and stores it in session storage
  - Added abortController to cancel request on page unload
  - Removed `informUserWhereWaitIsLong` and `abortUnresponsiveRequest` as those are checked each dom update according to time elapsed from `initTime`

### 2.0.0

#### Breaking changes

- Previous versions didn't correctly ensure that required attributes existed, this has now been fixed and will break the spinner if you are missing one of these attributes:
  - data-initial-heading
  - data-initial-spinnerStateText
  - data-initial-spinnerState
  - data-error-heading
  - data-error-messagetext
  - data-error-whatYouCanDo-heading
  - data-error-whatYouCanDo-message-text1
  - data-error-whatYouCanDo-message-link-href
  - data-error-whatYouCanDo-message-link-text
  - data-error-whatYouCanDo-message-text2
  - data-complete-spinnerState
  - data-longwait-spinnerStateText
- New required attribute added: `data-aria-button-enabled-message`. This is used to inform screen readers when the continue button becomes enabled.
- New div added around the spinner elements. This is a plain div with no styling so hopefully will not have an impact, but could potentially interact with other client CSS or JS.

#### Other major changes

- Added snapshot tests to check the generated spinner HTML
