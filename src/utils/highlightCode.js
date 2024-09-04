export const highlightCode = (code) => {
  return code
    .replace(/\b(public|class|interface|extends|implements|private|static|final|void|int|double|String|boolean|abstract|return|if|else|new)\b/g, '<span style="color: #ff79c6;">$1</span>')
    .replace(/\b(true|false|null)\b/g, '<span style="color: #bd93f9;">$1</span>')
    .replace(/(\/\/.+)$/gm, '<span style="color: #6272a4;">$1</span>')
    .replace(/(".*?")/g, '<span style="color: #f1fa8c;">$1</span>')
    .replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color: #bd93f9;">$1</span>')
    .replace(/(@Override)/g, '<span style="color: #50fa7b;">$1</span>');
};