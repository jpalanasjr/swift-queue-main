// Simple in-memory queue management
let regularCounter = 0;
let priorityCounter = 0;

export const generateQueueNumber = (isPriority: boolean): string => {
  if (isPriority) {
    priorityCounter++;
    return `P${String(priorityCounter).padStart(3, '0')}`;
  } else {
    regularCounter++;
    return `R${String(regularCounter).padStart(3, '0')}`;
  }
};

export const resetCounters = () => {
  regularCounter = 0;
  priorityCounter = 0;
};
