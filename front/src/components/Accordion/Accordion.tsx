import React, { useState } from "react";

interface AccordionProps {
  title: string;
  content: string | null | undefined;
  className: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`rounded-sm bg-white p-4 ${className}`}>
      <h3 className="w-full text-center text-[24px] font-bold">{title}</h3>
      <p
        className="hidden md:block"
        dangerouslySetInnerHTML={{ __html: content || "Pas d'infos" }}
      ></p>
    </div>
  );
};

export default Accordion;
