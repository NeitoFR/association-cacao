import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: string | null | undefined;
  className: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <div className="flex justify-center items-center">
        <h3
          className={`w-full md:text-2xl font-bold font-glacial not-italic ${
            isExpanded ? "pb-4" : ""
          }`}
        >
          {title}
        </h3>
        <img
          src="/icons/down_arrow.svg"
          className={`md:hidden size-4 cursor-pointer transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
          alt="Déplier section"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out overflow-y-scroll ${
          isExpanded ? "max-h-64" : "max-h-0 md:max-h-64"
        }`}
      >
        <p dangerouslySetInnerHTML={{ __html: content || "Pas d'infos" }}></p>
      </div>
    </div>
  );
};

export default Accordion;
