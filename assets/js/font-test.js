(function () {
  var KEY = "travelBlog.fontTest";
  var buttons = {
    A: document.getElementById("font-a-btn"),
    B: document.getElementById("font-b-btn"),
    C: document.getElementById("font-c-btn")
  };

  function setFont(value) {
    if (value) {
      document.documentElement.setAttribute("data-font-test", value);
    } else {
      document.documentElement.removeAttribute("data-font-test");
    }
    try {
      if (value) {
        localStorage.setItem(KEY, value);
      } else {
        localStorage.removeItem(KEY);
      }
    } catch (e) {}
    updateButtons();
  }

  function updateButtons() {
    var current = document.documentElement.getAttribute("data-font-test");
    Object.keys(buttons).forEach(function (key) {
      var isActive = current === key;
      buttons[key].classList.toggle("active", isActive);
      buttons[key].setAttribute("aria-pressed", String(isActive));
    });
  }

  Object.keys(buttons).forEach(function (key) {
    buttons[key].addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-font-test");
      setFont(current === key ? null : key);
    });
  });

  updateButtons();
})();
