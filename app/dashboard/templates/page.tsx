import Templates from '@/components/dashboard/Templates';
import { TEMPLATES } from '../../templatesData';

export default function TemplatesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <Templates key={template.id} template={template} />
          ))}
    </div>
  );
}
