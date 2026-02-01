import { useEffect } from 'react'

export function SEO({ 
  title, 
  description, 
  keywords,
  canonical,
  type = 'website',
  image = 'https://ezincorporate.in/og-image.png',
  article = null 
}) {
  useEffect(() => {
    // Update document title
    document.title = title ? `${title} | EZincorporate` : 'EZincorporate — Company Registration & Startup Incorporation in India'
    
    // Update meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, 'property')
    updateMetaTag('og:description', description, 'property')
    updateMetaTag('og:type', type, 'property')
    updateMetaTag('og:image', image, 'property')
    if (canonical) {
      updateMetaTag('og:url', canonical, 'property')
    }
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, 'property')
    updateMetaTag('twitter:description', description, 'property')
    updateMetaTag('twitter:image', image, 'property')
    
    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canonical
    }
    
    // Add article structured data if it's a blog post
    if (article) {
      addArticleStructuredData(article)
    }
    
    return () => {
      // Cleanup article structured data on unmount
      const articleScript = document.querySelector('script[data-article-schema]')
      if (articleScript) {
        articleScript.remove()
      }
    }
  }, [title, description, keywords, canonical, type, image, article])
  
  return null
}

function updateMetaTag(name, content, attr = 'name') {
  if (!content) return
  
  let meta = document.querySelector(`meta[${attr}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, name)
    document.head.appendChild(meta)
  }
  meta.content = content
}

function addArticleStructuredData(article) {
  // Remove existing article schema
  const existing = document.querySelector('script[data-article-schema]')
  if (existing) existing.remove()
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.description,
    "image": article.image || "https://ezincorporate.in/og-image.png",
    "author": {
      "@type": "Organization",
      "name": "EZincorporate"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EZincorporate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ezincorporate.in/logo.svg"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-article-schema', 'true')
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

export default SEO
