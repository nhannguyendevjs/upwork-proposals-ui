export const extractHTMLContent = (html: string) => {
  const span = document.createElement('span');
  span.innerHTML = html;
  const text = span.textContent || span.innerText;
  span.remove();
  return text;
};
