/* eslint-disable */
import React from 'react'

const SelectIcon = ({ color = '#B8E986', width = '18', height = '18', fill = '#FFFFFF' }) => {
  const node = `<svg width=${width} height=${height} viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
          <rect id="path-1" x="0" y="1" width=${width} height=${height} rx="2"></rect>
      </defs>
      <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="CMS选文中心-图文头条" transform="translate(-57.000000, -204.000000)">
              <g id="choose" transform="translate(57.000000, 203.000000)">
                  <g id="Rectangle-31">
                      <use fill=${fill} fill-rule="evenodd" xlink:href="#path-1"></use>
                      <rect stroke=${color} stroke-width="1" x="0.5" y="1.5" width="17" height="17" rx="2"></rect>
                  </g>
                  <polygon id="Combined-Shape" fill=${color} transform="translate(9.000000, 8.000000) rotate(45.000000) translate(-9.000000, -8.000000) " points="11 12 5 12 5 14 13 14 13 2 11 2"></polygon>
              </g>
          </g>
      </g>
  </svg>`

  return <div dangerouslySetInnerHTML={{ __html: node }} style={{ height: 18 }} />
}


export default SelectIcon
