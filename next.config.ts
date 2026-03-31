import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'de.cdn-website.com' },
      { protocol: 'https', hostname: 'le-de.cdn-website.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
