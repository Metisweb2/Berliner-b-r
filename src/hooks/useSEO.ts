import { useEffect } from 'react';

export function useSEO(title: string, description: string, overrideTitle: boolean = false) {
  useEffect(() => {
    const fullTitle = overrideTitle ? title : `${title} | Fahrschule Bär`;
    document.title = fullTitle;
    
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
  }, [title, description]);
}
