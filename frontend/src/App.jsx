import { Hero } from './components/Hero';
import { FeatureGrid } from './components/FeatureGrid';
import { Workflow } from './components/Workflow';
import { Footer } from './components/Footer';
import { features, roles, workflowSteps } from './data';

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Frontend Base</p>
          <h1>AI Mock Interview Marketplace</h1>
        </div>
        <nav className="topbar-nav" aria-label="Primary">
          {roles.map((role) => (
            <a key={role.label} href={role.href}>
              {role.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <Hero />
        <section className="section" id="features">
          <div className="section-heading">
            <p className="eyebrow">Platform Modules</p>
            <h2>Everything the frontend needs to support the product</h2>
            <p>
              The interface is organized around discovery, booking, session delivery,
              earnings, AI feedback, and organization workflows.
            </p>
          </div>
          <FeatureGrid items={features} />
        </section>

        <section className="section section-alt" id="workflow">
          <div className="section-heading">
            <p className="eyebrow">User Flow</p>
            <h2>Designed for the full interview journey</h2>
          </div>
          <Workflow steps={workflowSteps} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
