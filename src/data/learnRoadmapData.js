const learnRoadmapData = {
  phases: [
    {
      id: 'phase1',
      name: 'PHASE 1: CVC Words',
      checkpoints: [
        { id: 'cp1', name: 'a, t, s, p', completed: true },
        { id: 'cp2', name: 'i, n, m, d', completed: true },
        { id: 'cp3', name: 'o, c, g, k', completed: false },
      ],
    },
    {
      id: 'phase2',
      name: 'PHASE 2: Digraphs',
      checkpoints: [
        { id: 'cp4', name: 'sh, ch, th', completed: false },
        { id: 'cp5', name: 'ai, ee, oa', completed: false },
      ],
    },
  ],
  rewards: [
    { id: 'r1', name: 'Bronze Badge', collected: true },
    { id: 'r2', name: '50 Gems', collected: true },
    { id: 'r3', name: 'Silver Badge', collected: false },
  ],
  totalLevels: 10,
};

export default learnRoadmapData;
