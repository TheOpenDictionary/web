import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import wikiLinkPlugin from 'remark-wiki-link';
import { unified } from 'unified';

const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(wikiLinkPlugin)
	.use(remarkRehype)
	.use(rehypeStringify);

export async function markdownToHTML(value: string) {
	return String(await markdownProcessor.process(value));
}
