(function () {
  var KEY = "travelBlog.theme";
  var lightBtn = document.getElementById("theme-light-btn");
  var darkBtn = document.getElementById("theme-dark-btn");

  function setTheme(value) {
    document.documentElement.setAttribute("data-theme", value);
    try {
      localStorage.setItem(KEY, value);
    } catch (e) {}
    updateButtons();
  }

  function updateButtons() {
    var isLight = document.documentElement.getAttribute("data-theme") === "light";
    lightBtn.classList.toggle("active", isLight);
    lightBtn.setAttribute("aria-pressed", String(isLight));
    darkBtn.classList.toggle("active", !isLight);
    darkBtn.setAttribute("aria-pressed", String(!isLight));
  }

  lightBtn.addEventListener("click", function () { setTheme("light"); });
  darkBtn.addEventListener("click", function () { setTheme("dark"); });
  updateButtons();
})();
