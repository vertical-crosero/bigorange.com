import Link from "next/link";
import { categories, services, type ServiceCategory } from "@/data/services";

const categoryOrder: ServiceCategory[] = ["personas", "empresas", "responsabilidad"];

export default function ServiceCards() {
  return (
    <div className="categoryGrid reveal">
      {categoryOrder.map((key) => {
        const count = services.filter((s) => s.category === key).length;
        return (
          <Link href={`/servicios/${key}`} className="categoryCard" key={key}>
            <p className="eyebrow">{categories[key].short}</p>
            <h3>{categories[key].label}</h3>
            <p className="categoryCardDesc">{categories[key].description}</p>
            <div className="categoryCardFooter">
              <span>{count} seguros disponibles</span>
              <span className="categoryCardArrow">Ver todos →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
