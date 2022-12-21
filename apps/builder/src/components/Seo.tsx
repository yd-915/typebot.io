import Head from 'next/head'

export const Seo = ({
  title,
  currentUrl = 'https://app.typebot.io',
  description = 'Create and publish conversational forms that collect 4 times more answers and feel native to your product',
  imagePreviewUrl = 'https://app.typebot.io/site-preview.png',
}: {
  title: string
  description?: string
  currentUrl?: string
  imagePreviewUrl?: string
}) => {
  const formattedTitle = `${title} | Liiska`

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />

      <meta property="twitter:url" content={currentUrl} />
      <meta property="og:url" content={currentUrl} />

      <meta name="description" content={description} />
      <meta property="twitter:description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:image" content={imagePreviewUrl} />
      <meta property="twitter:image" content={imagePreviewUrl} />

      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
    </Head>
  )
}
