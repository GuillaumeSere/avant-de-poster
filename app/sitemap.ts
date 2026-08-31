import type { MetadataRoute } from "next";

const SITE_URL = "https://avant-de-poster.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${SITE_URL}/quiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/photo`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/conversations`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/analyse`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: `${SITE_URL}/conseils`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${SITE_URL}/progression`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

