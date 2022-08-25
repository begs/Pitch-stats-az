import Head from 'next/head';
import { groq } from 'next-sanity';

import client from 'util/client.js';
import Layout from 'components/layout.jsx';
import { blockContentQuery } from 'util/queries';
import BlockContent from 'components/blockContent.jsx';
import Heading from 'components/heading';

export default function Site({ data, preview = false }) {
  const { title, webSiteUrl = '', blockContent = [] } = data;
  const metaTitle = `Statistikk for ${title}`;
  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading title={title} />
        <BlockContent blockContent={blockContent} />
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  const { slug = '' } = context.params;
  const siteQuery = groq`*[_type == "site" && slug.current == $slug][0]{title, webSiteUrl, ${blockContentQuery},  ...}`;
  const data = await client.fetch(siteQuery, { slug });
  return {
    props: {
      data
    },
    revalidate: 200
  };
}
export async function getStaticPaths() {
  const allSitePathsQuery = groq`*[_type == "site" && defined(slug.current)][].slug.current`;
  const paths = await client.fetch(allSitePathsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true
  };
}
