export function funyCatch() {
  try {

  } catch (err) {
    window.location.href = 'https://stackoverflow.com/search?q=[js]+' + err.message
  }
}
