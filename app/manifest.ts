import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PubSpace: The app for public spaces',
    short_name: 'PubSpace',
    description: 'PubSpace: The app for public spaces',
    start_url: '/',
    display: 'standalone',
    background_color: '#2a9d8f',
    theme_color: '#2a9d8f',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
  }
}