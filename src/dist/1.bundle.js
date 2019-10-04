webpackJsonp([1],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ion_icon", function() { return Icon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chunk_2a882949_js__ = __webpack_require__(2);



var validateContent = function validateContent(svgContent) {
  if (svgContent) {
    var div = document.createElement('div');
    div.innerHTML = svgContent; // setup this way to ensure it works on our buddy IE

    for (var i = div.childNodes.length - 1; i >= 0; i--) {
      if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
        div.removeChild(div.childNodes[i]);
      }
    } // must only have 1 root element


    var svgElm = div.firstElementChild;

    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
      svgElm.setAttribute('class', 's-ion-icon'); // root element must be an svg
      // lets double check we've got valid elements
      // do not allow scripts

      if (isValid(svgElm)) {
        return div.innerHTML;
      }
    }
  }

  return '';
};

var isValid = function isValid(elm) {
  if (elm.nodeType === 1) {
    if (elm.nodeName.toLowerCase() === 'script') {
      return false;
    }

    for (var i = 0; i < elm.attributes.length; i++) {
      var val = elm.attributes[i].value;

      if (Object(__WEBPACK_IMPORTED_MODULE_1__chunk_2a882949_js__["c" /* i */])(val) && val.toLowerCase().indexOf('on') === 0) {
        return false;
      }
    }

    for (var i = 0; i < elm.childNodes.length; i++) {
      if (!isValid(elm.childNodes[i])) {
        return false;
      }
    }
  }

  return true;
};

var requests = new Map();

var getSvgContent = function getSvgContent(url) {
  // see if we already have a request for this url
  var req = requests.get(url);

  if (!req) {
    // we don't already have a request
    req = fetch(url).then(function (rsp) {
      if (rsp.status <= 299) {
        return rsp.text();
      }

      return Promise.resolve(null);
    }).then(function (svgContent) {
      return validateContent(svgContent);
    }); // cache for the same requests

    requests.set(url, req);
  }

  return req;
};
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */


var Icon =
/** @class */
function () {
  function Icon(hostRef) {
    Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["f" /* r */])(this, hostRef);
    this.mode = getIonMode(this);
    this.isVisible = false;
    /**
     * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
     * Default, `false`.
     */

    this.lazy = false;
  }

  Icon.prototype.connectedCallback = function () {
    var _this = this; // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible


    this.waitUntilVisible(this.el, '50px', function () {
      _this.isVisible = true;

      _this.loadIcon();
    });
  };

  Icon.prototype.disconnectedCallback = function () {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  };

  Icon.prototype.waitUntilVisible = function (el, rootMargin, cb) {
    var _this = this;

    if (this.lazy && typeof window !== 'undefined' && window.IntersectionObserver) {
      var io_1 = this.io = new window.IntersectionObserver(function (data) {
        if (data[0].isIntersecting) {
          io_1.disconnect();
          _this.io = undefined;
          cb();
        }
      }, {
        rootMargin: rootMargin
      });
      io_1.observe(el);
    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  };

  Icon.prototype.loadIcon = function () {
    var _this = this;

    if (this.isVisible) {
      var url = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_2a882949_js__["b" /* g */])(this);

      if (url) {
        getSvgContent(url).then(function (svgContent) {
          return _this.svgContent = svgContent;
        });
      }
    }

    if (!this.ariaLabel) {
      var label = Object(__WEBPACK_IMPORTED_MODULE_1__chunk_2a882949_js__["a" /* b */])(this.name, this.icon, this.mode, this.ios, this.md); // user did not provide a label
      // come up with the label based on the icon name

      if (label) {
        this.ariaLabel = label.replace('ios-', '').replace('md-', '').replace(/\-/g, ' ');
      }
    }
  };

  Icon.prototype.render = function () {
    var _a, _b;

    var mode = this.mode || 'md';
    var flipRtl = this.flipRtl || this.ariaLabel && this.ariaLabel.indexOf('arrow') > -1 && this.flipRtl !== false;
    return Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["e" /* h */])(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["a" /* H */], {
      role: "img",
      "class": Object.assign((_a = {}, _a[mode] = true, _a), createColorClasses(this.color), (_b = {}, _b["icon-" + this.size] = !!this.size, _b['flip-rtl'] = !!flipRtl && this.el.ownerDocument.dir === 'rtl', _b))
    }, this.svgContent ? Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["e" /* h */])("div", {
      "class": "icon-inner",
      innerHTML: this.svgContent
    }) : Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["e" /* h */])("div", {
      "class": "icon-inner"
    }));
  };

  Object.defineProperty(Icon, "assetsDirs", {
    get: function get() {
      return ["svg"];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Icon.prototype, "el", {
    get: function get() {
      return Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["c" /* d */])(this);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Icon, "watchers", {
    get: function get() {
      return {
        "name": ["loadIcon"],
        "src": ["loadIcon"],
        "icon": ["loadIcon"]
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Icon, "style", {
    get: function get() {
      return ":host{display:inline-block;width:1em;height:1em;contain:strict;fill:currentColor;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}.icon-inner,svg{display:block;height:100%;width:100%}:host(.flip-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.icon-small){font-size:18px!important}:host(.icon-large){font-size:32px!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary,#3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary,#0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary,#f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success,#10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning,#ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger,#f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light,#f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium,#989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark,#222428)}";
    },
    enumerable: true,
    configurable: true
  });
  return Icon;
}();

var getIonMode = function getIonMode(ref) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__chunk_58252182_js__["b" /* c */])(ref) || document.documentElement.getAttribute('mode') || 'md';
};

var createColorClasses = function createColorClasses(color) {
  var _a;

  return color ? (_a = {
    'ion-color': true
  }, _a["ion-color-" + color] = true, _a) : null;
};



/***/ })

});
//# sourceMappingURL=1.bundle.js.map