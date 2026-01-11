"""
crew.py
--------

This module defines the `ConstructionCrew` class, which orchestrates a team of
specialized AI agents using the CrewAI framework.  Each agent corresponds to
one of the key management roles in a residential construction company and
executes a task that contributes to the overall decision about whether to
pursue a new project.  The configuration for agents and tasks is loaded from
`config/agents.yaml` and `config/tasks.yaml` at runtime by CrewAI.
"""

from typing import List

from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool
from crewai.agents.agent_builder.base_agent import BaseAgent


@CrewBase
class ConstructionCrew:
    """Collaborative crew for evaluating a construction project.

    This crew contains nine agents, each mirroring a management role in the
    company.  The `kickoff` method on the resulting crew will execute the
    tasks sequentially, flowing the outputs from one agent to the next via
    contexts defined in `tasks.yaml`.
    """

    # Lists populated by CrewAI based on decorators below
    agents: List[BaseAgent]
    tasks: List[Task]

    # ----------------------------------------------------------------------
    # Agent definitions
    #
    # Each method decorated with @agent returns an Agent instance.  The
    # `config` property points to the corresponding entry in agents.yaml.  A
    # SerperDevTool is attached to every agent so they can perform web
    # searches when additional context is required.

    @agent
    def owner_president(self) -> Agent:
        return Agent(
            config=self.agents_config["owner_president"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def estimator_preconstruction(self) -> Agent:
        return Agent(
            config=self.agents_config["estimator_preconstruction"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def finance_controller(self) -> Agent:
        return Agent(
            config=self.agents_config["finance_controller"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def it_systems_manager(self) -> Agent:
        return Agent(
            config=self.agents_config["it_systems_manager"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def marketing_business_development(self) -> Agent:
        return Agent(
            config=self.agents_config["marketing_business_development"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def office_manager_admin_hr(self) -> Agent:
        return Agent(
            config=self.agents_config["office_manager_admin_hr"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def operations_manager(self) -> Agent:
        return Agent(
            config=self.agents_config["operations_manager"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def project_manager(self) -> Agent:
        return Agent(
            config=self.agents_config["project_manager"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    @agent
    def site_superintendent(self) -> Agent:
        return Agent(
            config=self.agents_config["site_superintendent"],  # type: ignore[index]
            verbose=True,
            tools=[SerperDevTool()]
        )

    # ----------------------------------------------------------------------
    # Task definitions
    #
    # Each method decorated with @task returns a Task instance.  The config is
    # pulled from tasks.yaml.  Output files for each task are defined in that
    # YAML; thus we simply instantiate the Task with its config.

    @task
    def preconstruction_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["preconstruction_assessment"]  # type: ignore[index]
        )

    @task
    def financial_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["financial_assessment"]  # type: ignore[index]
        )

    @task
    def operations_capacity_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["operations_capacity_assessment"]  # type: ignore[index]
        )

    @task
    def marketing_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["marketing_assessment"]  # type: ignore[index]
        )

    @task
    def systems_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["systems_assessment"]  # type: ignore[index]
        )

    @task
    def administrative_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["administrative_assessment"]  # type: ignore[index]
        )

    @task
    def project_execution_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["project_execution_assessment"]  # type: ignore[index]
        )

    @task
    def field_execution_assessment(self) -> Task:
        return Task(
            config=self.tasks_config["field_execution_assessment"]  # type: ignore[index]
        )

    @task
    def executive_decision(self) -> Task:
        return Task(
            config=self.tasks_config["executive_decision"]  # type: ignore[index]
        )

    # ----------------------------------------------------------------------
    # Crew definition
    #
    # The `crew` method combines agents and tasks and specifies the execution
    # strategy.  We use a sequential process so that each task runs in order and
    # may reference the outputs of prior tasks through the `context` field.

    @crew
    def crew(self) -> Crew:
        """Creates the construction crew with a sequential process."""
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )