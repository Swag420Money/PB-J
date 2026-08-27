// Placeholder project history for the landing screen's "Your Projects" grid.
// There is no real project persistence yet — this is purely so the grid
// layout can be seen and tested. Swap for real stored-project data later.

export interface MockProject {
  id: string;
  name: string;
  dateLabel: string;
  durationLabel: string;
  thumbGradient: string;
}

// Thumbnails stay strictly neutral gray, matching the rest of the project
// grid/timeline — accent colors are reserved for buttons and active states,
// not decorative fills.
export const MOCK_PROJECTS: MockProject[] = [
  {
    id: "proj_1",
    name: "Beach Day Recap",
    dateLabel: "Aug 21",
    durationLabel: "0:32",
    thumbGradient: "linear-gradient(160deg, #d1d1d6, #aeaeb2)",
  },
  {
    id: "proj_2",
    name: "Weekend in Tulum",
    dateLabel: "Aug 14",
    durationLabel: "0:45",
    thumbGradient: "linear-gradient(160deg, #c7c7cc, #8e8e93)",
  },
  {
    id: "proj_3",
    name: "Studio Session",
    dateLabel: "Aug 9",
    durationLabel: "0:28",
    thumbGradient: "linear-gradient(160deg, #aeaeb2, #636366)",
  },
  {
    id: "proj_4",
    name: "Road Trip Edit",
    dateLabel: "Jul 30",
    durationLabel: "1:02",
    thumbGradient: "linear-gradient(160deg, #e5e5ea, #c7c7cc)",
  },
  {
    id: "proj_5",
    name: "Golden Hour",
    dateLabel: "Jul 22",
    durationLabel: "0:38",
    thumbGradient: "linear-gradient(160deg, #8e8e93, #636366)",
  },
  {
    id: "proj_6",
    name: "Friends Vlog",
    dateLabel: "Jul 15",
    durationLabel: "0:51",
    thumbGradient: "linear-gradient(160deg, #d1d1d6, #8e8e93)",
  },
];
