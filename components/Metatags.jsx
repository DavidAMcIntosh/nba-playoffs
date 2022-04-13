import Head from 'next/head';

export default function Metatags({
    title = 'Playoff Overtime',
    description = 'A NBA Playoff Prediction Game/Web App',
    image = '/featured.jpeg',
  }) {
    return (
      <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@bwai_dave" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
  
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
    );
  }