import { markedHighlight } from "marked-highlight";
import sanitize from "sanitize-html";
import { Marked } from "marked";
import hljs from "highlight.js";

const sanitizeOpts: sanitize.IOptions = {
    allowedTags: sanitize.defaults.allowedTags.concat(['img']),
    allowedClasses: {
        'code': ['hljs', 'language-*'],
        'span': ['hljs-*'],
    },
};

// Parses plaint text as a markdown and sanitizes HTML output
export const parse = (md: string): string => {
    const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        })
    );

    const parsed = marked.parse(md);
    console.log(parsed);
    if (parsed instanceof Promise) {
        parsed.then((val) => {
            return sanitize(val, sanitizeOpts);
        });
    } else {
        return sanitize(parsed, sanitizeOpts);
    }
    return '';
}