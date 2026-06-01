export function Workflow({ steps }) {
  return (
    <div className="workflow-grid">
      {steps.map((item) => (
        <article className="workflow-card" key={item.step}>
          <span className="workflow-step">{item.step}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}
