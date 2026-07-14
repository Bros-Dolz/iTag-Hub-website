/* iTag Hub — theme toggle.
   Default follows the OS (no data-theme attribute => CSS uses
   prefers-color-scheme). A user choice is persisted and wins.
   This file is loaded in <head> so the stored choice is applied
   before first paint (no flash). */
(function () {
  var root = document.documentElement;
  var KEY = 'itaghub-theme';

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (stored === 'light' || stored === 'dark') {
    root.setAttribute('data-theme', stored);
  }

  function effective() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function toggle() {
    var next = effective() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    label();
  }

  function label() {
    var btn = document.getElementById('themeToggle');
    if (btn) btn.setAttribute('aria-label', 'Switch to ' + (effective() === 'dark' ? 'light' : 'dark') + ' mode');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggle);
    label();
  });
})();
