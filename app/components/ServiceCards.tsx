"use client";

import { useState } from "react";
import { categories, services, type ServiceCategory } from "@/data/services";

const categoryOrder: ServiceCategory[] = ["personas", "empresas", "responsabilidad"];

export default function ServiceCards() {
  const [open, setOpen] = useState<ServiceCategory | null>("personas");

  function toggle(key: ServiceCategory) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <div className="accordion reveal">
      {categoryOrder.map((key) => {
        const list = services.filter((s) => s.category === key);
        const isOpen = open === key;

        return (
          <div className="accordionItem" key={key}>
            <button
              className="accordionTrigger"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
            >
              <span className="accordionBadge">{categories[key].short}</span>
              <div className="accordionMeta">
                <span className="accordionTitle">{categories[key].label}</span>
                <span className="accordionDesc">{categories[key].description}</span>
              </div>
              <div className="accordionRight">
                <span className="accordionCount">{list.length} servicios</span>
                <svg
                  className="accordionChevron"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 6l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            <div className={`accordionPanel${isOpen ? " accordionPanelOpen" : ""}`}>
              <div className="accordionPanelInner">
                <div className="accordionGrid">
                  {list.map((s) => (
                    <div className="accordionService" key={s.id}>
                      <strong>{s.title}</strong>
                      <p>{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
