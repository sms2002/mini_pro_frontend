import React, { useEffect } from "react";
import "./Tableu.css";
function Tableu() {
  useEffect(() => {
    const divElement = document.getElementById('viz1687796178627');
    const vizElement = divElement.getElementsByTagName('object')[0];

    if (divElement.offsetWidth > 800) {
      vizElement.style.width = '100%';
      vizElement.style.height = divElement.offsetWidth * 0.45 + 'px';
    } else if (divElement.offsetWidth > 500) {
      vizElement.style.width = '100%';
      vizElement.style.height = divElement.offsetWidth * 0.45 + 'px';
    } else {
      vizElement.style.width = '100%';
      vizElement.style.height = '1277px';
    }

    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode.insertBefore(scriptElement, vizElement);

    // Cleanup function
    return () => {
      if(vizElement.parentNode!=null)
      {
      vizElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  return (
    <div className='tableauPlaceholder' id='viz1687796178627' style={{ position: 'relative' }}>
      <noscript>
        <a href='#'>
          <img
            alt='Dashboard 1'
            src='https://public.tableau.com/static/images/WK/WKSZ2FHXM/1_rss.png'
            style={{ border: 'none' }}
          />
        </a>
      </noscript>
      <object className='tableauViz' style={{ display: 'none' }}>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='path' value='shared/WKSZ2FHXM' />
        <param name='toolbar' value='yes' />
        <param
          name='static_image'
          value='https://public.tableau.com/static/images/WK/WKSZ2FHXM/1.png'
        />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='en-US' />
      </object>
    </div>
  );
}

export default Tableu;
