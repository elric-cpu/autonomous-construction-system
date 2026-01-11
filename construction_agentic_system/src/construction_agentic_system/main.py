#!/usr/bin/env python
"""
Entry point for running the construction agentic system.

This script instantiates the `ConstructionCrew` defined in `crew.py`, prompts
the agents to evaluate a specific construction project and prints the final
recommendation to the console.  It also ensures that the output directory
exists so that individual agent reports can be written.
"""

import os
from pathlib import Path
from typing import Dict

from .crew import ConstructionCrew


def run(project_name: str, additional_inputs: Dict[str, str] | None = None) -> None:
    """Run the construction crew on a given project.

    Parameters
    ----------
    project_name: str
        The name of the project to evaluate (e.g. "Sunset Villa Renovation").
    additional_inputs: dict[str, str] | None
        Optional dictionary of extra input variables to pass to the crew.  These
        values will be available in prompts using Jinja syntax (e.g.
        `{{ some_key }}`).  Keys that conflict with `project_name` will be
        ignored.
    """
    # Prepare inputs for the crew.  The `project_name` variable is required
    # because it is referenced in the tasks.yaml descriptions.
    inputs: Dict[str, str] = {"project_name": project_name}
    if additional_inputs:
        for key, value in additional_inputs.items():
            # Avoid overriding the project_name
            if key not in inputs:
                inputs[key] = value

    # Create output directory if it doesn't exist
    os.makedirs("output", exist_ok=True)

    # Instantiate and run the crew
    crew = ConstructionCrew().crew()
    result = crew.kickoff(inputs=inputs)

    # Print the final aggregated recommendation
    print("\n\n=== FINAL RECOMMENDATION ===\n")
    print(result.raw)
    print("\n\nReports have been saved to the output/ directory.")


if __name__ == "__main__":
    # Run the system on a sample project name.  You can change this value or
    # supply your own via environment variables or CLI arguments as needed.
    default_project_name = os.environ.get("PROJECT_NAME", "Sunset Villa Renovation")
    run(default_project_name)