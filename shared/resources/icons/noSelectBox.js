/* eslint-disable */
import React from 'react'

const NoSelectIcon = ({ color = '#E5E9F1', width = '18', height = '18', fill = '#FFFFFF' }) => {
  const node = `<svg width=${width}px height=${height}px viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
          <rect id="path-1" x="57" y="251" width=${width} height=${width} rx="2"></rect>
      </defs>
      <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="CMS选文中心-图文头条" transform="translate(-57.000000, -251.000000)">
              <g id="Rectangle-31-Copy">
                  <use fill=${fill} fill-rule="evenodd" xlink:href="#path-1"></use>
                  <rect stroke=${color} stroke-width="1" x="57.5" y="251.5" width="17" height="17" rx="2"></rect>
              </g>
          </g>
      </g>
  </svg>`

  return <div dangerouslySetInnerHTML={{ __html: node }} style={{ height: 18 }} />
}


export default NoSelectIcon
