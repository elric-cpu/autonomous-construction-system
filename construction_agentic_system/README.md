# Construction Agentic System

This repository implements a multi‑agent system for a residential construction company using the [CrewAI](https://github.com/crewAIInc/crewAI) framework.  The system models the nine key management roles described in the provided job descriptions as autonomous AI agents that collaborate to evaluate whether the company should accept a new project.

## Project overview

The construction business relies on many specialists—from estimating and finance to marketing and site supervision.  This repository turns those job descriptions into a collaborative AI “crew.”  Each agent is defined by its role, goal and backstory, all taken from the provided job description files.  A set of tasks guide the agents through a structured decision‑making process:

1. **Preconstruction assessment** – an estimator produces a detailed takeoff and cost estimate.
2. **Financial assessment** – a controller builds a cash‑flow model and margin forecast.
3. **Operations capacity assessment** – the operations manager checks schedule and resource availability.
4. **Marketing assessment** – the marketing lead evaluates brand alignment and lead value.
5. **Systems and technology assessment** – the IT manager assesses system readiness and security.
6. **Administrative and HR assessment** – the office manager outlines documentation and compliance needs.
7. **Project execution assessment** – the project manager plans delivery, cost tracking and change control.
8. **Field execution assessment** – the site superintendent outlines daily on‑site operations and risks.
9. **Executive decision** – the owner/president weighs all prior reports and makes a go/no‑go recommendation.

Running the crew kicks off each task sequentially.  Each agent writes their report, and the final executive agent aggregates those reports to decide whether to pursue the project.  You can adjust the agents’ descriptions and the task definitions to suit other domains or to fine‑tune how decisions are made.

## Layout

```
construction_agentic_system/
├── README.md               # this file
├── pyproject.toml          # project dependencies and metadata
└── src/
    └── construction_agentic_system/
        ├── __init__.py
        ├── main.py        # entry‑point to run the crew
        ├── crew.py        # crew definition using CrewAI
        └── config/
            ├── agents.yaml # definitions for each agent
            └── tasks.yaml  # definitions for each task
```

## Requirements

This project depends on the `crewai` and `crewai_tools` packages for agent orchestration and tool support.  They are specified in `pyproject.toml`.  To run the system you will also need access to a language model API (e.g. OpenAI, Anthropic, Google) and optionally a search API (Serper).  Set your API keys in a `.env` file at the project root:

```
# .env
SERPER_API_KEY=your_serper_key
OPENAI_API_KEY=your_openai_key
# other provider keys as needed
```

Then install the dependencies and run the crew:

```bash
cd construction_agentic_system
crewai install         # installs the packages in a virtual environment
crewai run             # kicks off the crew defined in src/construction_agentic_system/main.py
```

When run, the crew writes reports to the `output/` directory and prints the final recommendation to the console.

## Extending the system

* **Custom tasks** – You can add new tasks to `config/tasks.yaml` and define additional functions in `crew.py` to handle them.  Use the `context` field to chain tasks together.
* **Tools** – CrewAI supports a variety of tools (web browsing, code execution, database queries).  You can provide tools to agents by modifying the agent definitions in `crew.py`.
* **Non‑construction domains** – Because the agent definitions are text prompts, you can swap them out for any domain requiring collaborative decision making: healthcare, finance, software development, etc.

This repository serves as a template for building your own agentic systems: agents in YAML, tasks in YAML, a Python crew orchestrator and an entry point.  Feel free to adapt it to your needs.