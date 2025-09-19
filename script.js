(function () {
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".menu-toggle");

  const syncNavState = () => {
    if (!nav || !toggle) return;
    if (window.innerWidth > 860) {
      nav.removeAttribute("data-open");
      toggle.setAttribute("aria-expanded", "false");
    } else {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      nav.setAttribute("data-open", String(expanded));
    }
  };

  if (nav && toggle) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.setAttribute("data-open", String(!expanded));
    });

    nav.addEventListener("click", (event) => {
      const target =
        event.target instanceof HTMLElement ? event.target.closest("a") : null;
      if (target && window.innerWidth <= 860) {
        toggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
      }
    });

    window.addEventListener("resize", syncNavState);
    syncNavState();
  }

  const focusData = {
    field: {
      title: "Field medical impact",
      lead: "Equip MSL teams with the skills to turn evidence into purposeful, compliant conversations after every launch.",
      metrics: [
        { label: "Average time to proficiency", value: "-35% vs. baseline" },
        { label: "Confidence lift after two sprints", value: "+42 points" },
        { label: "Real-world scenarios rehearsed", value: "120+" },
      ],
      highlights: [
        "Immersive video scenarios mirror real-world scientific exchange and deepen storytelling agility.",
        "Coaching analytics highlight conversational blind spots for targeted reinforcement plans.",
        "Team retros and digital scorecards maintain accountability after every lab.",
      ],
    },
    launch: {
      title: "Launch excellence readiness",
      lead: "Accelerate launch readiness by aligning medical, commercial, and market access voices on a unified evidence story.",
      metrics: [
        { label: "Blueprint turnaround", value: "10 business days" },
        {
          label: "Stakeholder alignment sessions",
          value: "6 cross-functional studios",
        },
        { label: "Message confidence rating", value: "+37 point lift" },
      ],
      highlights: [
        "Narrative sprints pressure-test core claims and pre-empt complex stakeholder questions.",
        "Launch command center dashboards keep taskforces synchronized on priorities and compliance cues.",
        "Executive coaching enables faster decision cycles and clearer ownership for medical content.",
      ],
    },
    strategy: {
      title: "Medical strategy alignment",
      lead: "Bring global, regional, and field stakeholders onto a shared plan that translates insights into measurable impact.",
      metrics: [
        {
          label: "Strategic experiments launched",
          value: "18 in the first 90 days",
        },
        { label: "Insight-to-action cycle time", value: "-28% vs. prior year" },
        { label: "Engagement score from leaders", value: "4.7 / 5" },
      ],
      highlights: [
        "Collaborative canvases make it easy to prioritize evidence needs and partnerships.",
        "Measurement frameworks tie medical objectives to clear KPIs and reporting rhythms.",
        "Leadership forums sustain alignment across geographies and therapeutic areas.",
      ],
    },
  };

  const focusButtons = Array.from(
    document.querySelectorAll("[data-focus-target]"),
  );
  const focusPanel = document.querySelector(".outcomes__spotlight");
  const focusTitle = focusPanel
    ? focusPanel.querySelector(".outcomes__title")
    : null;
  const focusLead = focusPanel
    ? focusPanel.querySelector(".outcomes__lead")
    : null;
  const metricsList = focusPanel
    ? focusPanel.querySelector(".outcomes__metrics")
    : null;
  const highlightsList = focusPanel
    ? focusPanel.querySelector(".outcomes__highlights")
    : null;

  const renderFocus = (key) => {
    if (
      !focusPanel ||
      !focusTitle ||
      !focusLead ||
      !metricsList ||
      !highlightsList
    )
      return;
    const data = focusData[key];
    if (!data) return;

    focusTitle.textContent = data.title;
    focusLead.textContent = data.lead;

    metricsList.innerHTML = "";
    data.metrics.forEach((metric) => {
      const wrapper = document.createElement("div");
      const label = document.createElement("dt");
      const value = document.createElement("dd");
      label.textContent = metric.label;
      value.textContent = metric.value;
      wrapper.appendChild(label);
      wrapper.appendChild(value);
      metricsList.appendChild(wrapper);
    });

    highlightsList.innerHTML = "";
    data.highlights.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      highlightsList.appendChild(li);
    });

    focusButtons.forEach((button) => {
      const isActive =
        button instanceof HTMLElement && button.dataset.focusTarget === key;
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("tabindex", isActive ? "0" : "-1");
      button.classList.toggle("is-active", isActive);
    });
  };

  focusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const key = button.dataset.focusTarget;
      if (key) {
        renderFocus(key);
      }
    });

    button.addEventListener("keydown", (event) => {
      if (
        !["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)
      ) {
        return;
      }
      event.preventDefault();
      const direction =
        event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
      const nextIndex =
        (index + direction + focusButtons.length) % focusButtons.length;
      const nextButton = focusButtons[nextIndex];
      nextButton.focus();
      const key = nextButton.dataset.focusTarget;
      if (key) {
        renderFocus(key);
      }
    });
  });

  renderFocus("field");

  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    animatedElements.forEach((element) => observer.observe(element));
  } else {
    animatedElements.forEach((element) => element.classList.add("is-visible"));
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
