export class Spinner {
  container;
  content;
  domRequirementsMet;
  state;
  timers;
  config = {
    apiUrl: "/prove-identity-status",
    msBeforeInformingOfLongWait: 5000,
    msBeforeAbort: 25000,
    msBetweenRequests: 1000,
    msBetweenDomUpdate: 2000,
  };

  notInErrorOrDoneState = () => {
    return !(this.state.done || this.state.error);
  };

  reflectCompletion = () => {
    this.state.spinnerState = "spinner__ready";
    this.state.spinnerStateText = this.content.complete.spinnerState;
    this.state.buttonDisabled = false;
    this.state.done = true;
  };

  reflectError = () => {
    this.state.heading = this.content.error.heading;
    this.state.messageText = this.content.error.messageText;
    this.state.spinnerState = "spinner__failed";
    this.state.done = true;
    this.state.error = true;
  };

  reflectLongWait() {
    if (this.state.spinnerState !== "ready") {
      this.state.spinnerStateText = this.content.longWait.spinnerStateText;
    }
  }

  initialiseTimers() {
    if (this.domRequirementsMet) {
      this.timers.informUserWhereWaitIsLong = setTimeout(() => {
        this.reflectLongWait();
      }, this.config.msBeforeInformingOfLongWait);

      this.timers.updateDomTimer = setInterval(
        this.updateDom,
        this.config.msBetweenDomUpdate,
      );

      this.timers.abortUnresponsiveRequest = setTimeout(() => {
        this.reflectError();
      }, this.config.msBeforeAbort);
    }
  }

  initialiseState() {
    if (this.domRequirementsMet) {
      this.state = {
        heading: this.content.initial.heading,
        spinnerStateText: this.content.initial.spinnerStateText,
        spinnerState: this.content.initial.spinnerState,
        buttonDisabled: true,
        done: false,
        error: false,
        virtualDom: [],
      };
      this.timers = {};
    }
  }

  initialiseContent(element) {
    try {
      this.content = {
        initial: {
          heading: element.dataset.initialHeading,
          spinnerStateText: element.dataset.initialSpinnerstatetext,
          spinnerState: element.dataset.initialSpinnerstate,
        },
        error: {
          heading: element.dataset.errorHeading,
          messageText: element.dataset.errorMessagetext,
          whatYouCanDo: {
            heading: element.dataset.errorWhatyoucandoHeading,
            message: {
              text1: element.dataset.errorWhatyoucandoMessageText1,
              link: {
                href: element.dataset.errorWhatyoucandoMessageLinkHref,
                text: element.dataset.errorWhatyoucandoMessageLinkText,
              },
              text2: element.dataset.errorWhatyoucandoMessageText2,
            },
          },
        },
        complete: {
          spinnerState: element.dataset.completeSpinnerstate,
        },
        longWait: {
          spinnerStateText: element.dataset.longwaitSpinnerstatetext,
        },
      };

      this.config = {
        apiUrl: element.dataset.apiUrl || this.config.apiUrl,
        msBeforeInformingOfLongWait: parseInt(element.dataset.msBeforeInformingOfLongWait) || this.config.msBeforeInformingOfLongWait,
        msBeforeAbort: parseInt(element.dataset.msBeforeAbort) || this.config.msBeforeAbort,
        msBetweenRequests: parseInt(element.dataset.msBetweenRequests) || this.config.msBetweenRequests,
        msBetweenDomUpdate: parseInt(element.dataset.msBetweenDomUpdate) || this.config.msBetweenDomUpdate,
      };

      this.domRequirementsMet = true;
    } catch (e) {
      this.domRequirementsMet = false;
    }
  }

  createVirtualDom() {
    const domInitialState = [
      {
        nodeName: "h1",
        text: this.state.heading,
        classes: ["govuk-heading-l"],
      },
      {
        nodeName: "div",
        id: "spinner",
        classes: [
          "spinner",
          "spinner__pending",
          "centre",
          this.state.spinnerState,
        ],
      },
      {
        nodeName: "p",
        text: this.state.spinnerStateText,
        classes: ["centre", "spinner-state-text", "govuk-body"],
      },
      {
        nodeName: "button",
        text: "Continue",
        buttonDisabled: this.state.buttonDisabled,
        classes: ["govuk-button", "govuk-!-margin-top-4"],
      },
    ];

    const domErrorState = [
      {
        nodeName: "h1",
        text: this.state.heading,
        classes: ["govuk-heading-l"],
      },
      {
        nodeName: "p",
        text: this.state.messageText,
        classes: ["govuk-body"],
      },
      {
        nodeName: "h2",
        text: this.content.error.whatYouCanDo.heading,
        classes: ["govuk-heading-m"],
      },
      {
        nodeName: "p",
        innerHTML: `${this.content.error.whatYouCanDo.message.text1}<a href="${this.content.error.whatYouCanDo.message.link.href}">${this.content.error.whatYouCanDo.message.link.text}</a>${this.content.error.whatYouCanDo.message.text2}`,
        classes: ["govuk-body"],
      },
    ];

    return this.state.error ? domErrorState : domInitialState;
  }

  vDomHasChanged = (currentVDom, nextVDom) => {
    return JSON.stringify(currentVDom) !== JSON.stringify(nextVDom);
  };

  convert = (node) => {
    const el = document.createElement(node.nodeName);
    if (node.text) el.textContent = node.text;
    if (node.innerHTML) el.innerHTML = node.innerHTML;
    if (node.id) el.id = node.id;
    if (node.classes) el.classList.add(...node.classes);
    if (node.buttonDisabled) el.setAttribute("disabled", node.buttonDisabled);
    return el;
  };

  updateDom = () => {
    const vDomChanged = this.vDomHasChanged(
      this.state.virtualDom,
      this.createVirtualDom(),
    );
    const container = document.getElementById("spinner-container");

    if (vDomChanged) {
      document.title = this.state.heading;
      this.state.virtualDom = this.createVirtualDom();
      const elements = this.state.virtualDom.map(this.convert);
      container.replaceChildren(...elements);
    }

    if (this.state.error) {
      container.classList.add("spinner-container__error");
    }

    if (this.state.done) {
      clearInterval(this.timers.updateDomTimer);
    }
  };

  async requestIDProcessingStatus() {
    try {
      const response = await fetch(this.config.apiUrl);

      const data = await response.json();

      if (data.status === "COMPLETED" || data.status === "INTERVENTION") {
        this.reflectCompletion();
      } else if (data.status === "ERROR") {
        this.reflectError();
      } else if (this.notInErrorOrDoneState()) {
        setTimeout(async () => {
          await this.requestIDProcessingStatus();
        }, this.config.msBetweenRequests);
      }
    } catch (e) {
      this.reflectError();
    }
  }

  init() {
    this.initialiseTimers();

    this.updateDom();

    this.requestIDProcessingStatus().then(() => {
      this.updateDom();
    });
  }

  constructor(domContainer) {
    this.container = domContainer;
    this.initialiseContent(this.container);
    this.initialiseState();
  }
}
