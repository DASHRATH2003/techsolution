import React from 'react';

const workflowSteps = [
  {
    id: 1,
    title: "Idea",
    description: "We start by understanding your vision",
    icon: "/icons/idea-bulb.svg"
  },
  {
    id: 2,
    title: "Design",
    description: "Create beautiful and intuitive user interfaces",
    icon: "/icons/design-pencil.svg"
  },
  {
    id: 3,
    title: "Development",
    description: "Build robust and scalable solutions",
    icon: "/icons/dev-hammer.svg"
  },
  {
    id: 4,
    title: "Test",
    description: "Ensure quality and performance",
    icon: "/icons/test-magnifier.svg"
  },
  {
    id: 5,
    title: "Go Live",
    description: "Launch and maintain your solution",
    icon: "/icons/rocket-launch.svg"
  }
];

const WorkflowSection = () => {
  return (
    <section className="workflow-section" data-section="workflow">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title animate-in">
            WORKFLOW AT <span className="gradient-text">SMARTRIED</span>
          </h2>
        </div>

        <div className="workflow-container animate-in">
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="workflow-step">
                  <div className="step-icon">
                    <img src={step.icon} alt={step.title} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="step-arrow">
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection; 