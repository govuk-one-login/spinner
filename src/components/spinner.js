export class Spinner {
  container;
  spinnerContainer;
  ariaLiveContainer;
  content;
  domRequirementsMet;
  state;
  initTime;
  updateDomTimer;
  abortController;
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
    this.state.ariaButtonEnabledMessage =
      this.content.complete.ariaButtonEnabledMessage;
    this.state.done = true;
    sessionStorage.removeItem("spinnerInitTime");
  };

  reflectError = () => {
    this.state.heading = this.content.error.heading;
    this.state.messageText = this.content.error.messageText;
    this.state.spinnerState = "spinner__failed";
    this.state.done = true;
    this.state.error = true;
    sessionStorage.removeItem("spinnerInitTime");
    this.abortController.abort();
  };

  reflectLongWait() {
    if (this.state.spinnerState !== "ready") {
      this.state.spinnerStateText = this.content.longWait.spinnerStateText;
    }
  }

  updateAccordingToTimeElapsed = () => {
    const elapsedMilliseconds = Date.now() - this.initTime;
    if (elapsedMilliseconds >= this.config.msBeforeAbort) {
      this.reflectError();
    } else if (elapsedMilliseconds >= this.config.msBeforeInformingOfLongWait) {
      this.reflectLongWait();
    }
  };

  initialiseState() {
    if (this.domRequirementsMet) {
      this.state = {
        heading: this.content.initial.heading,
        spinnerStateText: this.content.initial.spinnerStateText,
        spinnerState: this.content.initial.spinnerState,
        buttonDisabled: true,
        ariaButtonEnabledMessage: "",
        done: false,
        error: false,
        virtualDom: [],
      };
    }
  }

  initialiseContent(element) {
    function throwIfMissing(data) {
      if (data === undefined) {
        throw new Error("Missing required data");
      }
      return data;
    }

    try {
      this.content = {
        initial: {
          heading: throwIfMissing(element.dataset.initialHeading),
          spinnerStateText: throwIfMissing(
            element.dataset.initialSpinnerstatetext,
          ),
          spinnerState: throwIfMissing(element.dataset.initialSpinnerstate),
        },
        error: {
          heading: throwIfMissing(element.dataset.errorHeading),
          messageText: throwIfMissing(element.dataset.errorMessagetext),
          whatYouCanDo: {
            heading: throwIfMissing(element.dataset.errorWhatyoucandoHeading),
            message: {
              text1: throwIfMissing(
                element.dataset.errorWhatyoucandoMessageText1,
              ),
              link: {
                href: throwIfMissing(
                  element.dataset.errorWhatyoucandoMessageLinkHref,
                ),
                text: throwIfMissing(
                  element.dataset.errorWhatyoucandoMessageLinkText,
                ),
              },
              text2: throwIfMissing(
                element.dataset.errorWhatyoucandoMessageText2,
              ),
            },
          },
        },
        complete: {
          spinnerState: throwIfMissing(element.dataset.completeSpinnerstate),
        },
        longWait: {
          spinnerStateText: throwIfMissing(
            element.dataset.longwaitSpinnerstatetext,
          ),
        },
        continueButton: {
          text: element.dataset.continuebuttonText ?? "Continue",
        },
      };

      this.config = {
        apiUrl: element.dataset.apiUrl || this.config.apiUrl,
        ariaButtonEnabledMessage: throwIfMissing(
          element.dataset.ariaButtonEnabledMessage,
        ),
        msBeforeInformingOfLongWait:
          parseInt(element.dataset.msBeforeInformingOfLongWait) ||
          this.config.msBeforeInformingOfLongWait,
        msBeforeAbort:
          parseInt(element.dataset.msBeforeAbort) || this.config.msBeforeAbort,
        msBetweenRequests:
          parseInt(element.dataset.msBetweenRequests) ||
          this.config.msBetweenRequests,
        msBetweenDomUpdate:
          parseInt(element.dataset.msBetweenDomUpdate) ||
          this.config.msBetweenDomUpdate,
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
        text: this.content.continueButton.text,
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

  updateAriaAlert = (messageText) => {
    while (this.ariaLiveContainer.firstChild) {
      this.ariaLiveContainer.removeChild(this.ariaLiveContainer.firstChild);
    }

    /* Create new message and append it to the live region */
    const messageNode = document.createTextNode(messageText);
    this.ariaLiveContainer.appendChild(messageNode);
  };

  updateDom = () => {
    const vDomChanged = this.vDomHasChanged(
      this.state.virtualDom,
      this.createVirtualDom(),
    );
    if (vDomChanged) {
      document.title = this.state.heading;
      this.state.virtualDom = this.createVirtualDom();
      const elements = this.state.virtualDom.map(this.convert);
      this.spinnerContainer.replaceChildren(...elements);
    }

    if (this.state.error) {
      this.spinnerContainer.classList.add("spinner-container__error");
    }

    if (this.state.done) {
      clearInterval(this.updateDomTimer);
    }

    if (this.state.ariaButtonEnabledMessage !== "") {
      this.updateAriaAlert(this.config.ariaButtonEnabledMessage);
    }
  };

  async requestIDProcessingStatus() {
    const signal = this.abortController.signal;
    await fetch(this.config.apiUrl, { signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "COMPLETED" || data.status === "INTERVENTION") {
          this.reflectCompletion();
        } else if (data.status === "ERROR") {
          this.reflectError();
        } else if (this.notInErrorOrDoneState()) {
          setTimeout(async () => {
            if (Date.now() - this.initTime >= this.config.msBeforeAbort) {
              return;
            }
            await this.requestIDProcessingStatus();
          }, this.config.msBetweenRequests);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error in requestIDProcessingStatus:", e);
          this.reflectError();
        }
      })
      .finally(() => {
        this.updateDom();
      });
  }

  // For the Aria alert to work reliably we need to create its container once and then update the contents
  // https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/
  // So here we create a separate DOM element for the Aria live text that won't be touched when the spinner updates.
  initialiseContainers = () => {
    this.spinnerContainer = document.createElement("div");
    this.ariaLiveContainer = document.createElement("div");
    this.ariaLiveContainer.setAttribute("aria-live", "assertive");
    this.ariaLiveContainer.classList.add("govuk-visually-hidden");
    this.ariaLiveContainer.appendChild(document.createTextNode(""));
    this.container.replaceChildren(
      this.spinnerContainer,
      this.ariaLiveContainer,
    );
  };

  initTimer = () => {
    let spinnerInitTime = sessionStorage.getItem("spinnerInitTime");
    if (spinnerInitTime === null) {
      spinnerInitTime = Date.now();
      sessionStorage.setItem("spinnerInitTime", spinnerInitTime.toString());
    } else {
      spinnerInitTime = parseInt(spinnerInitTime, 10);
    }
    this.initTime = spinnerInitTime;
    this.updateAccordingToTimeElapsed();

    this.updateDomTimer = setInterval(() => {
      this.updateAccordingToTimeElapsed();
      this.updateDom();
    }, this.config.msBetweenDomUpdate);
  };

  handleAbort = () => {
    this.abortController.abort();
  };

  initialiseAbortController = () => {
    this.abortController = new AbortController();
    window.removeEventListener("beforeunload", this.handleAbort);
    window.addEventListener("beforeunload", this.handleAbort);
  };

  init() {
    if (this.domRequirementsMet) {
      this.initTimer();
      this.initialiseContainers();
      this.updateDom();
      this.requestIDProcessingStatus();
    }
  }

  constructor(domContainer) {
    this.container = domContainer;
    this.initialiseContent(this.container);
    this.initialiseState();
    this.initialiseAbortController();
  }
}
