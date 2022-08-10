import Head from "next/head";
import groq from "groq";

import client from "util/client.js";
import Layout from "components/layout.jsx";

export default function Site({ data, preview = false }) {
  const { title } = data;
  return (
    <div>
      <Head>
        <title>Statistikk for {title} </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="bg-green-400">
          {console.log(data)}
          <h1 className="text-3xl font-bold underline">
            {" "}
            Statistikk for {title}
          </h1>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const data = await client.fetch(
    `
      *[_type == "site" && slug.current == $slug][0]{title, webSiteUrl,  ...}
    `,
    { slug }
  );
  return {
    props: {
      data,
    },
    revalidate: 200,
  };
}
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "site" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
