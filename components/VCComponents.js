import React from 'react';
import parse from 'html-react-parser';
import { getAttachment } from "@/lib/wordpress";
import GravityForm from './GravityForm';
import ResourcesSidebarWhitepapers from './ResourcesSidebarWhitepapers';

// Component to render VC Row
export function VCRow({ row, images = {} }) {
  const style = {};
  let sidebarRendered = false;
  if (row.bgColor) {
    style.backgroundColor = row.bgColor;
  }
  if (row.css) {
    const paddingTop = row.css.match(/padding-top:\s*([^;]+)/)?.[1];
    const paddingBottom = row.css.match(/padding-bottom:\s*([^;]+)/)?.[1];
    if (paddingTop) style.paddingTop = paddingTop;
    if (paddingBottom) style.paddingBottom = paddingBottom;
  }

  const className = row.fullWidth ? 'w-full' : 'container mx-auto';
  
  return (
    <div className={className} style={style}>
      <div className="flex flex-wrap">
        {row.columns.map((column, index) => (
          <VCColumn key={index} column={column} images={images} columnIndex={index} sidebarRendered={sidebarRendered} />
        ))}
      </div>
    </div>
  );
}

// Component to render VC Column
export function VCColumn({ column, images = {}, columnIndex, sidebarRendered }) {

  const getWidthClass = (width) => {
    const widthMap = {
      '1/1': 'w-full',
      '1/2': 'w-1/2',
      '1/3': 'w-1/3',
      '2/3': 'w-2/3',
      '1/4': 'w-1/4',
      '3/4': 'w-3/4',
      '1/5': 'w-1/5',
      '2/5': 'w-2/5',
      '3/5': 'w-3/5',
      '4/5': 'w-4/5',
      '1/6': 'w-1/6',
      '5/6': 'w-5/6'
    };
    return widthMap[width] || 'w-full';
  };

  const getOffsetClass = (offset) => {
    if (offset && offset.includes('vc_hidden-sm')) return 'hidden md:block';
    if (offset && offset.includes('vc_hidden-xs')) return 'hidden lg:block';
    return '';
  };

  const widthClass = getWidthClass(column.width);
  const offsetClass = getOffsetClass(column.offset);
  const classes = [widthClass, offsetClass, column.elClass].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {column.content.map((element, index) => (
        <VCElement key={index} element={element} images={images} />
      ))}
    </div>
  );
}

// Component to render individual VC elements
export function VCElement({ element, images = {} }) {

  switch (element.type) {

    case 'vc_column_text':
      const hasGravityForm = element.content && element.content.includes('[gravityform');

      if (hasGravityForm) {
        const idMatch = element.content.match(/\[gravityform[^\]]*id="(\d+)"/);
        const formId = idMatch ? idMatch[1] : null;
        const textContent = element.content.replace(/\[gravityform[^\]]*\]/g, '');

        return (
          <div className={element.elClass}>
            {textContent && parse(textContent)}
            {formId && <GravityForm id={formId} />}
          </div>
        );
      }

      return (
        <div className={element.elClass}>
          {parse(element.content)}
        </div>
      );

    case 'vc_single_image':
      const imageUrl = images[element.imageId];

      if (imageUrl) {
        return (
          <img
            src={imageUrl}
            alt="Content Image"
            className={`max-w-full h-auto block ${element.elClass}`}
          />
        );
      }

      return (
        <div className={`bg-blue-600 p-5 text-center min-h-[300px] flex items-center justify-center ${element.elClass}`}>
          <div>
            <p className="m-0 text-white mb-2 text-lg font-semibold">
              QA Challenges in Data Integration Projects & iceDQ
            </p>
            <p className="m-0 text-blue-100 text-sm">iceDQ Logo</p>
          </div>
        </div>
      );

    case 'sidebar':
      return <ResourcesSidebarWhitepapers />;

    default:
      return <div>Unknown element type: {element.type}</div>;
  }
}