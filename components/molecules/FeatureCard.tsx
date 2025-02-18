import { Icon } from "../atoms/Icon";

export const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="p-6 border border-neutral-200 rounded-xl">
        <Icon name={icon} className="text-2xl text-neutral-600 mb-4" />
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    );
  };
  