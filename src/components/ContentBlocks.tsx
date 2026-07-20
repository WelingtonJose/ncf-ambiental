import { Check } from "lucide-react";

export function Specs({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="spec-grid">
      {items.map((item) => (
        <article key={item.title} className="spec-card">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="mt-7 grid gap-3">
      {items.map((item) => (
        <p className="check-line" key={item}>
          <Check />
          {item}
        </p>
      ))}
    </div>
  );
}
