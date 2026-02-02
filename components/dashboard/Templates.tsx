import React from 'react';
import { Template } from '../../types/template';
import { EllipsisVerticalIcon } from './icons/EllipsisVerticalIcon';
import { EyeIcon } from './icons/EyeIcon';
import { TemplatesIcon } from './icons/TemplatesIcon';
import { DocumentIcon } from './icons/DocumentIcon';


const Templates: React.FC<{ template: Template }> = ({ template }) => {
  const getCategoryIcon = () => {
    switch (template.category) {
      case 'Presentation':
      case 'Pitch Deck':
        return <TemplatesIcon />;
      case 'Proposal':
      case 'Contract':
        return <DocumentIcon />;
      default:
        return <TemplatesIcon />;
    }
  };

  return (
    <div className="mt-20px flex flex-col relative bg-white rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group border border-slate-200/80">
      <div className="relative overflow-hidden">
        <div className="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-md shadow-sm">
          {getCategoryIcon()}
        </div>
        {template.tags.includes('PRO') && (
          <div className="absolute top-2 right-2 z-10 bg-nd-purple text-white text-xs font-bold px-3 py-1 rounded-full">
            PRO
          </div>
        )}
        <img
          src={template.imageUrl}
          alt={template.title}
          className="w-full h-44 object-cover object-top rounded-t-lg"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-slate-800' : 'bg-slate-400/80'}`}></div>
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center text-xs text-nd-text-secondary font-medium">
          <div className="flex items-center gap-1.5">
            {getCategoryIcon()}
            <span>{template.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="w-4 h-4" />
            <span>{template.views}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-nd-purple text-white flex items-center justify-center font-bold text-xs">
            ND
          </div>
          <h3 className="font-semibold text-nd-text-primary text-sm leading-snug flex-1">
            {template.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Templates;
