(() => {
  "use strict";
  function t(e) {
    return (
      (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
      t(e)
    );
  }
  function e() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ e =
      function () {
        return n;
      };
    var r,
      n = {},
      i = Object.prototype,
      o = i.hasOwnProperty,
      a =
        Object.defineProperty ||
        function (t, e, r) {
          t[e] = r.value;
        },
      s = "function" == typeof Symbol ? Symbol : {},
      c = s.iterator || "@@iterator",
      u = s.asyncIterator || "@@asyncIterator",
      l = s.toStringTag || "@@toStringTag";
    function h(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      h({}, "");
    } catch (r) {
      h = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function f(t, e, r, n) {
      var i = e && e.prototype instanceof b ? e : b,
        o = Object.create(i.prototype),
        s = new I(n || []);
      return a(o, "_invoke", { value: O(t, r, s) }), o;
    }
    function p(t, e, r) {
      try {
        return { type: "normal", arg: t.call(e, r) };
      } catch (t) {
        return { type: "throw", arg: t };
      }
    }
    n.wrap = f;
    var d = "suspendedStart",
      m = "suspendedYield",
      y = "executing",
      v = "completed",
      g = {};
    function b() {}
    function w() {}
    function x() {}
    var S = {};
    h(S, c, function () {
      return this;
    });
    var L = Object.getPrototypeOf,
      E = L && L(L(C([])));
    E && E !== i && o.call(E, c) && (S = E);
    var T = (x.prototype = b.prototype = Object.create(S));
    function D(t) {
      ["next", "throw", "return"].forEach(function (e) {
        h(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function k(e, r) {
      function n(i, a, s, c) {
        var u = p(e[i], e, a);
        if ("throw" !== u.type) {
          var l = u.arg,
            h = l.value;
          return h && "object" == t(h) && o.call(h, "__await")
            ? r.resolve(h.__await).then(
                function (t) {
                  n("next", t, s, c);
                },
                function (t) {
                  n("throw", t, s, c);
                },
              )
            : r.resolve(h).then(
                function (t) {
                  (l.value = t), s(l);
                },
                function (t) {
                  return n("throw", t, s, c);
                },
              );
        }
        c(u.arg);
      }
      var i;
      a(this, "_invoke", {
        value: function (t, e) {
          function o() {
            return new r(function (r, i) {
              n(t, e, r, i);
            });
          }
          return (i = i ? i.then(o, o) : o());
        },
      });
    }
    function O(t, e, n) {
      var i = d;
      return function (o, a) {
        if (i === y) throw Error("Generator is already running");
        if (i === v) {
          if ("throw" === o) throw a;
          return { value: r, done: !0 };
        }
        for (n.method = o, n.arg = a; ; ) {
          var s = n.delegate;
          if (s) {
            var c = N(s, n);
            if (c) {
              if (c === g) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;
          else if ("throw" === n.method) {
            if (i === d) throw ((i = v), n.arg);
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          i = y;
          var u = p(t, e, n);
          if ("normal" === u.type) {
            if (((i = n.done ? v : m), u.arg === g)) continue;
            return { value: u.arg, done: n.done };
          }
          "throw" === u.type &&
            ((i = v), (n.method = "throw"), (n.arg = u.arg));
        }
      };
    }
    function N(t, e) {
      var n = e.method,
        i = t.iterator[n];
      if (i === r)
        return (
          (e.delegate = null),
          ("throw" === n &&
            t.iterator.return &&
            ((e.method = "return"),
            (e.arg = r),
            N(t, e),
            "throw" === e.method)) ||
            ("return" !== n &&
              ((e.method = "throw"),
              (e.arg = new TypeError(
                "The iterator does not provide a '" + n + "' method",
              )))),
          g
        );
      var o = p(i, t.iterator, e.arg);
      if ("throw" === o.type)
        return (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), g;
      var a = o.arg;
      return a
        ? a.done
          ? ((e[t.resultName] = a.value),
            (e.next = t.nextLoc),
            "return" !== e.method && ((e.method = "next"), (e.arg = r)),
            (e.delegate = null),
            g)
          : a
        : ((e.method = "throw"),
          (e.arg = new TypeError("iterator result is not an object")),
          (e.delegate = null),
          g);
    }
    function _(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function j(t) {
      var e = t.completion || {};
      (e.type = "normal"), delete e.arg, (t.completion = e);
    }
    function I(t) {
      (this.tryEntries = [{ tryLoc: "root" }]),
        t.forEach(_, this),
        this.reset(!0);
    }
    function C(e) {
      if (e || "" === e) {
        var n = e[c];
        if (n) return n.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var i = -1,
            a = function t() {
              for (; ++i < e.length; )
                if (o.call(e, i)) return (t.value = e[i]), (t.done = !1), t;
              return (t.value = r), (t.done = !0), t;
            };
          return (a.next = a);
        }
      }
      throw new TypeError(t(e) + " is not iterable");
    }
    return (
      (w.prototype = x),
      a(T, "constructor", { value: x, configurable: !0 }),
      a(x, "constructor", { value: w, configurable: !0 }),
      (w.displayName = h(x, l, "GeneratorFunction")),
      (n.isGeneratorFunction = function (t) {
        var e = "function" == typeof t && t.constructor;
        return (
          !!e && (e === w || "GeneratorFunction" === (e.displayName || e.name))
        );
      }),
      (n.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, x)
            : ((t.__proto__ = x), h(t, l, "GeneratorFunction")),
          (t.prototype = Object.create(T)),
          t
        );
      }),
      (n.awrap = function (t) {
        return { __await: t };
      }),
      D(k.prototype),
      h(k.prototype, u, function () {
        return this;
      }),
      (n.AsyncIterator = k),
      (n.async = function (t, e, r, i, o) {
        void 0 === o && (o = Promise);
        var a = new k(f(t, e, r, i), o);
        return n.isGeneratorFunction(e)
          ? a
          : a.next().then(function (t) {
              return t.done ? t.value : a.next();
            });
      }),
      D(T),
      h(T, l, "Generator"),
      h(T, c, function () {
        return this;
      }),
      h(T, "toString", function () {
        return "[object Generator]";
      }),
      (n.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return (
          r.reverse(),
          function t() {
            for (; r.length; ) {
              var n = r.pop();
              if (n in e) return (t.value = n), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (n.values = C),
      (I.prototype = {
        constructor: I,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = r),
            (this.done = !1),
            (this.delegate = null),
            (this.method = "next"),
            (this.arg = r),
            this.tryEntries.forEach(j),
            !t)
          )
            for (var e in this)
              "t" === e.charAt(0) &&
                o.call(this, e) &&
                !isNaN(+e.slice(1)) &&
                (this[e] = r);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ("throw" === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var e = this;
          function n(n, i) {
            return (
              (s.type = "throw"),
              (s.arg = t),
              (e.next = n),
              i && ((e.method = "next"), (e.arg = r)),
              !!i
            );
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var a = this.tryEntries[i],
              s = a.completion;
            if ("root" === a.tryLoc) return n("end");
            if (a.tryLoc <= this.prev) {
              var c = o.call(a, "catchLoc"),
                u = o.call(a, "finallyLoc");
              if (c && u) {
                if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                if (this.prev < a.finallyLoc) return n(a.finallyLoc);
              } else if (c) {
                if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
              } else {
                if (!u) throw Error("try statement without catch or finally");
                if (this.prev < a.finallyLoc) return n(a.finallyLoc);
              }
            }
          }
        },
        abrupt: function (t, e) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var n = this.tryEntries[r];
            if (
              n.tryLoc <= this.prev &&
              o.call(n, "finallyLoc") &&
              this.prev < n.finallyLoc
            ) {
              var i = n;
              break;
            }
          }
          i &&
            ("break" === t || "continue" === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          var a = i ? i.completion : {};
          return (
            (a.type = t),
            (a.arg = e),
            i
              ? ((this.method = "next"), (this.next = i.finallyLoc), g)
              : this.complete(a)
          );
        },
        complete: function (t, e) {
          if ("throw" === t.type) throw t.arg;
          return (
            "break" === t.type || "continue" === t.type
              ? (this.next = t.arg)
              : "return" === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === t.type && e && (this.next = e),
            g
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t)
              return this.complete(r.completion, r.afterLoc), j(r), g;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ("throw" === n.type) {
                var i = n.arg;
                j(r);
              }
              return i;
            }
          }
          throw Error("illegal catch attempt");
        },
        delegateYield: function (t, e, n) {
          return (
            (this.delegate = { iterator: C(t), resultName: e, nextLoc: n }),
            "next" === this.method && (this.arg = r),
            g
          );
        },
      }),
      n
    );
  }
  function r(t, e, r, n, i, o, a) {
    try {
      var s = t[o](a),
        c = s.value;
    } catch (t) {
      return void r(t);
    }
    s.done ? e(c) : Promise.resolve(c).then(n, i);
  }
  function n(t) {
    return function () {
      var e = this,
        n = arguments;
      return new Promise(function (i, o) {
        var a = t.apply(e, n);
        function s(t) {
          r(a, i, o, s, c, "next", t);
        }
        function c(t) {
          r(a, i, o, s, c, "throw", t);
        }
        s(void 0);
      });
    };
  }
  function i(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return o(t);
      })(t) ||
      (function (t) {
        if (
          ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
          null != t["@@iterator"]
        )
          return Array.from(t);
      })(t) ||
      (function (t, e) {
        if (t) {
          if ("string" == typeof t) return o(t, e);
          var r = {}.toString.call(t).slice(8, -1);
          return (
            "Object" === r && t.constructor && (r = t.constructor.name),
            "Map" === r || "Set" === r
              ? Array.from(t)
              : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? o(t, e)
                : void 0
          );
        }
      })(t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
        );
      })()
    );
  }
  function o(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function a(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        "value" in n && (n.writable = !0),
        Object.defineProperty(t, c(n.key), n);
    }
  }
  function s(t, e, r) {
    return (
      (e = c(e)) in t
        ? Object.defineProperty(t, e, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = r),
      t
    );
  }
  function c(e) {
    var r = (function (e, r) {
      if ("object" != t(e) || !e) return e;
      var n = e[Symbol.toPrimitive];
      if (void 0 !== n) {
        var i = n.call(e, r || "default");
        if ("object" != t(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(e);
    })(e, "string");
    return "symbol" == t(r) ? r : r + "";
  }
  new ((function () {
    return (
      (t = function t(e) {
        var r = this;
        !(function (t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        })(this, t),
          s(this, "container", void 0),
          s(this, "content", void 0),
          s(this, "domRequirementsMet", void 0),
          s(this, "state", void 0),
          s(this, "timers", void 0),
          s(this, "config", {
            apiUrl: "/prove-identity-status",
            msBeforeInformingOfLongWait: 5e3,
            msBeforeAbort: 15e3,
            msBetweenRequests: 1e3,
            msBetweenDomUpdate: 2e3,
          }),
          s(this, "notInErrorOrDoneState", function () {
            return !(r.state.done || r.state.error);
          }),
          s(this, "reflectCompletion", function () {
            (r.state.spinnerState = "spinner__ready"),
              (r.state.spinnerStateText = r.content.complete.spinnerState),
              (r.state.buttonDisabled = !1),
              (r.state.done = !0);
          }),
          s(this, "reflectError", function () {
            (r.state.heading = r.content.error.heading),
              (r.state.messageText = r.content.error.messageText),
              (r.state.spinnerState = "spinner__failed"),
              (r.state.done = !0),
              (r.state.error = !0);
          }),
          s(this, "vDomHasChanged", function (t, e) {
            return JSON.stringify(t) !== JSON.stringify(e);
          }),
          s(this, "convert", function (t) {
            var e,
              r = document.createElement(t.nodeName);
            return (
              t.text && (r.textContent = t.text),
              t.innerHTML && (r.innerHTML = t.innerHTML),
              t.id && (r.id = t.id),
              t.classes && (e = r.classList).add.apply(e, i(t.classes)),
              t.buttonDisabled && r.setAttribute("disabled", t.buttonDisabled),
              r
            );
          }),
          s(this, "updateDom", function () {
            var t = r.vDomHasChanged(r.state.virtualDom, r.createVirtualDom()),
              e = document.getElementById("spinner-container");
            if (t) {
              (document.title = r.state.heading),
                (r.state.virtualDom = r.createVirtualDom());
              var n = r.state.virtualDom.map(r.convert);
              e.replaceChildren.apply(e, i(n));
            }
            r.state.error && e.classList.add("spinner-container__error"),
              r.state.done && clearInterval(r.timers.updateDomTimer);
          }),
          (this.container = e),
          this.initialiseContent(this.container),
          this.initialiseState();
      }),
      (r = [
        {
          key: "reflectLongWait",
          value: function () {
            "ready" !== this.state.spinnerState &&
              (this.state.spinnerStateText =
                this.content.longWait.spinnerStateText);
          },
        },
        {
          key: "initialiseTimers",
          value: function () {
            var t = this;
            this.domRequirementsMet &&
              ((this.timers.informUserWhereWaitIsLong = setTimeout(function () {
                t.reflectLongWait();
              }, this.config.msBeforeInformingOfLongWait)),
              (this.timers.updateDomTimer = setInterval(
                this.updateDom,
                this.config.msBetweenDomUpdate,
              )),
              (this.timers.abortUnresponsiveRequest = setTimeout(function () {
                t.reflectError();
              }, this.config.msBeforeAbort)));
          },
        },
        {
          key: "initialiseState",
          value: function () {
            this.domRequirementsMet &&
              ((this.state = {
                heading: this.content.initial.heading,
                spinnerStateText: this.content.initial.spinnerStateText,
                spinnerState: this.content.initial.spinnerState,
                buttonDisabled: !0,
                done: !1,
                error: !1,
                virtualDom: [],
              }),
              (this.timers = {}));
          },
        },
        {
          key: "initialiseContent",
          value: function (t) {
            try {
              (this.content = {
                initial: {
                  heading: t.dataset.initialHeading,
                  spinnerStateText: t.dataset.initialSpinnerstatetext,
                  spinnerState: t.dataset.initialSpinnerstate,
                },
                error: {
                  heading: t.dataset.errorHeading,
                  messageText: t.dataset.errorMessagetext,
                  whatYouCanDo: {
                    heading: t.dataset.errorWhatyoucandoHeading,
                    message: {
                      text1: t.dataset.errorWhatyoucandoMessageText1,
                      link: {
                        href: t.dataset.errorWhatyoucandoMessageLinkHref,
                        text: t.dataset.errorWhatyoucandoMessageLinkText,
                      },
                      text2: t.dataset.errorWhatyoucandoMessageText2,
                    },
                  },
                },
                complete: { spinnerState: t.dataset.completeSpinnerstate },
                longWait: {
                  spinnerStateText: t.dataset.longwaitSpinnerstatetext,
                },
              }),
                (this.domRequirementsMet = !0);
            } catch (t) {
              this.domRequirementsMet = !1;
            }
          },
        },
        {
          key: "createVirtualDom",
          value: function () {
            var t = [
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
              ],
              e = [
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
                  innerHTML: ""
                    .concat(
                      this.content.error.whatYouCanDo.message.text1,
                      '<a href="',
                    )
                    .concat(
                      this.content.error.whatYouCanDo.message.link.href,
                      '">',
                    )
                    .concat(
                      this.content.error.whatYouCanDo.message.link.text,
                      "</a>",
                    )
                    .concat(this.content.error.whatYouCanDo.message.text2),
                  classes: ["govuk-body"],
                },
              ];
            return this.state.error ? e : t;
          },
        },
        {
          key: "requestIDProcessingStatus",
          value:
            ((c = n(
              e().mark(function t() {
                var r,
                  i,
                  o = this;
                return e().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            fetch(this.config.apiUrl)
                          );
                        case 3:
                          return (r = t.sent), (t.next = 6), r.json();
                        case 6:
                          "COMPLETED" === (i = t.sent).status ||
                          "INTERVENTION" === i.status
                            ? this.reflectCompletion()
                            : "ERROR" === i.status
                              ? this.reflectError()
                              : this.notInErrorOrDoneState() &&
                                setTimeout(
                                  n(
                                    e().mark(function t() {
                                      return e().wrap(function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              return (
                                                (t.next = 2),
                                                o.requestIDProcessingStatus()
                                              );
                                            case 2:
                                            case "end":
                                              return t.stop();
                                          }
                                      }, t);
                                    }),
                                  ),
                                  this.config.msBetweenRequests,
                                ),
                            (t.next = 13);
                          break;
                        case 10:
                          (t.prev = 10),
                            (t.t0 = t.catch(0)),
                            this.reflectError();
                        case 13:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  this,
                  [[0, 10]],
                );
              }),
            )),
            function () {
              return c.apply(this, arguments);
            }),
        },
        {
          key: "init",
          value: function () {
            var t = this;
            this.initialiseTimers(),
              this.updateDom(),
              this.requestIDProcessingStatus().then(function () {
                t.updateDom();
              });
          },
        },
      ]),
      r && a(t.prototype, r),
      o && a(t, o),
      Object.defineProperty(t, "prototype", { writable: !1 }),
      t
    );
    var t, r, o, c;
  })())(document.getElementById("spinner-container")).init();
})();
