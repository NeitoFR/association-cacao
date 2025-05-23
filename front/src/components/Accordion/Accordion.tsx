import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: string | null | undefined;
  className: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, className }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`rounded-xl bg-white p-5 flex flex-col ${className}`}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl md:text-2xl font-bold text-secondary">
          {title}
        </h3>
        <div className="flex items-center justify-center w-8 h-8 bg-primary/50 rounded-full">
          <img
            src="/icons/down_arrow.svg"
            className={`size-4 transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            alt={isExpanded ? "Replier section" : "Déplier section"}
          />
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? "h-auto opacity-100 mt-4 pt-4 border-t border-gray-200"
            : "h-0 opacity-0 mt-0 pt-0"
        }`}
      >
        <div className={`overflow-hidden ${isExpanded ? "" : "h-0"}`}>
          <div className="prose max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: content || "Pas d'informations disponibles",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
